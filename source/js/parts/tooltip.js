(function() {
	var windowWidth = $(window).width();

	var marqueeSpeed = windowWidth < mobileBreakpoint ? 10000 : 25000;

	$('.__js-marquee').bind('beforeStarting', function() {
			var item = $('.tooltip__item');
			item.on('mouseover', onMarqueeItemHover);
	}).marquee({
		 //speed in milliseconds of the marquee
    duration: marqueeSpeed,
    //gap in pixels between the tickers
    gap: 0,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,
		startVisible: true
	});

	$('.__js-marquee--reverse').bind('beforeStarting', function() {
			var item = $('.tooltip__item');
			item.on('mouseover', onMarqueeItemHover);
	}).marquee({
		 //speed in milliseconds of the marquee
    duration: marqueeSpeed,
    //gap in pixels between the tickers
    gap: 0,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'right',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,
		startVisible: true
	});



	function onMarqueeItemHover() {
		var current = $(this);
		var parent = current.closest('.tooltip__marquee');
		var imageData = {
			url: current.attr('data-image'),
			url2x: current.attr('data-image2x'),
			w: current.attr('data-image-w'),
			h: current.attr('data-image-h'),
			isWebp: current.attr('data-webp')
		};

		var itemCard = createItemCard(imageData);

		parent.marquee('pause');
		current.append(itemCard);
		var card = current.find('.tooltip__card');

		current.on('mousemove', function(evt) {
			var x = evt.pageX - current.offset().left;
			var y = evt.pageY - current.offset().top;
			card.css({'left': x + 'px', 'top': y + 'px'});
		});

		current.on('mouseout', function() {
			parent.marquee('resume');
			card.remove();
		});
	}

	function createItemCard(imageData) {
		if (imageData.url) {
			var card = $('<div class="tooltip__card"></a>');
			var format = imageData.url.slice(imageData.url.lastIndexOf('.'));

			var path = {
				'1x': imageData.url.slice(0, -format.length),
				'2x': imageData.url2x ? imageData.url2x.slice(0, -format.length) : imageData.url.slice(0, -format.length)
			};

			if (imageData.isWebp) {

				var image = $('<picture><source type="image/webp" srcset="' + path['1x'] + '.webp 1x, ' + path['2x'] + '.webp 2x"><img src="' + path['1x'] + format + '" srcset="' + path['2x'] + format + ' 2x" width="' + imageData.w + '" height="' + imageData.h + '" alt=""></picture>');

			} else {

				var image = $('<img src="' + path['1x'] + format + '" srcset="' + path['2x'] + format + ' 2x" width="' + imageData.w + '" height="' + imageData.h + '" alt="">');

			}

			card.append(image);
			card.css({'position': 'absolute'})

			return card;
		}
	}
})();
