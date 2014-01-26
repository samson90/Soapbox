from django.db import models

# Create your models here.
class Topic(models.Model):
	name = models.CharField(max_length = 100)
	post_date = models.DateTimeField()
	pros = models.PositiveSmallIntegerField()
	cons = models.PositiveSmallIntegerField()
	
	def __unicode__(self):
		return self.name

class User(models.Model):
	name = models.CharField(max_length=30)
	occupation = models.CharField(max_length=45)
	city = models.CharField(max_length=20)
	state = models.CharField(max_length=2)
	age = models.PositiveSmallIntegerField()

	def __unicode__(self):
		return self.name

class Video(models.Model):
	video_id = models.CharField(max_length=11)
	name = models.CharField(max_length=100)
	post_date = models.DateTimeField()
	pro = models.BooleanField(default=False)
	upvotes = models.PositiveSmallIntegerField()
	topic = models.ForeignKey(Topic)
	user = models.ForeignKey(User)

	def __unicode__(self):
		return self.name
