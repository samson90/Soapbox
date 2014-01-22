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
			}
		);

		$('.expand_button').click(function(){
			if ( $(this).children(':first').html() == 'Expand' )
			{
				$('#todays_topic .topic').animate({height:'+=290px'}, 500);
				$(this).children(':first').html('Collapse');
			}
			else
			{
				$('#todays_topic .topic').animate({height: '-=290px'}, 500);
				$(this).children(':first').html('Expand');
			}
		});
	}
);
