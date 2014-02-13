from django.conf.urls import patterns, include, url
from views import *

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^debatewebsite/', include('debatewebsite.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
    url(r'^home/$', home),
		url(r'^video-page/([a-zA-Z0-9_]*)$', video_page),
		url(r'^profile/([a-zA-Z0-9_]*)$', profile),
		url(r'^submit_video/$', submit_video),
		url(r'^upvote_video/$', upvote_video),
		url(r'^get_comments/(.*)$', get_comments),
		url(r'^post_comment/$', post_comment),	
	
		# Video debate urls
		url(r'^email/$', email),
    url(r'^invite/(\d+)$', invite),
    url(r'^accept/(\d+)$', accept),
    url(r'^debate/([a-zA-Z0-9_]*)$', debate),
)

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns() 
