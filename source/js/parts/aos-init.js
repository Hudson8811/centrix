(function() {
	$('window').on('animsition.inEnd', function(){});

	var isotopIsThere = $('*').is('.__js_portfolio-section-masonry') || $('*').is('.__js_blog-grid');


	/*$(window).on('load', function() {
		if (!isotopIsThere) {
			AOS.init({
				duration: 1000
			});
		} else {
			setTimeout(function() {
				AOS.init({
					duration: 1000
				});
				$(window).on('resize', function() {
					AOS.refresh();
				})
			}, 1500)
		}
	});*/
	AOS.init({
		duration: 1000
	});

})();
