$(document).ready(function()
{
	$('body').delegate('.button', 'click', function()
	{
		var i = $(this).index();

		//get new panel to show.
		var new_panel = $('#display').children().eq(i);
		$('.panel').attr('class', 'hidden_panel');
		new_panel.attr('class', 'panel');

		$('.label').attr('class', 'button');
		$(this).attr('class', 'label');
	});

	$('.ellipsis').click(function()
	{
		if ( $(this).html() === "<p>...</p>" )
		{
			var status_update = $(this).parent();
			var status_text = status_update.children('.status')
			var text = status_text.children('p');
			text.css('overflow', 'visible');
			text.css('white-space', 'normal');
			status_text.css('height', 'auto');
			status_update.height(status_text.height()+50);
			$(this).css('margin-top', status_text.height() - 10);
			$(this).html("<div class='up_arrow'></div>");
		}
		else
		{
			var status_update = $(this).parent();
			var status_text = status_update.children('.status')
			var text = status_text.children('p');
			text.css('overflow', 'hidden');
			text.css('white-space', 'nowrap');
			status_text.css('height', '100px');
			status_update.height(status_text.height()+50);
			$(this).css('margin-top', status_text.height() - 10);
			$(this).html("<p>...</p>");
		}
	});	
});
