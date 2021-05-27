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
(function() {
	//$(document).ready(function() {
		$(".animsition").animsition({
			inClass: 'fade-in',
			outClass: 'fade-out',
			inDuration: 1500,
			outDuration: 1000,
			linkElement: '.animsition-link',
			// e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
			loading: true,
			loadingParentElement: 'body', //animsition wrapper element
			loadingClass: 'preloader',//'animsition-loading',
			loadingInner: `<div class="preloader__spinner">
				<span class="preloader__double-bounce"></span>
				<span class="preloader__double-bounce preloader__double-bounce--delay"></span>
			</div>`, // e.g '<img src="loading.svg" />
			timeout: false,
			timeoutCountdown: 5000,
			onLoadEvent: true,
			browser: [ 'animation-duration', '-webkit-animation-duration'],
			// "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
			// The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
			overlay : false,
			overlayClass : 'animsition-overlay-slide',
			overlayParentElement : 'body',
			transition: function(url){ window.location.href = url; }
		});

		setTimeout(function(){
			//preloader.fadeOut(DURATION);
		}, 1000);

	//})
})();

/* 3. Mobile menu */
(function() {
	var menuOpenBtn = $('.menu-toggle');
	var menu = $('.mobile-canvas');
	var headerContainer = $('.header__container');
	var animsition = $('.animsition');
	var isHandled = false;
	var menuIsOpened = false;

	//var dropdownLinks = menu.find('.__js_menu-dropdown-link');
	var mobileDropdownLinks = $('.navigation__link');

	var ModifierClass = {
		MENU: 'mobile-canvas--opened',
		TOGGLE: 'menu-toggle--opened'
	};

	changeClassNavLink();

	menuOpenBtn.on('click', function() {
		menuIsOpened ? closeMenu() : openMenu();
	});


	if ($(window).width() < mobileBreakpoint && !isHandled) {
		mobileDropdownLinks.on('click', openMobileDropdown);
		isHandled = true;
	}

	$(window).on('resize', function() {

		if ($(window).width() < mobileBreakpoint && !isHandled) {
			mobileDropdownLinks.on('click', openMobileDropdown);
			isHandled = true;
		} else {
			mobileDropdownLinks.off('click', openMobileDropdown);
			isHandled = false;
		}

		changeClassNavLink();

	});

	function changeClassNavLink() {
		if ($(window).width() < mobileBreakpoint) {
			mobileDropdownLinks.each(function() {
				if($(this).next().length !== 0) {
					$(this).removeClass('animsition-link');
				}
			});
		} else {
			mobileDropdownLinks.addClass('animsition-link');
		}
	}

	function openMobileDropdown(evt) {
		var dropdown = $(this).next();
		$('.navigation__dropdown').slideUp(DURATION);

		if (dropdown.length !== 0) {
			evt.preventDefault();
			dropdown.find('a[href]').on('click', closeMenu);
			dropdown.css('display') === 'block' ? dropdown.slideUp(DURATION) : dropdown.slideDown(DURATION);
		}
	}

	function openMenu() {
		var overlay = setOverlay(closeMenu);//
		headerContainer.append(overlay);

		menuOpenBtn.addClass(ModifierClass.TOGGLE);
		menuIsOpened = true;

		setTimeout(function() {
			overlay.fadeIn(DURATION);

			menu.addClass(ModifierClass.MENU);
		}, DURATION + 50);
	}

	function closeMenu() {
		//menuCloseBtn.off('click', closeMenu);
		menu.removeClass(ModifierClass.MENU);
		//menuOpenBtn.removeClass(ModifierClass.TOGGLE);
		var overlay = $('.overlay').fadeOut(DURATION);
		menuIsOpened = false;

		setTimeout(function() {
			menuOpenBtn.removeClass(ModifierClass.TOGGLE);
			overlay.remove();
		}, DURATION + 50);
	}

	$(window).on('resize', function() {
		var windowWidth = $(window).width();

		if (windowWidth >= mobileBreakpoint) {
			closeMenu();
		}
	});
})();

/* 3. Hint fields */
(function() {
	var fields = $('.field input, .field textarea');
	var ModifierClass = 'field--filled';

	fields.on('focus', function() {
		$(this).parent().addClass(ModifierClass);
	});

	fields.on('blur', function() {
		if (!$(this).val()) {
			$(this).parent().removeClass(ModifierClass);
		}
	});
})();

/* 4. Accordion */
(function(){
	var btn = $('.accordion__item-header');
	var content = $('.accordion__item-body');
	var modifierClass = 'accordion__item-header--opened';

	btn.on('click', function() {
		$(this).toggleClass(modifierClass).next().slideToggle(DURATION);
	});
})();

/* 5. Carousels */
(function() {
	var carousel = new Swiper('.__js_carousel', {
		slidesPerView: 'auto',
		spaceBetween: 60,
		loop: true,
		//centeredSlides: true,
		navigation: {
			nextEl: '.carousel__btn--next',
			prevEl: '.carousel__btn--prev',
		},
	});
})();