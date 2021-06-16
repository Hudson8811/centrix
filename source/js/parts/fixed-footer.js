(function() {

	$(window).on('load', function() {
		var footer = $('.__js_fixed-footer');
		var footerHeight = footer.innerHeight();

		if(footer.length !== 0 && $(window).width() >= mobileBreakpoint) {
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
