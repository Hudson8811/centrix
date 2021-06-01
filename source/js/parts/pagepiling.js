(function(){
	initFullPage();

	if ($('#pagepiling .section.active').hasClass('dark')) {
		setDark();
	}

	function initFullPage() {
		if ($('#pagepiling') && $('#pagepiling').length > 0) {
			$('#pagepiling').pagepiling({
				scrollingSpeed: 280,
				loopBottom: true,
				navigation: false,
				afterRender: function () {
					$('.parallax-projects__nav span').height($('.parallax-projects__nav').height() / $('#pagepiling .section').length);
				},
				afterLoad: function (anchorLink, index) {
					var current = $('#pagepiling .section.active');

					if (current.hasClass('dark')) {
						setDark();
					} else {
						removeDark();
					}

					$('.fp-table.active .aos-init').addClass('aos-animate');

					$('.parallax-projects__nav span').height($('.parallax-projects__nav').height() / $('#pagepiling .section').length * index);
				}
			});
		}
	}

	function setDark() {
		$('.webpage').addClass('webpage--parallax-dark');
	}

	function removeDark() {
		$('.webpage').removeClass('webpage--parallax-dark');
	}
})();
