(function() {
	var container = $('.projects-listing__container');

	if (container.length !== 0) {
		var aside = $('.projects-listing__aside');
		var title = $('.projects-listing__title');
		var category = $('.projects-listing__category');
		var btn = $('.projects-listing__more');
		var cards = $('.project-card');
		var isFixed = false;

		var currentCard = cards[0];
		var hideClass = 'd-none';
		var containerParams = {
			TOP: container.offset().top,
			LEFT: container.offset().left,
			HEIGHT: container.height(),
			WIDTH: container.width(),
			BOTTOM: container.offset().top + container.height(),
			LEFT_PADDING: parseInt(container.css('padding-left'), 10)
		};

		var maxTop =  $(window).width() >= 768 ? $(cards[cards.length - 1]).offset().top - containerParams.TOP : containerParams.BOTTOM - aside.outerHeight();

		function changeProjectMeta() {
			title.html(currentCard.attr('data-title'));
			btn.attr('href', currentCard.attr('data-url'));

			if (currentCard.attr('data-category')) {
				category.removeClass(hideClass).text(currentCard.attr('data-category'));
			} else {
				category.addClass(hideClass).text('');
			}
		}

		function changeCurrentCard(index, item) {
			if (aside.offset().top >= item.offset().top) {
				currentCard = item;
				changeProjectMeta();
			}
		}

		$(window).on('scroll', function() {
			var scroll = $(window).scrollTop();
			isFixed = scroll > containerParams.TOP && scroll <= maxTop;

			if ($(window).width() >= 768){
				if (isFixed) {
					aside.css({'position': 'fixed', 'left': (containerParams.LEFT + containerParams.LEFT_PADDING) + 'px', 'top': '0', 'transform': 'translateY(' + containerParams.TOP + 'px)'});

				}	else {
					var top = scroll >= maxTop ? maxTop  : 0;
					var y = scroll >= maxTop ? containerParams.TOP + 'px' : 0;
					aside.css({'position': 'absolute', 'left': containerParams.LEFT_PADDING + 'px', 'top':  top + 'px', 'transform': 'translateY(' + y + ')'});
				}
			} else {
				var targetScroll = scroll + $(window).height() - aside.outerHeight();
				if (targetScroll >= maxTop) {
					var top = targetScroll >= maxTop ? maxTop - containerParams.TOP + 'px' : 0;
					aside.css({'position': 'absolute', 'top': top, 'bottom': 'auto', 'right': ''})
				} else {
					aside.removeAttr('style');
				}
			}

			cards.each(function(index){
				var i = index;
				changeCurrentCard(i, $(this));
			});
		});

		$(window).on('resize', function() {
			var scroll = $(window).scrollTop();
			containerParams = {
				TOP: container.offset().top,
				LEFT: container.offset().left,
				HEIGHT: container.height(),
				WIDTH: container.width(),
				BOTTOM: container.offset().top + container.height(),
				LEFT_PADDING: parseInt(container.css('padding-left'), 10)
			};

			maxTop = $(window).width() >= 768 ? $(cards[cards.length - 1]).offset().top - containerParams.TOP : containerParams.BOTTOM - aside.outerHeight();
			isFixed = scroll > containerParams.TOP && scroll <= maxTop;

			aside.removeAttr('style');
		});
	}
})();
