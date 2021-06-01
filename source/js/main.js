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

/* 2. Animsition init */
//= parts/animsition-init.js

/* 3. Mobile menu */
//= parts/mobile-menu.js

/* 3. Hint fields */
//= parts/field.js

/* 4. Masonry */
// //= parts/masonry.js

/* 5. Pagepiling */
//= parts/pagepiling.js
