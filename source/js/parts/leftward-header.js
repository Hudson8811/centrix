(function() {
	var header = $('.header--leftward');
	var parent = header.parent().parent();
	var windowWidth = $(window).width();

	$(window).on('animsition.inEnd', function(){
		var Height = {
			HEADER: header.outerHeight(),
			PARENT: parent.outerHeight()
		};

		changeStateHandler();

		$(window).on('resize', function() {
			windowWidth = $(window).width();

			Height.HEADER = header.outerHeight();
			Height.PARENT = parent.outerHeight();

			changeStateHandler();
		});


		function changeStateHandler() {
			if (windowWidth > mobileBreakpoint) {
				$(window).on('scroll', onWindowScroll);
			} else {
				$(window).off('scroll', onWindowScroll);
			}
		}

		function onWindowScroll() {
			var scroll = $(window).scrollTop();

			if(scroll > Height.PARENT - Height.HEADER) {
				header.css({'position': 'absolute', 'top': 'auto',  'bottom': '0'})
			} else {
				header.removeAttr('style');
			}
		};
	});



	/*var header = document.querySelector('.header--leftward');

	if (header) {
		var parent = header.closest('.leftward-wrapper');
		var Height = {
			HEADER: 0,
			PARENT: 0
		};

		$(window).on('animsition.inEnd', function(){
			console.log('done')
			Height.PARENT = parent.scrollHeight;
			Height.HEADER = header.scrollHeight;

			console.log(Height.PARENT);
			window.addEventListener('scroll', () => {
				var scroll = window.pageYOffset;

				if(scroll >= Height.PARENT - Height.HEADER) {
					header.style.position = 'absolute';
					header.style.top = 'auto';
					header.style.bottom = '0';
				} else {
					header.removeAttribute('style');
				}
			});
		});




	}*/
})();
