(function(){
	anchorScroll($('.anchor'));

	function anchorScroll(e) {
		e.click(function () {
			var link = $(this).attr('href'),
					to = $(link).offset().top;
			$('body, html').animate({
				scrollTop: to
			}, 800);
		});
	}
})();
