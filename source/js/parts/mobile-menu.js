(function() {
	var menuOpenBtn = $('.menu-toggle');
	var menuCloseBtn = $('.mobile-canvas__close');
	var menu = $('.mobile-canvas');
	var header = $('.header');
	var menu2 = $('.header__menu');
	var headerContainer = $('.header__container');
	var mobileDropdownLinks = $('.navigation__link');

	var menuIsOpened = false;
	var isLeftwardHeader = $('.header').hasClass('header--leftward');

	var ModifierClass = {
		MOBILE_CANVAS: 'mobile-canvas--opened',
		MENU: 'header__menu--opened',
		TOGGLE: 'menu-toggle--opened',
		CURRENT_ITEM: 'navigation__item--current',
		ANIMSITION: 'animsition-link'
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

	mobileDropdownLinks.on('click', openMobile);

	$(window).on('resize', function() {
		var windowWidth = $(window).width();

		if (windowWidth >= mobileBreakpoint && !isLeftwardHeader) {
			closeMenu();
		} else if (isLeftwardHeader) {
			closeLeftwardHeader();
		}

		changeClassNavLink();
	});

	$('main').on('transitionend', removeStyleAttrOnMain);

	function changeClassNavLink() {
		var isMob = $(window).width() < mobileBreakpoint;

		mobileDropdownLinks.each(function() {
			var link = $(this);
			var hasNext = link.next().length !== 0;
			var isActiveParent = link.parent().hasClass(ModifierClass.CURRENT_ITEM);

			if ( ((isLeftwardHeader || isMob) && hasNext) || isActiveParent) {
				link.removeClass(ModifierClass.ANIMSITION);
			} else if (!isLeftwardHeader && !isMob && !isActiveParent) {
				link.addClass(ModifierClass.ANIMSITION);
			}
		});


	}

	function openMobile(evt) {
		var link = $(this);
		var dropdown = link.next();
		var width = $(window).width();

		if (width < mobileBreakpoint || isLeftwardHeader) {
			if (dropdown.length !== 0) {
				evt.preventDefault();
				var targetParent = link.parent();

				targetParent.siblings().find('.navigation__dropdown').slideUp();
				dropdown.slideToggle();
			}

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


		changeFixedElement(true);
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

	function changeFixedElement(isOpen) {
		var aside = $('.projects-listing__aside');

		if (aside.length !== 0) {
			var scroll = $(window).scrollTop();
			var parentOffsetTop = aside.parent().offset().top;
			var left = aside.parent().css('padding-left');
			var offsetTop = scroll > parentOffsetTop ? scroll - parentOffsetTop : scroll;

			if (isOpen) {
				aside.css({'position': 'absolute', 'left': left, 'top': offsetTop + 'px'})
			}
		}
	}

	function removeStyleAttrOnMain() {
		var style = $(this).attr('style');

		if (style === 'transform: translateX(0px);') {
			$(this).removeAttr('style');
		}
	}
})();
