/*=======================================================
// jEntropy.js
// Version: 0.6
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
						rSize: '10',
						pool: 'abcdefghijklmnopqrstuvwxyz0123456789',
						aHide: false
  					}
  	
    				var options = $.extend(defaults, options);
    				var o = options;
	
					return this.each(function() {
							var base = $(this);
							base.focus(function() {
								$('body').append('<div id="jEntropy"><div id="jEDetector"></div></div><div id="jEOverlay"></div>');
								$('#jEntropy').css('position', 'absolute');
								$('#jEntropy').css('top', $(window).height()/2 - $('#jEntropy').height()/2);
								$('#jEntropy').css('left', $(window).width()/2 - $('#jEntropy').width()/2);
								$('#jEDetector').css('min-height', $('#jEntropy').height());
								$('#jEDetector').css('min-width', $('#jEntropy').width());
								$('#jEDetector').css('background', 'url(images/chaos.png) no-repeat ' + ($('#jEntropy').height()/2-48) + 'px ' + ($('#jEntropy').width()/2-48) + 'px');
								$("#jEOverlay").fadeIn(400);
								$('#jEntropy').fadeIn(400);
								base.attr('disabled', true);
								var randomSeed = [];
								var limit = 0;
								var random = '';
								var done = false;
								$('#jEDetector').mousemove(function(e){
									var tOffset = Math.floor((Number(new Date().getTime()))/Math.PI);
									limit = randomSeed.push(tOffset - (e.pageX ^ e.pageY));
									if (limit == 200) {
										$(this).fadeOut(400);
										$('#jEntropy').html('<div id="jEDone"><div id="jEMsg"></div></div>');
										$('#jEDone').css('display', 'none');
										$('#jEDone').css('min-height', $('#jEntropy').height());
										$('#jEDone').css('min-width', $('#jEntropy').width());
										$('#jEDone').css('background', 'url(images/done.png) no-repeat ' + ($('#jEntropy').height()/2-48) + 'px ' + ($('#jEntropy').width()/2-48) + 'px');
										$('#jEMsg').css('margin', 'auto');
										$('#jEMsg').css('padding-top', $('#jEntropy').height() * 0.10);
										$('#jEMsg').css('width', $('#jEntropy').width() * 0.80);
										$('#jEDone').fadeIn(600);
										for (i = 0; i < o.rSize; i++) {
											lottery = Math.floor(Math.random() * (limit + 1));
											rindex = randomSeed[lottery] % o.pool.length;
											random += o.pool.substring(rindex, rindex + 1);
										}
										base.val(random);
										done = true;
										$('#jEntropy').jEntropy('hide');
									}
								});
							});
							base.click(function() {
								if(done) {
									base.jEntropy(o);
								}
							});
    				});
		},
  		
  		hide : function(options, callback) {
  			$('#jEOverlay').fadeOut(400);
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