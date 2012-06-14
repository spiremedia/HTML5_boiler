var DateManager;

(function($){
	// Declare the DateManager object.
	DateManager = (typeof (DateManager) == "undefined" || !DateManager)
	 ? function () { }
	 : DateManager;

	// init(); bind the appropriate events
	DateManager.init = (typeof (DateManager.init) == "undefined" || !DateManager.init)
		? function () {
			// Bind Click Events
			$('.left-selector, .right-selector').click(function(){
				DateManager.moveYears($(this).hasClass('left-selector')?true:false);
				return false;
			});
			$('.year-selector ul li a').live('click', function(){
				console.log('You clicking?');
				$(this).parent().addClass('active').siblings().removeClass('active');
				DateManager.selectDate();
				return false;
			});
			
			// Respond to hash on page load
			if(window.location.hash)
			{
				// code...
			}
		} : DateManager.init;
	
	// hashChange Event
	DateManager.hashChange = (typeof (DateManager.hashChange) == "undefined" || !DateManager.hashChange)
		? function () {
			console.log('request-history.json hashChange!');
			$.getJSON('request-history.json', function(data, response){
				// Here is where we'll use the data to generate markup to replace the acccordion etc..
				console.log(data); 
				
				// code...
			});
		} : DateManager.hashChange;
	
	// This Finds the date and changes the hash of the url.
	DateManager.selectDate = (typeof (DateManager.selectDate) == "undefined" || !DateManager.selectDate)
	 ? function () {
			var year = parseInt($('.year-selector ul li.active a').html());
			var month = ($('.month-manager').length == 0)?false:($('.month-manager ul li.active a').length == 0)?$('.month-manager ul li.active a').html():false;
			var location = $('select#location').val();
			var status = $('select#status').val();
			window.location.hash = status + "-" + location + "-" + year + (month == false ? '' : "-" + month);
		} : DateManager.selectDate;
		
	// move years back/forth
	DateManager.moveYears = (typeof (DateManager.moveYears) == "undefined" || !DateManager.moveYears)
	 ? function (older) {
			var right = parseInt($('.year-selector .slider').css('right').replace('px', ''));
			var move;
			$('.year-selector .slider').stop( false, true);
			if(older == false && right < 0)
			{
				move = "+=247";
			}
			else if(older == true)
			{
				// need an extra year. add it before we move slide
				if(($('.year-selector ul').width()+247) > (741-right))
				{
					var year = (parseInt($('.year-selector ul li:first a').html())-1);
					var color = $('.year-selector ul li:first a').hasClass('blue')?'green':$('.year-selector ul li:first a').hasClass('blue-green')?'blue':'blue-green';
					$('<li></li>')
						.addClass('year-' + year)
						.html('<a href="#" class="' + color + '">' + year + '</a></li>')
						.prependTo($('.year-selector ul'));
				}
				move = "-=247";
			}
			else
			{
				move = "0";
			}
			$('.year-selector .slider').animate({
				right: move
			});
			return false;
	} : DateManager.moveYears;
	
	// bind hashChange (doesn't need to be onload)
	$(window).bind('hashchange', DateManager.hashChange);
	$(function(){
		console.log('INIT!');
			DateManager.init();
	});
})(jQuery);

	/**
	 * @todo Add this When After Nav
	 */
	// 	moveYears: function(older)
	// 	{
	// 		var right = parseInt($('.year-selector .slider').css('right').replace('px', ''));
	// 		var move;
	// 		$('.year-selector .slider').stop( false, true);
	// 		if(older == false && right < 0)
	// 		{
	// 			move = "+=247";
	// 		}
	// 		else if(older == true)
	// 		{
	// 			// need an extra year. add it before we move slide
	// 			if(($('.year-selector ul').width()+247) > (741-right))
	// 			{
	// 				var year = (parseInt($('.year-selector ul li:first a').html())-1);
	// 				var color = $('.year-selector ul li:first a').hasClass('blue')?'green':$('.year-selector ul li:first a').hasClass('blue-green')?'blue':'blue-green';
	// 				$('<li></li>')
	// 					.addClass('year-' + year)
	// 					.html('<a href="#" class="' + color + '">' + year + '</a></li>')
	// 					.prependTo($('.year-selector ul'));
	// 			}
	// 			move = "-=247";
	// 		}
	// 		else
	// 		{
	// 			move = "0";
	// 		}
	// 		$('.year-selector .slider').animate({
	// 			right: move
	// 		});
	// 		return false;
	// 	},
