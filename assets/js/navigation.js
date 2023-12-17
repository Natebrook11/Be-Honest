// Barba Load Wrapper
barba.hooks.beforeEnter(() => {

	// Open/close navigation when clicked .nav-icon
	$(document).ready(function () {
		$('.nav-icon').click(function () {
			$('.nav-icon').toggleClass('active');
			$("nav").toggleClass('active');
			$("main").toggleClass('active');
		});
		$('.black-overlay').click(function () {
			$('.nav-icon').removeClass('active');
			$("nav").removeClass('active');
			$("main").removeClass('active');
		});

	});

});

// Barba Load Wrapper
barba.hooks.beforeEnter(() => {

	//Check to see if the window is top if not then display button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('main').addClass('scrolled');
		} else {
			$('main').removeClass('scrolled');
		}
	});


	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.logo').outerHeight();

	$(window).scroll(function (event) {
		didScroll = true;
	});

	setInterval(function () {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 0);

	function hasScrolled() {
		var st = $(this).scrollTop();

		// Make sure they scroll more than delta
		if (Math.abs(lastScrollTop - st) <= delta)
			return;

		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight) {
			// Scroll Down
			$('main').removeClass('nav-scroll-up').addClass('nav-scroll-down');
		} else {
			// Scroll Up
			if (st + $(window).height() < $(document).height()) {
				$('main').removeClass('nav-scroll-down').addClass('nav-scroll-up');
			}
		}

		lastScrollTop = st;
	}


});

// Barba Load Wrapper
barba.hooks.beforeEnter(() => {

	$(document).ready(function () {
		$('.ignite-desktop').on('mouseenter mouseleave', function () {
			$('.home-header-animation').toggleClass('active');
		});

		$('.ignite-mobile').click(function () {
			$('.home-header-animation').toggleClass('active');
		});

	});

});

// Barba Load Wrapper
barba.hooks.beforeEnter(() => {

	// Masonry grid
	$(document).ready(function () {
		$('.archive-grid').masonry({
			itemSelector: '.archive-grid-item',
			columnWidth: 0
		});

		$('.projects-projects-grid-ul').masonry({
			itemSelector: '.project-thumb',
			columnWidth: 0
		});
	});

});


// Barba Load Wrapper
barba.hooks.beforeEnter(() => {

	var img = $('.triangle');
	if (img.length > 0) {
		var offset = img.offset();
		function mouse(evt) {
			var center_x = (offset.left) + (img.width() / 2);
			var center_y = (offset.top) + (img.height() / 2);
			var mouse_x = evt.pageX; var mouse_y = evt.pageY;
			var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
			var degree = (radians * (180 / Math.PI) * -1) + 180;
			img.css('transform', 'translate(-50%, -37%) rotate(' + degree + 'deg)');
		}
	}

	$('.targets-animation-wrapper').on('mouseenter', function () {
		$(document).mousemove(mouse);
	});

	$('.targets-animation-wrapper').on('mouseleave', function () {
		$(document).unbind();
		img.css('transform', 'translate(-50%, -37%) rotate(0deg)');
	});

	$('.circle').on('mouseenter mouseleave', function () {
		$('.logo-onenil').toggleClass('active');
	});

});
