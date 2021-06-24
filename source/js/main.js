'use strict';

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



var images = document.querySelectorAll('.__js_parallax img');
new simpleParallax(images, {
	scale: 1.3
});

/* AOS init */
//= parts/aos-init.js

/* 1. Header */
//= parts/header.js



/* Change opacity logo on scroll */
//= parts/opacity-logo.js

/* Parallax first screen on scroll */
//= parts/parallax-bg.js

/* 13. Fixed footer */
//= parts/fixed-footer.js

/* 2. Animsition init */
//= parts/animsition-init.js


/* 3. Mobile menu */
//= parts/mobile-menu.js

/* 3. Hint fields */
//= parts/field.js

/* 4. Accordion */
//= parts/accordion.js

/* 5. Carousels */
/* 5.1 Carousel */
//= parts/carousel.js

/* 5.2 Team carousel */
//= parts/team-carousel.js

/* 6. Animation of statistics */
//= parts/statistics.js

/* 7. Tooltip pages */
//= parts/tooltip.js

/* 8. Masonry */
//= parts/masonry.js

/* 9. Pagepiling */
//= parts/pagepiling.js

/* 10. Animation of skills */
//= parts/skills.js

/* 11. Init simple parallax */
//= parts/simple-parallax.js

/* 12. Anchor */
//= parts/anchor.js

/* 13. Projects listing */
//= parts/projects-listing.js
