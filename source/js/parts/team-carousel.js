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
