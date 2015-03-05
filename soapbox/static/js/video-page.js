function show_videos(video_list){
	console.log(video_list.get(0).name);
	video_list.sort_rated();
	console.log(video_list.get(0).name);

	for ( var i = 0; i < video_list.length; i++)
	{ // add each video to the page.
		var video = video_list.get(i);

		var thumbnail = $(
			"<div class='thumbnail'>" +
			" <div class='video_pic'>" +
			"		<img id='" + video.id + "' src='http://img.youtube.com/vi/" + video.id + "/0.jpg'>" +
			" </div> " +
			"	<div class='video_title'>" +
			"		<h3>" + video.name + "</h3>" +
			" </div>" +
			" <div class='video_info'>" +
			"		<span class='name'>" + video.user.name + "</span>" +
			"		<span class='upvotes'>" + video.upvotes + " Upvotes</span>" +
			"		<p class='views_date'>" + video.post_date + "</p>" +
			" </div>" +
			"</div>"
		);

		if (video.pro)
			$('#pro .video_list_container_inner').append(thumbnail);
		else
			$('#con .video_list_container_inner').append(thumbnail);
	}

	video_list.sort_recent();

	for ( var i = 0; i < video_list.length; i++)
	{ // add each video to most recent section
		var video = video_list.get(i);

		var thumbnail = $(
			"<div class='thumbnail'>" +
			" <div class='video_pic'>" +
			"		<img id='" + video.id + "' src='http://img.youtube.com/vi/" + video.id + "/0.jpg'>" +
			" </div> " +
			"	<div class='video_title'>" +
			"		<h3>" + video.name + "</h3>" +
			" </div>" +
			" <div class='video_info'>" +
			"		<span class='name'>" + video.user.name + "</span>" +
			"		<span class='upvotes'>" + video.upvotes + " Upvotes</span>" +
			"		<p class='views_date'>" + video.post_date + "</p>" +
			" </div>" +
			"</div>"
		);

		if (video.pro)
			$('#pro .recent_video_list_container_inner').append(thumbnail);
		else
			$('#con .recent_video_list_container_inner').append(thumbnail);
	}

	// show down arrows if there are more than four videos in the list.
	if ( $('#pro_video_list_container .thumbnail').length > 3 )
		$('#pro .inactive_down_arrow').attr('class', 'down_arrow');	

	if ( $('#con_video_list_container .thumbnail').length > 3 )
		$('#con .inactive_down_arrow').attr('class', 'down_arrow');	
}
