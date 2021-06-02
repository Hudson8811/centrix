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

	var latestProjects = new Swiper('.__js_carousel-latest-projects', {
		slidesPerView: 'auto',
		spaceBetween: 60,
		loop: true,
		//centeredSlides: true,
		/*navigation: {
			nextEl: '.carousel__btn--next',
			prevEl: '.carousel__btn--prev',
		},*/
	});

	/*var carousels = {
		'latest-projects': latestProjects
	}*/

	var navBtn = $('.__js_navbtn-latest-projects');

	navBtn.on('click', function() {
		var direction = $(this).attr('data-dir');

		direction === 'prev' ? latestProjects.slidePrev() : latestProjects.slideNext();;
	})
})();
