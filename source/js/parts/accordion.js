(function(){
	var btn = $('.accordion__item-header');
	var content = $('.accordion__item-body');
	var modifierClass = 'accordion__item-header--opened';

	btn.on('click', function() {
		$(this).toggleClass(modifierClass).next().slideToggle(DURATION);
	});
})();
