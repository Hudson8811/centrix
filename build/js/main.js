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

/* AOS init */
(function() {
	$('window').on('animsition.inEnd', function(){});

	var isotopIsThere = $('*').is('.__js_portfolio-section-masonry') || $('*').is('.__js_blog-grid');


	$(window).on('load', function() {

		if (!isotopIsThere) {
			AOS.init({
				duration: 1000
			});
		} else {
			setTimeout(function() {
				AOS.init({
					duration: 1000
				});
			}, 1500)
		}

	});
})();
/* 1. Header */
(function() {
	var header = $('.header');
	var leftward = $('.leftward-wrapper');
	var ModifierClass = {
		FIXED: 'header--fixed',
		IS_FIXED: 'is-fixed',
		ABSOLUTE: 'header--absolute',
		WHITE: 'header--white',
		BG_WHITE: 'header--bg-white',
		LEFTWARD: 'header--leftward'
	};

	var headerClasses = header.hasClass(ModifierClass.BG_WHITE) || header.hasClass(ModifierClass.WHITE) ? ModifierClass.FIXED : ModifierClass.WHITE + ' ' + ModifierClass.FIXED;

	var windowWidth = $(window).width();
	var headerOffset = header.offset().top;
	var scroll = $(window).scrollTop();

	var isScroll = false;
	var isMobileWidth = windowWidth < mobileBreakpoint;
	var isStaticHeader = !header.hasClass(ModifierClass.ABSOLUTE);
	var isLeftwardHeader = header.hasClass(ModifierClass.LEFTWARD);

	$(window).on('animsition.inEnd', function(){
		var Height = {
			HEADER: header.outerHeight(),
			LEFTWARD: leftward.length !== 0 ? leftward.outerHeight() : 0
		};

		changeStateHandler();

		$(window).on('resize', function() {
			setTimeout(function() {
				Height.HEADER = header.outerHeight();
				Height.LEFTWARD = leftward.outerHeight();
				windowWidth = $(window).width();
				isMobileWidth = windowWidth < mobileBreakpoint;
				changeStateHandler();
			}, DURATION);
		});

		function changeStateHandler() {
			if ( isLeftwardHeader && isMobileWidth || !isLeftwardHeader) {
				resetHeader();
				window.onscroll = onScrollTwo;

			} else  {
				resetHeader();
				window.onscroll = onScrollOne;
			}
		}

		function onScrollOne() {
			scroll = $(window).scrollTop();

			if(scroll > Height.LEFTWARD - Height.HEADER) {

				header.css({'position': 'absolute', 'top': 'auto', 'bottom': '0'})
			} else {
				header.removeAttr('style');
			}
		}

		function onScrollTwo() {
			scroll = $(window).scrollTop();

			if (scroll >= headerOffset + Height.HEADER) {
				isScroll = true;

				header.addClass(headerClasses);
				Height.HEADER = isScroll ? header.outerHeight() : Height.HEADER;


				if (!header.hasClass(ModifierClass.IS_FIXED)) {
					header.css({'top': -Height.HEADER + 'px', 'transform': ' translateY(' + Height.HEADER + 'px)'}).addClass(ModifierClass.IS_FIXED);

					if (isStaticHeader) {
						body.css('padding-top', Height.HEADER + 'px');
					}
				}
			} else {
				isScroll = false;
				header.removeClass(headerClasses + ' ' + ModifierClass.IS_FIXED).removeAttr('style');

				if (isStaticHeader) {
					body.css('padding-top', 0);
				}
			}
		}

		function resetHeader() {
			header.removeClass(headerClasses + ' ' + ModifierClass.IS_FIXED).removeAttr('style');
			body.css('padding-top', '0');
		}
	});
})();

					/* 4. Fixed header */
					// parts/fixed-header.js

					/* 4. sticky header */
					// parts/leftward-header.js

/* 13. Fixed footer */
(function() {

	$(window).on('load', function() {
		var footer = $('.__js_fixed-footer');
		var footerHeight = footer.innerHeight();

		if(footer.length !== 0) {
			if (footerHeight <= $(window).height()) {
				footer.css({ 'position': 'fixed', 'left': '0', 'right': '0', 'bottom': '0'});
				body.css('padding-bottom', footerHeight);
			} else {
				body.css('padding-bottom', '0');
				footer.removeAttr('style')
			}

			$(window).on('resize', function() {
				footerHeight = footer.innerHeight();

				if (footerHeight <= $(window).height()) {
					footer.css({ 'position': 'fixed', 'left': '0', 'right': '0', 'bottom': '0'});
					body.css('padding-bottom', footerHeight);
				} else {
					body.css('padding-bottom', '0');
					footer.removeAttr('style');
				}
			});
		}
	});
})();

