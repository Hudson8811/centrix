(function() {
	var carouselSelectors = ['.__js_carousel-latest-news', '.__js_carousel-latest-projects'];

	var carousel = new Swiper('.__js_carousel', {
		slidesPerView: 'auto',
		spaceBetween: 60,
		loop: true,
		navigation: {
			nextEl: '.carousel__btn--next',
			prevEl: '.carousel__btn--prev',
		},
	});

	carouselSelectors.forEach(function(selector) {
		new Swiper(selector, {
			slidesPerView: 'auto',
			spaceBetween: 60,
			loop: true,
			navigation: {
				nextEl: '.nav-btn--next[data-target="' + selector + '"]',
				prevEl: '.nav-btn--prev[data-target="' + selector + '"]',
			},
		});
	});
})();
