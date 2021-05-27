(function() {
	var carousel = new Swiper('.__js_carousel', {
		slidesPerView: 'auto',
		spaceBetween: 60,
		loop: true,
		//centeredSlides: true,
		navigation: {
			nextEl: '.carousel__btn--next',
			prevEl: '.carousel__btn--prev',
		},
	});
})();
