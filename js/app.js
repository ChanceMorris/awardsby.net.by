// Скрипт для скрытия прелоадера
window.addEventListener('load', function() {
	var preloader = document.getElementById('preloader');
	preloader.style.opacity = '0';
	setTimeout(() => {
		preloader.style.display = 'none';
	}, 500); // Задержка для плавного исчезновения
});
// Скрипт Menu
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const menuWrap = document.querySelector('#burger');
    
    // Функция для закрытия меню
    function closeMenu() {
        burger.classList.remove('open');
        menuWrap.classList.remove('open');
        document.documentElement.style.removeProperty('--fancybox-scrollbar-compensate');
        document.body.classList.remove('hidden-scrollbar');
    }
    
    // Обработчик клика по бургеру
    burger.addEventListener('click', function() {
        if(this.classList.contains('open')) {
            closeMenu();
        } else {
            this.classList.add('open');
            menuWrap.classList.add('open');
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty('--fancybox-scrollbar-compensate', scrollBarWidth + 'px');
            document.body.classList.add('hidden-scrollbar');
        }
    });
    
    // Обработчик клика по якорным ссылкам внутри меню
    const menuLinks = menuWrap.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Проверяем, что это именно якорная ссылка (не пустая и не #)
            if(this.getAttribute('href') !== '#' && this.getAttribute('href') !== '') {
                // Закрываем меню после небольшой задержки для плавности
                setTimeout(closeMenu, 300);
            }
        });
    });
});
// Скрипт Swiper
const swiper = new Swiper('.swiper', {
	slidesPerView: 'auto',
	loop: true,
	navigation: {
		nextEl: '.swiper-controls-prev',
		prevEl: '.swiper-controls-next',
	},
});
// Скрпит Fancybox
document.addEventListener("DOMContentLoaded", function() {
	Fancybox.bind("[data-fancybox]", {
		// Здесь можно добавить дополнительные опции
		infinite: false,
		dragToClose: false,
		on: {
			ready: function(fancybox) {
				console.log("Fancybox is ready", fancybox);
			}
		}
	});
});
// Скрипт для блока FAQ
document.addEventListener("DOMContentLoaded", function() {
	// Получаем все элементы FAQ
	var faqItems = document.querySelectorAll(".faq_item");
	faqItems.forEach(function(item) {
		// Добавляем обработчик клика на каждый элемент
		item.addEventListener("click", function() {
			// Проверяем, был ли этот элемент уже раскрыт
			if(item.classList.contains("open")) {
				// Если да, то скрываем его содержимое и убираем класс 'open'
				item.classList.remove("open");
				item.querySelector(".faq_answer").style.display = "none";
			} else {
				// Если нет, то сначала закрываем все другие
				faqItems.forEach(function(otherItem) {
					otherItem.classList.remove("open");
					otherItem.querySelector(".faq_answer").style.display = "none";
					otherItem.querySelector(".faq_answer").style.marginTop = "0px";
				});
				// Раскрываем выбранный элемент, добавляем класс 'open'
				item.classList.add("open");
				item.querySelector(".faq_answer").style.display = "block";
				item.querySelector(".faq_answer").style.marginTop = "16px";
			}
		});
	});
});
// Функция Cockies
function setCookie(name, value, days) {
	const date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// Функция для получения значения куки
function getCookie(name) {
	const nameEQ = name + "=";
	const cookies = document.cookie.split(';');
	for(let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		while(cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1);
		}
		if(cookie.indexOf(nameEQ) === 0) {
			return cookie.substring(nameEQ.length, cookie.length);
		}
	}
	return null;
}
document.addEventListener('DOMContentLoaded', function() {
	// Проверка, был ли уже принят блок с куками
	if(getCookie('cookiesAccepted') !== 'true') {
		setTimeout(function() {
			document.querySelector('.cockies').classList.add('open');
		}, 1000);
	}
	document.querySelector('.cockies .btn').addEventListener('click', function() {
		document.querySelector('.cockies').classList.remove('open');
		setCookie('cookiesAccepted', 'true', 365); // Запись в куки на 365 дней
	});
});