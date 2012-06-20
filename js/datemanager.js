(function ($) {
  // This is the simplest possible plugin to select years
  // FUNCTIONALITY TO SET AND INDICATE THE CURRENTLY SELECTED YEAR OMITTED FOR THIS EXAMPLE
	var settings; // must be set out here!!!
	$.fn.yearPicker = function(method) {
		
		// shared method for determining which are selected
		var generateSize = function(index, settings) {
			var total = settings.yearsToShow.length;
			var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
			var size = (index == selectedIndex)?'large':(index == selectedIndex-1 || index == selectedIndex+1)?'small':'gone';
			// selected year is against a wall, which means it will have 2 smalls on 1 side instead of 1 small on both sides
			if(size == 'gone' && total > 2 && ((total-1 == selectedIndex && index == selectedIndex-2) || (selectedIndex == 0 && index == selectedIndex+2)))size = 'small';
			return size;
		}
		
		var methods = {
			/*
			 * INIT!
			 */
			init: function(options)
			{
				var colors = ['blue', 'blue-green', 'green'];
				var thisYear = new Date().getFullYear();

				// set defaults and override with options
				settings = $.extend({
					'onChange' : null,
					'selectedYear' : thisYear,
					'yearsToShow' : [thisYear]
				}, options);
				
				return this.each(function() {
					var $this = $(this);
					var $yearSelector = $(this).find('.year-selector .slider');
					var years = $("<ul>").addClass('clearfix');
					var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
					// bind click events on years
					$.each(settings.yearsToShow, function(index, value) {
						size = generateSize(index, settings);
						var $a = $('<a href="#"></a>').html(value.toString());
						var $el = $("<li></li>").addClass(colors[parseInt(value)%3]).addClass(size).html($a);
						$a.click(function() { settings.onChange(value); return false; });
						years.append($el);
					});
					// bind Events on left/right arrows
					$('.left-selector, .right-selector').click(function(){
						var eq = $(this).hasClass('left-selector')?0:2;
						var year = $this.find('.year-selector ul li:not(.gone):eq(' + eq + ') a').html();
						$.bbq.pushState({ "year": year });
						return false;
					})
					$yearSelector.append(years);
				});
				
			},
			/**
			 * This function selects a year (makes it largest, and makes appropriate siblings visible)
			 */
			selectYear: function(year)
			{
				settings.selectedYear = parseInt(year);
				return $(this).each(function(){
					var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
					var $ul = $(this).find('.year-selector ul li');
					$ul.each(function(i,e){
						$(e).removeClass('gone').removeClass('large').removeClass('small').addClass(generateSize(i, settings));
					});
				});
			},
			/**
			 * Respond to hashChange
			 * @note this is assuming only 1 date-manager. serious tweaks would be needed here for multiple
			 */
			hashChange: function()
			{
				settings.selectedYear = parseInt($.deparam.fragment().year || Date.getFullYear());
				var selectedIndex = settings.yearsToShow.indexOf(settings.selectedYear);
				if(selectedIndex == 0 || selectedIndex == settings.yearsToShow.length-1)
				{
					// remove appropriate left/right arrow
					if(selectedIndex == 0){
						// left wall
						$('.left-selector').fadeOut();
					}else{
						// right wall
						$('.right-selector').fadeOut();
					}
				}else{
					$('.left-selector, .right-selector').fadeIn();
				}
				
				$('.date-manager').yearPicker('selectYear', settings.selectedYear);
			}
		};
		
		// Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }
	};
})(jQuery);