(function(){
	var logo = $('.vertical-logo');

	if (logo.length !== 0) {
		var logoLayer = logo.find('.vertical-logo__layer--yellow');
		var logoHeight = logo.outerHeight();
		var logoOffset = logo.offset().top;
		var shift = $('.header').outerHeight() * 2;
		var distance = (logoHeight + logoOffset ) - shift;

		function changeOpacity(scroll) {
			var percent = scroll * 100 / distance;
			logoLayer.css('opacity', percent / 100);

			let opacity = logoLayer.css('opacity');

			if (scroll >= distance && opacity < 1) {
				logoLayer.css('opacity', '1');
			}
		}

		$(window).on('scroll', function() {
			var scroll = $(window).scrollTop();
			changeOpacity(scroll);
		});

		$(window).on('resize', function() {
			var scroll = $(window).scrollTop();

			logoHeight = logo.outerHeight();
			logoOffset = logo.offset().top;
			shift = $('.header').outerHeight() * 2;
			distance = (logoHeight + logoOffset ) - shift;

			changeOpacity(scroll);
		});
	}

})();