/* 2. Animsition init */
(function() {
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
})();


/* 3. Mobile menu */
(function() {
	var menuOpenBtn = $('.menu-toggle');
	var menuCloseBtn = $('.mobile-canvas__close');
	var menu = $('.mobile-canvas');
	var header = $('.header');
	var menu2 = $('.header__menu');
	var headerContainer = $('.header__container');

	var animsition = $('.animsition');
	var isHandled = false;
	var menuIsOpened = false;
	var isLeftwardHeader = $('.header').hasClass('header--leftward');

	//var dropdownLinks = menu.find('.__js_menu-dropdown-link');
	var mobileDropdownLinks = $('.navigation__link');

	var ModifierClass = {
		MOBILE_CANVAS: 'mobile-canvas--opened',
		MENU: 'header__menu--opened',
		TOGGLE: 'menu-toggle--opened',
		CURRENT_ITEM: 'navigation__item--current'
	};

	changeClassNavLink();

	menuOpenBtn.on('click', function() {
		if (isLeftwardHeader && $(window).width() < mobileBreakpoint || !isLeftwardHeader) {
			menuIsOpened ? closeMenu() : openMenu();
		} else {
			menuIsOpened ? closeLeftwardHeader() : openLeftwardHeader();
		}
	});

	if (menuCloseBtn.length > 0) {
		menuCloseBtn.on('click', closeMenu);
	}


	if ( ($(window).width() < mobileBreakpoint || isLeftwardHeader) && !isHandled ) {
		mobileDropdownLinks.on('click', openMobileDropdown);
		isHandled = true;
	}

	$(window).on('resize', function() {

		if ( ($(window).width() < mobileBreakpoint || isLeftwardHeader) && !isHandled ) {
			mobileDropdownLinks.on('click', openMobileDropdown);
			isHandled = true;
		} else {
			mobileDropdownLinks.off('click', openMobileDropdown);
			isHandled = false;
		}

		changeClassNavLink();

	});

	function changeClassNavLink() {
		if ($(window).width() < mobileBreakpoint || isLeftwardHeader) {
			mobileDropdownLinks.each(function() {
				if($(this).next().length !== 0) {
					$(this).removeClass('animsition-link');
				}
			});
		} else {
			mobileDropdownLinks.each(function() {
				var parent = $(this).parent();
				if (!parent.hasClass(ModifierClass.CURRENT_ITEM)) {
					$(this).addClass('animsition-link');
				}
			})
		}
	}

	function openMobileDropdown(evt) {
		var dropdown = $(this).next();



		if (dropdown.length !== 0) {
			evt.preventDefault();
			//dropdown.find('a[href]').on('click', closeMenu);

			//$('.navigation__dropdown').slideUp(DURATION).removeClass('is-open');

				$(this).parent().siblings().find('.navigation__dropdown').removeClass('is-open').slideUp(DURATION);

			if (dropdown.hasClass('is-open')) {

				dropdown.slideUp(DURATION).removeClass('is-open');

			} else {

				dropdown.slideDown(DURATION).addClass('is-open');

			}

			//dropdown.css('display') === 'block' ? dropdown.slideUp(DURATION) : dropdown.slideDown(DURATION);


		}
	}

	function openMenu() {
		var overlay = setOverlay(closeMenu);
		headerContainer.append(overlay);
		menuIsOpened = true;

		setTimeout(function() {
			overlay.fadeIn(DURATION);

			menuOpenBtn.addClass(ModifierClass.TOGGLE);
			if (isLeftwardHeader) {
				menu2.addClass(ModifierClass.MENU);
			} else {
				menu.addClass(ModifierClass.MOBILE_CANVAS);
			}
		}, DURATION + 50);
	}

	function closeMenu() {
		if (isLeftwardHeader) {
			menu2.removeClass(ModifierClass.MENU);
		} else {
			menu.removeClass(ModifierClass.MOBILE_CANVAS);
		}

		menuOpenBtn.removeClass(ModifierClass.TOGGLE);
		var overlay = $('.overlay').fadeOut(DURATION);
		menuIsOpened = false;

		setTimeout(function() {
			overlay.remove();
		}, DURATION + 50);
	}


	function openLeftwardHeader() {
		menuOpenBtn.addClass(ModifierClass.TOGGLE);
		header.addClass('shifted');
		header.next().css('transform', 'translateX(300px)');
		body.css({'overflow': 'hidden', 'margin-right': getScrollbarWidth() + 'px'});
		menuIsOpened = true;
	}

	function closeLeftwardHeader() {
		menuOpenBtn.removeClass(ModifierClass.TOGGLE);
		header.removeClass('shifted');
		header.next().css('transform', 'translateX(0)');

		setTimeout(function() {
			body.css({'overflow': '', 'margin-right': '0'});
			menuIsOpened = false;
		}, DURATION + 50);


	}

	$(window).on('resize', function() {
		var windowWidth = $(window).width();

		if (windowWidth >= mobileBreakpoint && !isLeftwardHeader) {
			closeMenu();
		} else if (isLeftwardHeader) {
			closeLeftwardHeader();
		}
	});
})();

