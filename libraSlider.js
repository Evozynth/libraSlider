/**
 * LibraSlider
 * 
 * Version: 0.0.1
 * Author: Stanley Svensson
 * Updated: 2013-07-01
 *
 * LibraSlider is an Open Source project. Contribute at GitHub
 * https://github.com/libra3d/libraSlider
 *
 * Copyright 2013 by Stanley Svensson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 * LibraSlider is a simple slider jQuery plugin.
 * The plugin requires that the image dimensions are provided, else
 * the slider will not load. See the example below to quickle get up
 * and running.
 *
 * Example:
 * <div id="slider-wrapper">
 *		<div class="slider">
 *			<div>
 *				<img src="image1.jpg" alt="image">
 *				<div><h1>A beatiful picture</h1></div>
 *			</div>
 *			<div><img src="image2.jpg" alt="image"></div>		
 *		</div>
 *	</div>
 *
 * $('#slider-wrapper').libraSlider({'width': 800, 'height': 300});
 * 
 *
 * More documentation on github: https://github.com/libra3d/libraSlider
 *
 */
(function($) {

	$.fn.libraSlider = function(options) {
		
		var options = $.extend({}, $.fn.libraSlider.defaults, options),
			
			$this = $(this).css({'width': options.width, 'height': options.height}),
			sliderDiv = $this.children().first('div').css({'width': options.width, 'height': options.height,'overflow': 'hidden'}),
			imgs = sliderDiv.children('div'),
			imgsLen = imgs.length,
			current = 0,
			nextImg = 0,
			timer,
			animInProgress = false;
		
		return this.each( function() {
			// Make sure width and height are set, else abort
			if (options.width === 0 || options.height === 0) {
				return false;
			}
			
			// Prepare the images 
			init();
			
			if (options.showPlayControls) {
				showPlayControls();
			}
			
			if (options.showIndexCircles) {
				showIndexCircles();
				if (options.enableIndexControl) {
					enableIndexControl();
				}
			}
			
			if (options.autoSlideshow) {
				playSlideShow();
			} else {
				pauseSlideShow();
			}
		});
		
		// Set up the slider
		function init() {			
			$.each(imgs, function(i) {
				// Show the first image else hide them
				if (i !== current) {
					$(imgs[i]).hide().css('z-index', 9);
				} else {
					$(imgs[i]).css({
						'display': 'block',
						'z-index': 10
					});
				}
			});
		};
		
		function showPlayControls(index) {
			// Create controls
			var sliderNav = $('<div id="slider-nav">').attr('class', 'slider-nav'),
				prev = $('<div>').attr('class', 'slider-prev').data('action', 'prev'),
				next = $('<div>').attr('class', 'slider-next').data('action', 'next'),
				playPause = $('<div id="play-pause">').attr('class', 'slider-pause').data('action', 'pause');
			
			sliderNav.append(prev, next, playPause);
			$this.append(sliderNav);
			sliderNav.show().find('div').on('click', function(event) {
				event.stopPropagation();
				var action = $(this).data('action');
				
				switch (action) {
					case 'next':
					case 'prev': {
						pauseSlideShow();
						if (!animInProgress) {
							doTransition(options.slideType, action);
							// slide(action);
						}
						break;
					}
					case 'pause': {
						pauseSlideShow();
						break;
					}
					case 'play': {
						if (!timer) {
							playSlideShow();
						}
						break;
					}
						
				}
			});
		}
		
		function showIndexCircles() {
			var circle,
				circlesDiv = $('<div id="slider-circles">');
			$.each(imgs, function(i) {
				if (i === 0) {
					circle = $('<div>').attr('data-action', i).attr('class', 'slider-current');
					circlesDiv.append(circle);
				} else {
					circle = $('<div>').attr('data-action', i).attr('class', 'slider-blank');
					circlesDiv.append(circle);
				}
			});
			
			$this.append(circlesDiv);
		}
		
		function enableIndexControl() {
			$('#slider-circles').find('div').css('cursor', 'pointer').on('click', function(event) {
				event.stopPropagation();
				var action = $(this).data('action');
				
				pauseSlideShow();
				
				// Check settings to determin if playSlideShow should be reinvoked
				if (options.autoSlideshow && !options.showPlayControls) {
					setTimeout(function() {
						if (!timer) {
							playSlideShow();
						}
					}, options.slideInterval)
				}
				if (!animInProgress) {
					doTransition(options.slideType, action);
				}
			});
		}
		
		function slide(direction) {
			var loc = 0;
			
			animInProgress = true;			
			
			if (typeof direction === 'number') {
				// Do not do anything if clicked on the current index
				if (direction === current) {
					animInProgress = false;
					return;
				}
				nextImg = direction;
				direction = (current > nextImg) ? 'prev' : 'next';
			} else {
				// Update nextImg value
				( direction === 'next' ) ? ++nextImg : --nextImg;
			}
			
			// Make sure to stay in range
			if (nextImg < 0 ) {
				nextImg = imgsLen - 1;
			}
			nextImg = nextImg % imgsLen;
			
			// Update circles to reflect current image
			if (options.showIndexCircles) {
				updateIndexCircles();
			}
			
			if (direction === 'next') {
				loc = options.width;
				
				$(imgs[nextImg])
					.css({
						'left': loc,
						'z-index': 10
					})
					.show()
					.animate({'left': 0}, options.slideSpeed);
				
				$(imgs[current]).animate({'left': -loc}, options.slideSpeed, function () {
					$(this).hide().css('z-index', 0);
					animInProgress = false;
				});
				
			} else if ( direction === 'prev') {
				loc = -options.width;
				
				$(imgs[nextImg])
					.css({
						'left': loc,
						'z-index': 10
					})
					.show()
					.animate({'left': 0}, options.slideSpeed);
				
				$(imgs[current]).animate({'left': -loc}, options.slideSpeed, function() {
					$(this).hide().css('z-index', 0);
					animInProgress = false;
				});
			}
			
			// update current
			current = nextImg;
		}
		
		function dissolve(direction) {
			animInProgress = true;			
			
			if (typeof direction === 'number') {
				// Dont do anything if clicked on the current index
				if (direction === current) {
					animInProgress = false;
					return;
				}
				nextImg = direction;
				direction = (current > nextImg) ? 'prev' : 'next';
			} else {
				// Update nextImg value
				( direction === 'next' ) ? ++nextImg : --nextImg;
			}
			
			// Make sure to stay in range
			if (nextImg < 0 ) {
				nextImg = imgsLen - 1;
			}
			nextImg = nextImg % imgsLen;
			
			// Update circles to reflect current image
			if (options.showIndexCircles) {
				updateIndexCircles();
			}
			
			$(imgs[current])
				.css('z-index', '10')
				.fadeOut(options.slideSpeed, function () {
					$(this).css('z-index', '9');
					animInProgress = false;
				});
			$(imgs[nextImg]).css('z-index', '9').show();
			
			// update current
			current = nextImg;
		}
		
		function doTransition(type, direction) {
			if (type === 'dissolve') {
				dissolve(direction);
			} else {
				slide(direction);
			}
		}
		
		function updateIndexCircles() {
			var circles = $('#slider-circles').children('div');
			$.each(circles, function (i, val) {
				if (i === nextImg) {
					$(val).attr('class', 'slider-current');
				} else {
					$(val).attr('class', 'slider-blank');
				}
			});
		}
		
		function playSlideShow() {
			$('#play-pause').data('action', 'pause').attr('class', 'slider-pause');
			timer = setInterval(function() {
				doTransition(options.slideType, 'next');
			}, options.slideInterval);
		}
		
		function pauseSlideShow() {
			$('#play-pause').data('action', 'play').attr('class', 'slider-play');
			clearInterval(timer);
			timer = null;
		}
	};
	
	$.fn.libraSlider.defaults = {
		width: 0,
		height: 0,
		slideSpeed: 1000,
		slideInterval: 4000,
		slideType: 'slide',
		autoSlideshow: true,
		showPlayControls: true,
		showIndexCircles: true,
		enableIndexControl: true
	};

})(jQuery);