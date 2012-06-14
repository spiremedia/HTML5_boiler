// Declare the Nav object.
var Nav = (typeof (Nav) == "undefined" || !Nav)
 ? function () { }
 : Nav;

// timeout var
Nav.t = (typeof (Nav.t) == "undefined" || !Nav.t) ? 0 : Nav.t;

// init method
Nav.init = (typeof (Nav.init) == "undefined" || !Nav.init)
 ? function () {
		$('ul.dropdown-nav li').hover(function(){
			clearTimeout(Nav.t);
			$(this).parents('ul').addClass('hover');
			$(this).addClass('hover').siblings().removeClass('siblings');
			// Nav.drop();
			console.log(' li hover');
			var $ul = $(this).children('ul');
			Nav.t = setTimeout(function(){
				$ul.stop().animate({
					'height': $ul.data('height')
				});
			}, 100)
		}, function(){
			console.log(' li off');
			var $ul = $(this).children('ul');
			Nav.t = setTimeout(function(){
				$ul.stop().animate({'height': 0}, function(){
					$(this).parents('.dropdown-nav').removeClass('hover');
				});
			}, 100)
		});
		
		$('ul.dropdown-nav ul').each(function(){
			$(this).data('height', $(this).height());
			$(this).height(0);
		}).hover(function(){
			console.log('hover ul(clear) ' + Nav.t);
			clearTimeout(Nav.t);
			$(this).stop().animate({
				'height': $(this).data('height')
			});
		}, function(){
			console.log(' off ul')
			Nav.t = setTimeout(function(){
				$(this).stop().animate({'height': 0}, function(){
					$(this).parents('.dropdown-nav').removeClass('hover');
				});
			}, 100);
		});
	
} : Nav.init;

// 
// var Nav = {
// 	t: 0, //setTimeout()
// 	init: function()
// 	{
// 		$('ul.primary-nav li.half-pint').hover(function(){
// 			clearTimeout(Nav.t);
// 			$(this).addClass('hover').siblings().removeClass('siblings');
// 			// Nav.drop();
// 			console.log(' li hover');
// 			var $ul = $(this).children('ul');
// 			Nav.t = setTimeout(function(){
// 				$ul.stop().animate({
// 					'height': $ul.data('height')
// 				});
// 			}, 100)
// 		}, function(){
// 			console.log(' li off');
// 			var $ul = $(this).children('ul');
// 			Nav.t = setTimeout(function(){
// 				$ul.stop().animate({
// 					'height': 0
// 				});
// 			}, 100)
// 		});
// 		
// 		$('ul.primary-nav ul').each(function(){
// 			$(this).data('height', $(this).height());
// 			$(this).height(0);
// 		}).hover(function(){
// 			console.log('hover ul(clear) ' + Nav.t);
// 			clearTimeout(Nav.t);
// 			$(this).stop().animate({
// 				'height': $(this).data('height')
// 			});
// 		}, function(){
// 			console.log(' off ul')
// 			Nav.t = setTimeout(function(){
// 				$(this).stop().animate({'height': 0});
// 			}, 100);
// 		});
// 	}
// }
$(function(){
	Nav.init();
})