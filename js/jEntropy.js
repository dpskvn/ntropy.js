/*=======================================================
// jEntropy.js
// Version: 0.5
// Author: Dino Paskvan
// Mail: dpaskvan@gmail.com
// Web: http://www.confusedtree.com
// Copyright (c) 2011 Dino Paskvan
// licence : MIT
========================================================= */

(function($) {
  	var methods = {
  		init : function(options, callback) {
  					var defaults = {
  						target: '#output',
						rSize: '10',
						pool: 'abcdefghijklmnopqrstuvwxyz0123456789',
						message: 'Keep moving the mouse.',
						resetText: 'Reset'
  					}
  	
    				var options = $.extend(defaults, options);
    				var o = options;
	
					return this.each(function() {
							var base = $(this);
							base.html('<div id="jEDetector"></div>');
							$('#jEDetector').css('min-height', base.height());
							$('#jEDetector').css('min-width', base.width());
							$('#jEDetector').css('background', 'url(images/chaos.png) no-repeat ' + (base.height()/2-48) + 'px ' + (base.width()/2-48) + 'px');
							var randomSeed = [];
							var limit = 0;
							var random = '';
							$('#jEDetector').mousemove(function(e){
								var tOffset = Math.floor((Number(new Date().getTime()))/Math.PI);
								limit = randomSeed.push(tOffset - (e.pageX ^ e.pageY));
								$(o.target).val(o.message);
								if (limit == 250) {
									$(this).hide();
									base.html('<div id="jEDone"><input type="button" value="' + o.resetText + '" id="jEReset" /></div>');
									$('#jEDone').css('min-height', base.height());
									$('#jEDone').css('min-width', base.width());
									$('#jEDone').css('background', 'url(images/done.png) no-repeat ' + (base.height()/2-48) + 'px ' + (base.width()/2-48) + 'px');
									for (i = 0; i < o.rSize; i++) {
										lottery = Math.floor(Math.random() * (limit + 1));
										rindex = randomSeed[lottery] % o.pool.length;
										random += o.pool.substring(rindex, rindex + 1);
									}
									$(o.target).val(random);
								}
							});
							$('#jEReset').click(function() {
								alert('Rock on!');
							});
    				});
  		}
  	};
  	
  	$.fn.jEntropy = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.jEntropy');
        }
    };
})(jQuery);