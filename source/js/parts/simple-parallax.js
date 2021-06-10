(function () {
	var images = document.querySelectorAll('.__js_parallax-image');

	if (images) {
		for (var image of images) {
			new simpleParallax(image, {
				delay: 0,
				orientation: 'down',
				scale: 1.5,
			});
		}
	}


})();