/* 3. Hint fields */
(function() {
	var fields = $('.field input, .field textarea');
	//var fields = $('.field input').add('.field textarea');
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
/* 5.1 Carousel */
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

	var latestProjects = new Swiper('.__js_carousel-latest-projects', {
		slidesPerView: 'auto',
		spaceBetween: 60,
		loop: true,
		//centeredSlides: true,
		/*navigation: {
			nextEl: '.carousel__btn--next',
			prevEl: '.carousel__btn--prev',
		},*/
	});

	/*var carousels = {
		'latest-projects': latestProjects
	}*/

	var navBtn = $('.__js_navbtn-latest-projects');

	navBtn.on('click', function() {
		var direction = $(this).attr('data-dir');

		direction === 'prev' ? latestProjects.slidePrev() : latestProjects.slideNext();;
	})
})();

/* 5.2 Team carousel */
(function() {
	var carouselSelector = '.__js_team-carousel-only-mobile';
	var carousel;

	if ($(carouselSelector).length > 0) {

		initTeamCarousel();

		$(window).resize(function () {
			initTeamCarousel();
		});
	}

	function initTeamCarousel() {
		if (window.matchMedia('(min-width: 576px)').matches && carousel) {
			carousel.destroy();
			carousel = null;

		} else if (window.matchMedia('(max-width: 575px)').matches && carousel !== null) {
			carousel = new Swiper(carouselSelector, {
				speed: 300,
				slidesPerView: 'auto',
				spaceBetween: 40,
				loop: true
			});
		}
	}
})();

/* 6. Animation of statistics */
(function() {
	$(window).on('load', function() {
		var statistics = $('.statistics');
		var numbers = $('.__js_number');
		var animationIsDone = false;
		var scroll = $(window).scrollTop() + $(window).height();

		if ($('*').is('.statistics')) {
			var offset = statistics.offset().top;

			if (!animationIsDone && scroll >= offset) {
				animateNumbers();
			}

			$(window).on('scroll', function() {
				scroll = $(window).scrollTop() + $(window).height();

				if (!animationIsDone && scroll >= offset) {
					animateNumbers();
				}
			});
		}

		function animateNumbers() {
			numbers.each(function() {
				var endValue = parseInt($(this).attr('data-end-value'), 10);

				$(this).easy_number_animate({
					start_value: 0,
					end_value: endValue,
					duration: 1800
				});

			});

			animationIsDone = true;
		}
	});
})();

/* 7. Tooltip pages */
(function() {
	var windowWidth = $(window).width();

	var marqueeSpeed = windowWidth < mobileBreakpoint ? 10000 : 25000;

	$('.__js-marquee').bind('beforeStarting', function() {
			var item = $('.tooltip__item');
			item.on('mouseover', onMarqueeItemHover);
	}).marquee({
		 //speed in milliseconds of the marquee
    duration: marqueeSpeed,
    //gap in pixels between the tickers
    gap: 0,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,
		startVisible: true
	});

	$('.__js-marquee--reverse').bind('beforeStarting', function() {
			var item = $('.tooltip__item');
			item.on('mouseover', onMarqueeItemHover);
	}).marquee({
		 //speed in milliseconds of the marquee
    duration: marqueeSpeed,
    //gap in pixels between the tickers
    gap: 0,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'right',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,
		startVisible: true
	});



	function onMarqueeItemHover() {
		var current = $(this);
		var parent = current.closest('.tooltip__marquee');
		var itemImage = {
			url: current.attr('data-image'),
			url2x: current.attr('data-image2x'),
			w: current.attr('data-image-w'),
			h: current.attr('data-image-h')
		};

		var itemCard = createItemCard(itemImage);

		parent.marquee('pause');
		current.append(itemCard);
		var card = current.find('.tooltip__card');

		current.on('mousemove', function(evt) {
			var x = evt.pageX - current.offset().left;
			var y = evt.pageY - current.offset().top;
			card.css({'left': x + 'px', 'top': y + 'px'});
		});

		current.on('mouseout', function() {
			parent.marquee('resume');
			card.remove();
		});
	}

	function createItemCard(imageData) {
		if (imageData.url) {
			var card = $('<div class="tooltip__card"></a>');
			var format = imageData.url.slice(imageData.url.lastIndexOf('.'));

			var path = {
				'1x': imageData.url.slice(0, -format.length),
				'2x': imageData.url2x ? imageData.url2x.slice(0, -format.length) : imageData.url.slice(0, -format.length)
			};

			var image = $('<picture><source type="image/webp" srcset="' + path['1x'] + '.webp 1x, ' + path['2x'] + '.webp 2x"><img src="' + path['1x'] + format + '" srcset="' + path['2x'] + format + ' 2x" width="' + imageData.w + '" height="' + imageData.h + '" alt=""></picture>');

			card.append(image);
			card.css({'position': 'absolute'})

			return card;
		}
	}
})();

