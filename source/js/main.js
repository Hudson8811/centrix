'use strict';

/******************
	Template Name: Centrix
  Description: Centrix - Personal CV/Resume HTML Template
  Author: Paul
  Author URI: http://themeforest.net/user/Paul_tf


	1. Common
	2. Inits
		2.1 Init parallax
		2.2 Init google map
		2.3 Animsition init
		2.4 AOS init
	3. Header
	4. Change opacity logo on scroll
	5. Fixed footer
	6. Mobile menu
	7. Hint fields
	8. Accordion
	9. Carousels
		9.1 Carousel
		9.2 Team carousel
	10. Animation of statistics
	11. Tooltip pages
	12. Masonry
	13. Pagepiling
	14. Animation of skills
	15. Anchor
	16. Projects listing

***************/

/*** 1. Common ***/

var body = $('body');
var DURATION = 300;
var preloader = $('.preloader');
var header = $('.header');
var mobileBreakpoint = 992;

function setOverlay(cb) {
	var overlay = $('<div class="overlay"></div>');
	overlay.on('click', cb);
	return overlay;
}

function getScrollbarWidth() {
	var block = $('<div>').css({'height':'50px','width':'50px'});
	var indicator = $('<div>').css({'height':'200px'});

	$('body').append(block.append(indicator));

	var w1 = $('div', block).innerWidth();
	block.css('overflow-y', 'scroll');

	var w2 = $('div', block).innerWidth();
	$(block).remove();

	return (w1 - w2);
}

function animate({timing, draw, duration}) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
			timeFraction = 1;
		}

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

/*** 2. Inits ***/

/* 2.1 Init parallax */
//= parts/init-parallax.js

/* 2.2 Init google map */
//= parts/init-map.js

/* 2.3 Animsition init */
//= parts/animsition-init.js

/* 2.4 AOS init */
//= parts/aos-init.js


/* 3. Header */
//= parts/header.js

/* 4. Change opacity logo on scroll */
//= parts/opacity-logo.js

/* 5. Fixed footer */
//= parts/fixed-footer.js

/* 6. Mobile menu */
//= parts/mobile-menu.js

/* 7. Hint fields */
//= parts/field.js

/* 8. Accordion */
//= parts/accordion.js

/*** 9. Carousels ***/

/* 9.1 Carousel */
//= parts/carousel.js

/* 9.2 Team carousel */
//= parts/team-carousel.js

/* 10. Animation of statistics */
//= parts/statistics.js

/* 11. Tooltip pages */
//= parts/tooltip.js

/* 12. Masonry */
//= parts/masonry.js

/* 13. Pagepiling */
//= parts/pagepiling.js

/* 14. Animation of skills */
//= parts/skills.js

/* 15. Anchor */
//= parts/anchor.js

/* 16. Projects listing */
//= parts/projects-listing.js
