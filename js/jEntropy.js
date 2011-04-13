/*=======================================================
// jEntropy.js
// Version: 1.1
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
						rSize: '10',																			//
						pool: 'abcdefghijklmnopqrstuvwxyz0123456789',											// Default options. Don't change these, use the options when calling the plugin instead.
						message: 'Move your mouse cursor around to collect entropy for the random generator.',	//
  						disable: false
					}
  	
    				var options = $.extend(defaults, options);
    				var o = options;
    				var done = false;
	
					return this.each(function() {
							var base = $(this);
							base.focus(function() {
								if (!done) {
									$('body').append('<div id="jEntropy"><p>' + o.message + '</p><div id="jEProgCont"><div id="jEProgress"></div></div></div><div id="jEOverlay"></div>');
									$('#jEntropy').css('position', 'absolute');
									$('#jEntropy').css('top', $(window).height()/2 - $('#jEntropy').height()/2);
									$('#jEntropy').css('left', $(window).width()/2 - $('#jEntropy').width()/2);
									$('#jEntropy').css('background', 'url(images/chaos.png) no-repeat ' + ($('#jEntropy').height()/2-48) + 'px ' + ($('#jEntropy').width()/2-48) + 'px');
									$('#jEProgress').css('width', '1%');
									$("#jEOverlay").fadeIn(600);
									$('#jEntropy').fadeIn(600);
									if (o.disable) {
										base.attr('disabled', true);
									}
									var randomSeed = [];
									var limit = 0;
									var random = '';
									$('body').mousemove(function(e){
										var tOffset = Math.floor((Number(new Date().getTime()))/Math.PI); // Got to have Pi in it. Makes it all scientific. Not to mention tasty.
										limit = randomSeed.push(tOffset - (e.pageX ^ e.pageY));
										$('#jEProgress').css('width', (limit/200)*100 + '%');
										if (limit > 200) {
											$('#jEProgress').css('width', '100%');
										}
										if (limit == 200) {
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
								}
							});
    				});
		},
  		
  		hide : function(options, callback) {
  			$('#jEOverlay').fadeOut(600);
  			$(this).fadeOut(600);
  			$(this).remove();
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