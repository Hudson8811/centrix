(function() {
	var header = $('.__js_fixed-header');
	var ModifierClass = {
		FIXED: 'header--fixed',
		IS_FIXED: 'is-fixed',
		ABSOLUTE: 'header--absolute',
		WHITE: 'header--white',
		BG_WHITE: 'header--bg-white'
	};

	if (header.length) {
		var headerOffset = header.offset().top;
		var headerHeight = header.outerHeight();
	}

	var headerClasses = header.hasClass(ModifierClass.BG_WHITE) || header.hasClass(ModifierClass.WHITE) ? ModifierClass.FIXED : ModifierClass.WHITE + ' ' + ModifierClass.FIXED;

	//console.log(headerClasses);

	var isStaticHeader = !header.hasClass(ModifierClass.ABSOLUTE);

	var scroll = $(window).scrollTop();
	var isScroll = false;


	//var isNotStatic = header.hasClass('header--half') && $(window).width() >= mobileBreakpoint ? true : false;


	$(window).on('scroll', function() {
		scroll = $(window).scrollTop();

		if (scroll >= headerOffset + headerHeight) {
			isScroll = true;



			header.addClass(headerClasses);

			headerHeight = isScroll ? header.outerHeight() : null;


			if (!header.hasClass(ModifierClass.IS_FIXED)) {
				header.css({'top': -headerHeight + 'px', 'transform': ' translateY(' + headerHeight + 'px)'}).addClass(ModifierClass.IS_FIXED);

				if (isStaticHeader) {
					body.css('padding-top', headerHeight + 'px');
				}
			}
		} else {
			isScroll = false;
			header.removeClass(headerClasses + ' ' + ModifierClass.IS_FIXED).removeAttr('style');

			if (isStaticHeader) {
				body.css('padding-top', 0);
			}
		}
	});

	$(window).on('resize', function() {
		headerHeight = header.outerHeight();
		//isNotStatic = header.hasClass('header--half') && $(window).width() >= mobileBreakpoint ? true : false;

		if (scroll >= headerOffset + headerHeight && isScroll) {
			header.css({'top': -headerHeight + 'px', 'transform': 'translateY(' + headerHeight + 'px)'});
			//body.css('padding-top', headerHeight + 'px');

			/*if (!isNotStatic) {
				body.css('padding-top', headerHeight + 'px');
			}*/
		}
	});

})();
