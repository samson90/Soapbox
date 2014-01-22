from django.http import HttpResponse
from django.template import Context
from django.template import RequestContext
from django.template.loader import get_template
from django.shortcuts import render_to_response
from soapbox_demo.models import *
import datetime
from django.conf import settings

def home(request):
	topics = [];
	topics = Topic.objects.order_by('-post_date').all()
	todays_topic = topics[0]
	prev_topics = topics[1:]
	pro_video = Video.objects.filter(pro=True).order_by('-upvotes')[0]
	con_video = Video.objects.filter(pro=False).order_by('-upvotes')[0]
	return render_to_response('index.html', 
		{
			"prev_topics": prev_topics,
			'todays_topic':todays_topic,
			'pro_video':pro_video,
			'con_video':con_video
		}
	)

def video_page(request, topic_id):
	pro_videos = []
	pro_videos_date = []
	con_videos = []
	con_videos_date = []
	pro_videos = Video.objects.filter(pro=True).order_by('-upvotes')
	pro_videos_date = Video.objects.filter(pro=True).order_by('-post_date')
	con_videos = Video.objects.filter(pro=False).order_by('-upvotes')
	con_videos_date = Video.objects.filter(pro=False).order_by('-post_date')
	pro_users = []
	pro_users_date = []
	con_users = []
	con_users_date = []
	for i in range(len(pro_videos)):
		pro_users.append(pro_videos[i].user)
	for i in range(len(pro_videos_date)):
		pro_users_date.append(pro_videos_date[i].user)
	for i in range(len(con_videos)):
		con_users.append(con_videos[i].user)
	for i in range(len(con_videos_date)):
		con_users_date.append(con_videos_date[i].user)
	pros = zip(pro_videos, pro_videos_date, pro_users, pro_users_date)
	cons = zip(con_videos, con_videos_date, con_users, con_users_date)
	return render_to_response('video-page.html', 
		{
			"pros": pros,
			"cons": cons,
		}, context_instance=RequestContext(request)
	)

def submit_video(request):
	#get video info
	video_id = request.POST['video_id']
	title = request.POST['title']
	pro = False
	if ( request.POST['position'] == 'pro' ):
		pro = True
	topic_id = request.POST['topic_id']
	user_id = request.POST['user_id']

	#get user that posted the video and topic the video was posted to
	user = User.objects.get(id=user_id)
	topic = Topic.objects.get(id=topic_id)

	video = Video.objects.create(video_id=video_id, name=title, post_date=datetime.datetime.now(), pro=pro,
		upvotes=0, topic=topic, user=user)
	video.save()

	dt = datetime.datetime.strptime(datetime.datetime.now(), '%m/%d/%y %H:%M') 

	with open('logs/monitor.log', 'a') as myfile:
		myfile.write('\n' + video_id + ', ' + title + ', ' + str(pro) + ', ' + topic.name + ', ' + user.name)	
	return HttpResponse("{success': 'false'}")

def profile(request, user_id):
	user = User.objects.get(id=user_id)
	return render_to_response('profile.html',
		{
			"user": user
		}
	)

# Video Debate site views.
def email(request):
	if 'challenger_email' in request.GET:
		#get info from form
		topic = request.GET['topic']
		challenger_email = request.GET['challenger_email']
		challenger_name = request.GET['challenger_name']
		challengee_email = request.GET['challengee_email']
		challengee_name = request.GET['challengee_name']
		spectators_email = request.GET['spectators_email']
		dt = datetime.datetime.strptime(request.GET['datetime'], '%m/%d/%y %H:%M')

		#log the debate
		message = "%s scheduled a debate with %s on %s at %s" \
			% (challenger_name, challengee_name, topic, dt)
		WriteLog(message)
		
		#create a new debate object two users and store in database
		debate = Debate.objects.create(topic=topic, start_time=dt, accepted=False)
		challenger = User.objects.create(name=challenger_name, email=challenger_email, token="",
			role="Challenger", debate=debate)
		challengee = User.objects.create(name=challengee_name, email=challengee_email, token="",
			role="Challengee", debate=debate)
		spectators_email = spectators_email.split(",")
		spectators = []
		for s in spectators_email:
			spectator = User.objects.create(name="", email=s, token="", role="Subscriber",
				debate=debate)
			spectators.append(spectator)

		#create the setup
		setup = Setup(debate, challenger, challengee)

		status = 'Success'
	else:
		status = 'Error'
	return HttpResponse(status)

def invite(request, debate_id):
	return render_to_response('invite.html', {"debate_id": debate_id})

def accept(request, debate_id):
	try:
		debate = Debate.objects.get(id=debate_id)
		debate.accepted = True
		debate.save()

		#send message to spectators about debate
		spectators_email = request.GET['spectators_email']
		if spectators_email != "":
			spectators_email = spectators_email.split(",")
			for s in spectators_email:
				spectator = User.objects.create(name="", email=s, token="", role="Subscriber", 
					debate=debate)
		SendSpectatorInvite(debate)

		#if time of debate is ten minutes or less we send an invite.
		now = datetime.datetime.now()
		invite_time = debate.start_time - datetime.timedelta(minutes=10)
		if now > invite_time:
			SendDebateInvite(debate_id)

		status = 'Success'
	except Debate.DoesNotExist:
		status = 'Debate does not exist'
	return HttpResponse(status)

def debate(request, token):
	token = token.replace("_", "=")
	user = User.objects.get(token=token)
	debate = user.debate
	if user.role == "Challenger":
		challenger = user
		challengee = User.objects.get(debate=debate, role="Challengee")
	elif user.role == "Challengee":
		challenger = User.objects.get(debate=debate, role="Challenger")
		challengee = user
	else:
		challenger = User.objects.get(debate=debate, role="Challenger")
		challengee = User.objects.get(debate=debate, role="Challengee")
	session_id = debate.session_id
	api_key = settings.OPENTOK_API_KEY
	topic = debate.topic
	return render_to_response('debate.html', 
		{
			"session_id": session_id,
			"token_number": token,
			"api_key": api_key,
			"topic": topic,
			"challenger": challenger.name,
			"challengee": challengee.name,
			"role": user.role
		}
	)
