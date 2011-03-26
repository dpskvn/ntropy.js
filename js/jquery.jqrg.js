/*=======================================================
// jquery.jqrg.js
// Version: 0.3 alpha
// Author: Dino Paskvan
// Mail: dpaskvan@gmail.com
// Web: http://www.confusedtree.com
// Copyright (c) 2011 Dino Paskvan
// licence : MIT
========================================================= */

(function($) {
  $.fn.jQrg = function(options) {
	/* set default options */
    var options = $.extend({
			target: '#output',
			rSize: '10',
			pool: 'abcdefghijklmnopqrstuvwxyz0123456789',
			message: 'Keep moving the mouse.'
    }, options);
	
	this.each(function() {
			var base = $(this);
			base.html('<div id="jqrgdetector"></div>'); //setting up the detector
			$('#jqrgdetector').css('min-height', base.height());
			$('#jqrgdetector').css('min-width', base.width());
			$('#jqrgdetector').css('background', 'url(images/chaos.png) no-repeat ' + (base.height()/2-48) + 'px ' + (base.width()/2-48) + 'px');
			var randomSeed = []; //setting up the seed for the randomness
			var limit = 0;
			var random = '';
			$('#jqrgdetector').mousemove(function(e){
				var tOffset = Math.floor((Number(new Date().getTime()))/Math.PI);
				limit = randomSeed.push(tOffset - (e.pageX ^ e.pageY));
				$(options.target).val(options.message);
				if (limit == 250) {
					$(this).hide();
					base.html('<div id="jqrgdone"></div>');
					$('#jqrgdone').css('min-height', base.height());
					$('#jqrgdone').css('min-width', base.width());
					$('#jqrgdone').css('background', 'url(images/done.png) no-repeat ' + (base.height()/2-48) + 'px ' + (base.width()/2-48) + 'px');
					for (i = 0; i < options.rSize; i++) {
						lottery = Math.floor(Math.random() * (limit + 1));
						rindex = randomSeed[lottery] % options.pool.length;
						random += options.pool.substring(rindex, rindex + 1);
					}
					$(options.target).val(random);
				}
			});
    });
  }
})(jQuery);