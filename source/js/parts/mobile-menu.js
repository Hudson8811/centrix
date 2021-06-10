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
