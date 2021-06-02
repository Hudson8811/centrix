(function() {
	$(window).on('load', function() {
		var skills = $('.skills');
		var skill = $('.skill');
		var numbers = $('.skill .__js_number');
		var animationIsDone = false;
		var scroll = $(window).scrollTop() + $(window).height();

		var duration = 1800;

		if ($('*').is('.skills')) {
			var offset = skills.offset().top;

			if (!animationIsDone && scroll >= offset) {
				animateNumbers();
				animateProgress();
			}

			$(window).on('scroll', function() {
				scroll = $(window).scrollTop() + $(window).height();

				if (!animationIsDone && scroll >= offset) {
					animateNumbers();
					animateProgress();
				}
			});
		}

		function animateNumbers() {
			numbers.each(function() {
				var endValue = parseInt($(this).parent().parent().parent().attr('data-percent'), 10);

				$(this).easy_number_animate({
					start_value: 0,
					end_value: endValue,
					duration: 1800
				});

			});

			animationIsDone = true;
		}

		function animateProgress() {
			skill.each(function() {
				var current = $(this);
				var progress = current.find('.skill__progress');
				var percent = parseInt(current.attr('data-percent'), 10);
				//var interval = duration / percent;

				var count = 1;

				/*var idInterval = setInterval(function() {
					progress.attr('style', 'transform: scale(' + (count / 100) + ', 1)')
					count++;

					if (count === percent) {
						clearInterval(idInterval);
					}
				}, interval);*/



				progress.attr('style', 'transform: scale(' + (percent / 100) + ', 1)')
			});
		}
	});
})();
