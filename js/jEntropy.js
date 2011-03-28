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
						resetText: 'Click into the box to re-generate the string',
						aHide: false
  					}
  	
    				var options = $.extend(defaults, options);
    				var o = options;
	
					return this.each(function() {
							var base = $(this);
							base.html('<div id="jEDetector"></div>');
							$('#jEDetector').css('display', 'none');
							$('#jEDetector').css('min-height', base.height());
							$('#jEDetector').css('min-width', base.width());
							$('#jEDetector').css('background', 'url(images/chaos.png) no-repeat ' + (base.height()/2-48) + 'px ' + (base.width()/2-48) + 'px');
							$('#jEDetector').fadeIn(600);
							var randomSeed = [];
							var limit = 0;
							var random = '';
							var done = false;
							$('#jEDetector').mousemove(function(e){
								var tOffset = Math.floor((Number(new Date().getTime()))/Math.PI);
								limit = randomSeed.push(tOffset - (e.pageX ^ e.pageY));
								$(o.target).val(o.message);
								if (limit == 200) {
									$(this).fadeOut(400);
									base.html('<div id="jEDone"><div id="jEMsg">' + o.resetText + '</div></div>');
									$('#jEDone').css('display', 'none');
									$('#jEDone').css('min-height', base.height());
									$('#jEDone').css('min-width', base.width());
									$('#jEDone').css('background', 'url(images/done.png) no-repeat ' + (base.height()/2-48) + 'px ' + (base.width()/2-48) + 'px');
									$('#jEMsg').css('margin', 'auto');
									$('#jEMsg').css('padding-top', base.height() * 0.10);
									$('#jEMsg').css('width', base.width() * 0.80);
									$('#jEDone').fadeIn(600);
									for (i = 0; i < o.rSize; i++) {
										lottery = Math.floor(Math.random() * (limit + 1));
										rindex = randomSeed[lottery] % o.pool.length;
										random += o.pool.substring(rindex, rindex + 1);
									}
									$(o.target).val(random);
									done = true;
									if(o.aHide) {
										base.jEntropy('hide');
									}
								}
							});
							base.click(function() {
								if(done) {
									base.jEntropy(o);
								}
							});
    				});
		},
  		
  		hide : function(options, callback) {
  			$(this).fadeOut(400);
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