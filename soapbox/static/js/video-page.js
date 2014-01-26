/*$(document).ready(function(){
	// thumbnail
	$('.thumbnail').click(function(){
		var video_id = $(this).attr('id');
		var video = $('<iframe width="505" height="284" src="//www.youtube.com/embed/' + video_id + '" frameborder="0" allowfullscreen>');
		var parent = $(this).parent();
		if ( parent.attr('id') == 'pro_video_list_container_inner' )
		{
			$('#pro_video iframe').remove();
			$('#pro_video').append(video);
			$('#pro title').text({{pro_video.1.name}})
		}
		else
		{
			$('#con_video iframe').remove();
			$('#con_video').append(video);
		}
	});

	$('body').delegate('#pro_down_arrow', 'click', function(){
		$('#pro_video_list_container_inner').animate({top:'-=256'}, 500);
		$(this).attr('id', 'inactive_pro_down_arrow');
		$(this).attr('class', 'inactive_arrow');
		$('#inactive_pro_up_arrow').attr('id', 'pro_up_arrow');
		$('#pro_up_arrow').attr('class', 'arrow');
	});

	$('body').delegate('#pro_up_arrow', 'click', function(){
		$('#pro_video_list_container_inner').animate({top:'+=256'}, 500);
		$(this).attr('id' ,'inactive_pro_up_arrow');
		$(this).attr('class', 'inactive_arrow');
		$('#inactive_pro_down_arrow').attr('id', 'pro_down_arrow');
		$('#pro_down_arrow').attr('class', 'arrow');
	});
	
	$('body').delegate('#con_down_arrow', 'click', function(){
		$('#con_video_list_container_inner').animate({top:'-=512'}, 500);
		$(this).attr('id', 'inactive_con_down_arrow');
		$(this).attr('class', 'inactive_arrow');
		$('#inactive_con_up_arrow').attr('id', 'con_up_arrow');
		$('#con_up_arrow').attr('class', 'arrow');
	});

	$('body').delegate('#con_up_arrow', 'click', function(){
		$('#con_video_list_container_inner').animate({top:'+=512'}, 500);
		$(this).attr('id' ,'inactive_con_up_arrow');
		$(this).attr('class', 'inactive_arrow');
		$('#inactive_con_down_arrow').attr('id', 'con_down_arrow');
		$('#con_down_arrow').attr('class', 'arrow');
	});
});*/
