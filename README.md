LibraSlider
===========

LibraSlider is a simple jQuery slider plugin.
It features two types of transitions between images, play-controls and dots marking
the currently displayed image as well as taking the user to the respective image when
they are clicked.
There are options to decide what controls to show and how the slider behaves.

Installation
------------

Download the plugin from: http://github/libra3d/libraSlider  
Or clone the repository from github: `git clone git://github/libra3d/libraSlider.git`  

The plugin contains three files: libraSlider.js, libraSlider.css and libraSlider-buttons.png.
If you want to place the files in different folders you need to edit the url to the image in the css-file.
Include the files inside the head tag. It should look something like this:

	<head>
		<link rel="stylesheet" href="libraSlider/libraSlider.css">
		<script src="js/jQuery.js"></script>
		<script src="libraSlider/libraSlider.js"></script>
	</head>

LibraSlider is now installed and ready, the next section explains how to use the plugin.

Note: *Don't forget to include jQuery before libraSlider.js*

Usage
-----

LibraSlider is very simple to use and doesn't require much to set up.

### HTML ###

The structure of the html markup looks like this:

	<div id="slider-wrapper">
		<div class="slider">
			<div><img src="image-1.jpg" alt="image"></div>
			<div>
				<img src="image-2.jpg" alt="image">
				<div><h1>Some text...</h1></div>
			</div>
			<div><img src="image-3.jpg" alt="image"></div>
			<div><img src="image-4.jpg" alt="image"></div>
		</div>
	</div>

The first div with an id of *slider-wrapper* is holding the slider and the dynamically
added controls. The next div is a container for the div's holding the images. It has the 
class *slider* applied which is required for proper behavior and shouldn't be removed.
LibraSlider uses div tags as containers for the images and optional div tags can be added inside those
to hold text or other elements. This is demonstrated above for the second image.

### JavaScript ###

Add the following JavaScript inside a script tag at the bottom of the document,
right before the closing body tag:
	
	
	$(document).ready(function() {
		$('#slider-wrapper').libraSlider({'width': 800, 'height': 300});
	});

The first line makes sure the page is fully loaded before activating the plugin. Since this code is placed
at the bottom of the page it's not really necessary because the content of the page is already loaded, but
is used as a precaution.
The second line uses the jQuery selector to grab the div with an id of slider-wrapper and is followed by
the method libraSlider that runs the plugin. An object with two properties are passed as an argument to the 
libraSlider method. The width and height properties sets the dimensions of the slider and are mandatory!
The width and height should match the dimensions of the images used.

Options
-------

LibraSlider comes with some handy options to customize the appearance and functionality. Those are defined
in an object passed to the libraSlider method. We have already used two of them - width and height.  
  
### width (number) & height (number) ###
Set width and height of the slider in pixels.  
Example:
	
	$('#slider-wrap').libraSlider({
		'width': 800,
		'height': 300
	});

*** This must be defined! ***

- - - - - - - - -  

### slideSpeed (number) ###
Sets the transition speed of the slides  
*Default value: 1000 *  
Example:  

	$('#slider-wrap').libraSlider({
		'slideSpeed': 700
	});

- - - - - - - - -  

### slideInterval (number) ###
Sets the interval between slides  
*Default value: 4000*  
Example:  

	$('#slider-wrap').libraSlider({
		'slideInterval': 5000
	});

- - - - - - - - -  
	
### slideType (string) ###
Sets the type of transition. Possible values are:  

* slide
* dissolve

*Default value: slide*  
Example:  

	$('#slider-wrap').libraSlider({
		'slideType': 'dissolve'
	});

- - - - - - - - -  

### autoSlideShow (bool) ###
Sets if slider should play automatically  
*Default value: true*  
Example:  

	$('#slider-wrap').libraSlider({
		'autoSlideshow': false
	});

- - - - - - - - -  

### showPlayControls (bool) ###
Sets if navigation buttons should be displayed  
*Default value: true*  
Example:  

	$('#slider-wrap').libraSlider({
		'showPlayControls': true
	});

- - - - - - - - -  

### showIndexCircles (bool) ###
Sets if the dots should be displayed  
*Default value: true*  
Example:

	$('#slider-wrap').libraSlider({
		'showIndexCircles': false
	});

- - - - - - - - -  

### enableIndexControl (bool) ###
Sets if the dots should be click-able  
*Default value: true*  
Example:

	$('#slider-wrap').libraSlider({
		'showIndexCircles': true,
		'enableIndexControl': false
	});

- - - - - - - - -  

### Example with multiple options ###
This example demonstrates the use of multiple options and sets up
a slider with disabled play controls and non clickable index dots.

	$('#slider-container').libraSlider({
		'width': 800,
		'height': 300,
		'showPlayControls': false,
		'showIndexCircles': true,
		'enableIndexControl': false,
		'slideSpeed': 700,
		'slideInterval': 6000,
		'slideType': 'dissolve'
	});

- - - - - - - - -  

Current limitations
-------------------

LibraSlider only supports one slider per page. Future versions will have this feature implemented.

License
-------

Copyright 2013 by Stanley Svensson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.