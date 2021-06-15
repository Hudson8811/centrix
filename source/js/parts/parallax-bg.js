(function() {
	var items = $('.parallax-bg');

	if (items.length !== 0) {
		$(window).on('scroll', function() {
			var scroll = $(window).scrollTop();

			shiftImage(items, scroll)
		});
	 }

	 function shiftImage(items, scroll) {
		items.each(function() {
			var item = $(this);
			var offset = item.parent().offset().top;
			var height = item.outerHeight();
			var parentHeight = item.parent().outerHeight();
			var distance = height - parentHeight;
			var triggerHeight = parentHeight / 2;


			console.clear()
			console.log(offset, scroll);

				var isEqual = scroll >= offset;

				if (isEqual) {
					console.log('scroll > offset');

						var shiftPercent = (scroll - offset) / triggerHeight;
						var shift = distance * shiftPercent;

					if (shift < distance && height > parentHeight) {
						item.css({'transform': 'translateY(' + -shift + 'px)'})
					}
				}

		});




  }
})();
