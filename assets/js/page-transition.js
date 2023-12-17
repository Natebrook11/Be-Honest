// Animation (Don't touch)
function delay(n) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(() => {
			done();
		}, n);
	});
}


// Animation - Loading page First Time
function loadAnimation() {
	var tl = gsap.timeline();

	tl.set(".tricksword", {
		yPercent: 125
	});

	tl.set(".loading-svg", {
		yPercent: 125,
		xPercent: -125,
		opacity: "0"
	});

	tl.set(".animate-fade-in", {
		y: 100,
		opacity: 0
	});

	tl.set("#gdpr-box", {
		y: 100,
		opacity: 0
	});

	tl.to(".loading-svg", {
		duration: 1,
		ease: "Expo.easeOut",
		opacity: "1",
		yPercent: 0,
		xPercent: 0,
		delay: .5
	});

	tl.to(".loading-svg", {
		duration: 1.5,
		ease: "Expo.easeOut",
		opacity: "0",
		yPercent: -125,
		xPercent: 125
	});

	tl.to(".loading-screen", {
		duration: .5,
		ease: "Power0.easeNone",
		opacity: "0"
	}, "-=1.5");

	tl.to(".tricksword", {
		ease: "Expo.easeOut",
		duration: 1,
		yPercent: 0,
		stagger: .05
	}, "-=1.2");

	tl.to(".animate-fade-in", {
		ease: "Expo.easeOut",
		duration: 1.25,
		y: 0,
		opacity: 1,
		stagger: .05,
		delay: 0
	}, "-=1");

	tl.set(".loading-screen", {
		opacity: 0
	});

	tl.to("#gdpr-box", {
		ease: "Expo.easeOut",
		duration: 1.25,
		y: 0,
		opacity: 1,
		delay: 0
	}, "-=1");
}

// Animation - Transition
function pageTransition() {
	var tl = gsap.timeline();

	tl.to(".main-fade", {
		duration: .4,
		ease: "Power0.easeNone",
		opacity: "0"
	});

	tl.set(".main-fade", {
		y: 0,
		opacity: "1"
	});

	tl.set(".loading-screen", {
		opacity: 0
	});

}


// Animation - Loading page
function contentAnimation() {
	var tl = gsap.timeline();

	tl.set(".loading-screen", {
		opacity: 0
	});

	tl.set(".main-fade", {
		opacity: 0
	});

	tl.set(".tricksword", {
		yPercent: 125
	});

	tl.set(".animate-fade-in", {
		y: 100,
		opacity: 0
	});

	tl.to(".main-fade", {
		duration: 1.5,
		ease: "Power0.easeNone",
		opacity: "1",
		delay: "0"
	});

	tl.to(".tricksword", {
		ease: "Expo.easeOut",
		duration: 1,
		yPercent: 0,
		stagger: .05
	}, "-=1.25");

	tl.to(".animate-fade-in", {
		ease: "Expo.easeOut",
		duration: 1.25,
		y: 0,
		opacity: 1,
		stagger: .05,
		delay: 0
	}, "-=1");

}

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }

// Call animation 
$(function () {
	barba.init({

		sync: true,

		transitions: [
			{
				async once(data) {
					loadAnimation();
				},

				async enter(data) {
					contentAnimation();
				},

				async leave(data) {
					const done = this.async();

					pageTransition();
					await delay(350);
					$(window).scrollTop(0);

					done();
				},
			},
		],
	});
});
