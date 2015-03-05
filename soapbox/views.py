from django.http import HttpResponse
from django.template import Context
from django.template import RequestContext
from django.template.loader import get_template
from django.shortcuts import render_to_response
from soapbox_demo.models import *
import datetime
from django.conf import settings
from django.utils import simplejson

################# HOME ########################
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

################# VIDEO PAGE ########################
def video_page(request, topic_id):
	videos = []
	videos = Video.objects.filter(topic=topic_id).order_by('-upvotes')
	return render_to_response('video-page.html', 
		{
			"videos": videos,
		}, context_instance=RequestContext(request)
	)

################# SUBMIT VIDEO ########################
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

	video = Video.objects.create(video_id=video_id, name=title,
		post_date=datetime.datetime.now(), pro=pro,
		upvotes=0, topic=topic, user=user)
	video.save()

	dt = datetime.datetime.strptime(datetime.datetime.now(), 
		'%m/%d/%y %H:%M') 

	with open('logs/monitor.log', 'a') as myfile:
		myfile.write('\n' + video_id + ', ' + title + ', ' + str(pro) + 
			', ' + topic.name + ', ' + user.name)	
	return HttpResponse("{'success': 'true'}")

################# UPVOTE VIDEO ########################
def upvote_video(request):
	#get the info
	video_id = request.POST.get('video_id', None)
	upvote_val = request.POST.get('upvote_val', None)
	upvote_val = int(upvote_val)

	#get the video and increment the upvotes
	video = Video.objects.get(video_id=str(video_id))
	video.upvotes += upvote_val
	video.save()

	# add or remove an upvote record
	user = User.objects.get(id=10)
	if upvote_val > 0:
		upvote = Upvote.objects.create(video=video, user=user)
		upvote.save()
	else:
		upvote = Upvote.objects.filter(video=video, user=user).delete()

	myfile = open('logs/monitor.log', 'a')
	myfile.write('\n' + str(video_id) + ' ' + str(upvote_val))
	myfile.close()
	
	return HttpResponse("{'success': 'true'}")

################# GET COMMENTS ########################
def get_comments(request, video_id):
	video = Video.objects.get(video_id=str(video_id))
	video_comments = Comments.objects.filter(video=video)

	#get a list of comments
	comments = []
	for c in video_comments:
		comment = {"user": "", "body": "" , "post_date": ""}
		comment['user'] = c.user.name;
		comment['body'] = c.body;
		comment['post_date'] = str(c.post_date);
		comments.append(comment)
	
	json = simplejson.dumps(comments)
	return HttpResponse(json, mimetype="application/json")

################# POST COMMENT ######################
def post_comment(request):
	#get the info
	video_id = request.POST.get('video_id', None)
	body = request.POST.get('body', None)

	video = Video.objects.get(video_id=str(video_id))
	user = User.objects.get(id=10)
	comment = Comments.objects.create(video=video, body=str(body),
		post_date=datetime.datetime.now(), user=user)
	comment.save()

################# PROFILE ########################
def profile(request, user_id):
	user = User.objects.get(id=user_id)
	return render_to_response('profile.html',
		{
			"user": user
		}
	)