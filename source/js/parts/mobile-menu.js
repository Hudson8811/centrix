(function() {
	var menuOpenBtn = $('.menu-toggle');
	var menuCloseBtn = $('.mobile-canvas__close');
	var menu = $('.mobile-canvas');
	var headerContainer = $('.header__container');
	var animsition = $('.animsition');
	var isHandled = false;
	var menuIsOpened = false;
	var isLeftwardHeader = $('.header').is('.header--leftward');

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

	if (menuCloseBtn.length > 0) {
		menuCloseBtn.on('click', closeMenu);
	}


	if ($(window).width() < mobileBreakpoint && !isHandled || isLeftwardHeader) {
		mobileDropdownLinks.on('click', openMobileDropdown);
		isHandled = true;
	}

	$(window).on('resize', function() {

		if ($(window).width() < mobileBreakpoint && !isHandled || isLeftwardHeader) {
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
