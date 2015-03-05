$(document).ready(function(){
	var videoID; // the current video ID of the video the user is watching.

	{% for video1, recent_video1, user1, recent_user1 in pros %}
		// If the video exists, append it to the video list.
		$.ajax({
			async: false,
			type: 'GET',
			url: "http://gdata.youtube.com/feeds/api/videos/{{video1.video_id}}", 
			success: function(){
				//create the thumbnail to insert.
				var thumbnail = $(
					"<div class='thumbnail'>" +
					" <div class='video_pic'>" +
					"		<img id='{{video1.video_id}}' src='http://img.youtube.com/vi/{{video1.video_id}}/0.jpg'>" +
					" </div> " +
					"	<div class='video_title'>" +
					"		<h3>{{video1.name}}</h3>" +
					" </div>" +
					" <div class='video_info'>" +
					"		<span class='name'>{{user1.name}}</span>" +
					"		<span class='upvotes'>{{video1.upvotes}} Upvotes</span>" +
					"		<p class='views_date'>{{video1.post_date|timesince}} ago</p>" +
					" </div>" +
					"</div>"
				);

				$('#pro .video_list_container_inner').append(thumbnail);
			}
		});
		
		$.ajax({
			async: false,
			type: 'GET',
			url: "http://gdata.youtube.com/feeds/api/videos/{{recent_video1.video_id}}", 
			success: function(){
				//create the thumbnail to insert.
				var thumbnail = $(
					"<div class='thumbnail'>" +
					" <div class='video_pic'>" +
					"		<img id='{{recent_video1.video_id}}' src='http://img.youtube.com/vi/{{recent_video1.video_id}}/0.jpg'>" +
					" </div> " +
					"	<div class='video_title'>" +
					"		<h3>{{recent_video1.name}}</h3>" +
					" </div>" +
					" <div class='video_info'>" +
					"		<span class='name'>{{recent_user1.name}}</span>" +
					"		<span class='upvotes'>{{recent_video1.upvotes}} Upvotes</span>" +
					"		<p class='views_date'>{{recent_video1.post_date|timesince}} ago</p>" +
					" </div>" +
					"</div>"
				);

				$('#pro .recent_video_list_container_inner').append(thumbnail);
			}
		});
	{% endfor %}

	// show down arrows if there are more than four videos in the list.
	if ( $('#pro_video_list_container .thumbnail').length > 3 )
		$('#pro .inactive_down_arrow').attr('class', 'down_arrow');	
	
	// same as above for con videos.
	var i = 2;
	var count = 0;
	{% for video2, recent_video2, user2, recent_user2 in cons %}
		// If the video exists, append it to the video list.
		$.ajax({
			async: false,
			type: 'GET',
			url: "http://gdata.youtube.com/feeds/api/videos/{{video2.video_id}}", 
			success: function(){
				//create the thumbnail to insert.
				var thumbnail = $(
					"<div class='thumbnail'>" +
					" <div class='video_pic'>" +
					"		<img id='{{video2.video_id}}' src='http://img.youtube.com/vi/{{video2.video_id}}/0.jpg'>" +
					" </div> " +
					"	<div class='video_title'>" +
					"		<h3>{{video2.name}}</h3>" +
					" </div>" +
					" <div class='video_info'>" +
					"		<span class='name'>{{user2.name}}</span>" +
					"		<span class='upvotes'>{{video2.upvotes}} Upvotes</span>" +
					"		<p class='views_date'>{{video2.post_date|timesince}} ago</p>" +
					" </div>" +
					"</div>"
				);

				$('#con .video_list_container_inner').append(thumbnail);
			}
		});
		
		$.ajax({
			async: false,
			type: 'GET',
			url: "http://gdata.youtube.com/feeds/api/videos/{{recent_video2.video_id}}", 
			success: function(){
				//create the thumbnail to insert.
				var thumbnail = $(
					"<div class='thumbnail'>" +
					" <div class='video_pic'>" +
					"		<img id='{{recent_video2.video_id}}' src='http://img.youtube.com/vi/{{recent_video2.video_id}}/0.jpg'>" +
					" </div> " +
					"	<div class='video_title'>" +
					"		<h3>{{recent_video2.name}}</h3>" +
					" </div>" +
					" <div class='video_info'>" +
					"		<span class='name'>{{recent_user2.name}}</span>" +
					"		<span class='upvotes'>{{recent_video2.upvotes}} Upvotes</span>" +
					"		<p class='views_date'>{{recent_video2.post_date|timesince}} ago</p>" +
					" </div>" +
					"</div>"
				);

				$('#con .recent_video_list_container_inner').append(thumbnail);
			}
		});
	{% endfor %}

	if ( $('#con_video_list_container .thumbnail').length > 3 )
		$('#con .inactive_down_arrow').attr('class', 'down_arrow');	
});
