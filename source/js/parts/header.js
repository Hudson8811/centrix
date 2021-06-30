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
	if (header.length !== 0) {
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

			if (isLeftwardHeader && !isMobileWidth) {
				onScrollOne();
			}



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
					header.css({'position': 'absolute', 'top': 'auto', 'left': '0', 'bottom': '0'})
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
	}
})();
