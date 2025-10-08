const swiper = new Swiper('.swiper', {
    slidesPerView: '6',
    centeredSlides: true,
    spaceBetween: 50,
    loop: true,
    autoplay: true,
    navigation: {
        nextEl: '.swiper-controls-prev',
        prevEl: '.swiper-controls-next',
    },
});

// Скрпит Fancybox
document.addEventListener("DOMContentLoaded", function() {
	Fancybox.bind("[data-fancybox]", {
		infinite: false,
		dragToClose: false,
		on: {
			ready: function(fancybox) {
				console.log("Fancybox is ready", fancybox);
			}
		}
	});
});