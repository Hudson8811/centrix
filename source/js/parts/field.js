(function() {
	var fields = $('.field input, .field textarea');
	var ModifierClass = 'field--filled';

	fields.on('focus', function() {
		$(this).parent().addClass(ModifierClass);
	});

	fields.on('blur', function() {
		if (!$(this).val()) {
			$(this).parent().removeClass(ModifierClass);
		}
	});
})();