/* 8. Masonry */
(function() {
	$(window).on('load', function(){
		var filterItem = $('.filter__item');
		var filterItemAll = $('.filter__item[data-filter="*"]');
		var filterActiveClass = 'filter__item--active';

		var grid = $('.__js_blog-grid, .__js_portfolio-section-masonry').isotope({
			itemSelector: '.__js_masonry-item',
			layoutMode: 'packery',
			packery: {
				gutter: 0
			},
		});

		grid.on( 'layoutComplete', function() {
			console.log('done!')
		} );

		/*var portfolioGrid = $('.__js_portfolio-section-masonry').isotope({
			itemSelector: '.__js_masonry-item',
			layoutMode: 'packery',
			packery: {
				gutter: 0
			}
		});*/

		filterItem.on('click', function() {
			var filterValue = $(this).attr('data-filter');

			$(this).addClass(filterActiveClass).siblings().removeClass(filterActiveClass);
			grid.isotope({ filter: filterValue });
		});
	});
})();

/* 9. Pagepiling */
(function(){
	var headerClasses = $('.header').attr('class');


	initFullPage();

	if ($('#pagepiling .section.active').hasClass('dark')) {
		setDark();
	}

	function initFullPage() {
		if ($('#pagepiling') && $('#pagepiling').length > 0) {
			$('#pagepiling').pagepiling({
				scrollingSpeed: 280,
				loopBottom: true,
				navigation: false,
				afterRender: function () {
					$('.parallax-projects__nav span').height($('.parallax-projects__nav').height() / $('#pagepiling .section').length);
				},
				afterLoad: function (anchorLink, index) {
					var current = $('#pagepiling .section.active');

					if (current.hasClass('dark')) {
						setDark();
					} else {
						removeDark();
					}

					$('.fp-table.active .aos-init').addClass('aos-animate');

					$('.parallax-projects__nav span').height($('.parallax-projects__nav').height() / $('#pagepiling .section').length * index);
				}
			});
		}
	}

	function setDark() {
		$('.webpage').addClass('webpage--parallax-dark');
		$('.header').removeClass('header--white');
	}

	function removeDark() {
		$('.webpage').removeClass('webpage--parallax-dark');
		$('.header').addClass(headerClasses);
	}
})();

/* 10. Animation of skills */
(function() {
	$(window).on('load', function() {
		var skills = $('.skills');
		var skill = $('.skill');
		var numbers = $('.skill .__js_number');
		var animationIsDone = false;
		var scroll = $(window).scrollTop() + $(window).height();

		var duration = 1800;

		if ($('*').is('.skills')) {
			var offset = skills.offset().top;

			if (!animationIsDone && scroll >= offset) {
				animateNumbers();
				animateProgress();
			}

			$(window).on('scroll', function() {
				scroll = $(window).scrollTop() + $(window).height();

				if (!animationIsDone && scroll >= offset) {
					animateNumbers();
					animateProgress();
				}
			});
		}

		function animateNumbers() {
			numbers.each(function() {
				var endValue = parseInt($(this).parent().parent().parent().attr('data-percent'), 10);

				$(this).easy_number_animate({
					start_value: 0,
					end_value: endValue,
					duration: 1800
				});

			});

			animationIsDone = true;
		}

		function animateProgress() {
			skill.each(function() {
				var current = $(this);
				var progress = current.find('.skill__progress');
				var percent = parseInt(current.attr('data-percent'), 10);
				//var interval = duration / percent;

				var count = 1;

				/*var idInterval = setInterval(function() {
					progress.attr('style', 'transform: scale(' + (count / 100) + ', 1)')
					count++;

					if (count === percent) {
						clearInterval(idInterval);
					}
				}, interval);*/



				progress.attr('style', 'transform: scale(' + (percent / 100) + ', 1)')
			});
		}
	});
})();

/* 11. Init simple parallax */
(function () {
	var images = document.querySelectorAll('.__js_parallax-image');

	if (images) {
		for (var image of images) {
			new simpleParallax(image, {
				delay: 0,
				orientation: 'down',
				scale: 1.5,
			});
		}
	}


})();