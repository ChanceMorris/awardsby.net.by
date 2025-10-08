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
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 30,
            centeredSlides: true
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 3,
            spaceBetween: 40,
            centeredSlides: true
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 4,
            spaceBetween: 50,
            centeredSlides: true
        },
        // when window width is >= 1200px
        1200: {
            slidesPerView: 5,
            spaceBetween: 50,
            centeredSlides: true
        },
        // when window width is >= 1440px
        1440: {
            slidesPerView: 6,
            spaceBetween: 50,
            centeredSlides: true
        }
    }
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

// ===== Поиск компаний с подсказками, JSON и GSAP-анимацией =====
document.addEventListener("DOMContentLoaded", () => {
  const searchSection = document.querySelector(".participants_search");
  const suggestionsBox = document.querySelector(".participants_suggestions .suggestions");
  const resultBox = document.querySelector(".participants_result .search-result");

  const input = searchSection.querySelector('input[type="search"]');
  const button = searchSection.querySelector("button");

  let companies = [];
  let selectedCompany = null; // Добавляем переменную для хранения выбранной компании

  // === Загружаем список компаний из JSON ===
  fetch("data/participants.json")
    .then((res) => res.json())
    .then((data) => (companies = data))
    .catch(() => {
      showResult("error", "⚠️ Не удалось загрузить список участников");
    });

  // === Подсветка совпадений ===
  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  // === Автодополнение ===
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    suggestionsBox.innerHTML = "";
    suggestionsBox.hidden = true;
    selectedCompany = null; // Сбрасываем выбранную компанию при новом вводе
    if (!query) return;

    const matches = companies.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.url.toLowerCase().includes(query)
    );

    if (matches.length === 0) return;

    matches.slice(0, 5).forEach((c) => {
      const item = document.createElement("div");
      item.classList.add("suggestion-item");
      item.innerHTML = `
        <div class="suggestion-name">${highlightMatch(c.name, query)}</div>
        <div class="suggestion-url">${highlightMatch(c.url, query)}</div>
      `;
      item.addEventListener("click", () => {
        input.value = c.name;
        selectedCompany = c; // Сохраняем выбранную компанию
        suggestionsBox.hidden = true;
      });
      suggestionsBox.appendChild(item);
    });

    suggestionsBox.hidden = false;

    if (window.gsap) {
      gsap.fromTo(
        ".suggestion-item",
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      );
    }
  });

  // === Проверка компании ===
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();
    suggestionsBox.hidden = true;

    if (!query) {
      showResult("warn", `
        <div class="search_warn">
            <p class="subtitle">Введите название или URL компании</p>
        </div>
      `);
      return;
    }

    // Если компания была выбрана из подсказок - проверяем её
    if (selectedCompany) {
      showResult("success", `
        <div class="search_success">
            <h2>Вы участвуете!</h2>
            <p class="subtitle">Узнать результаты можно на предстоящем мероприятии</p>
            <button class="button-style-1">ПОСЕТИТЬ МЕРОПРИЯТИЕ</button>
        </div>
      `);
      return;
    }

    // Если не выбрана из подсказок - ищем точное совпадение
    const found = companies.find(
      (c) =>
        c.name.toLowerCase() === query || // Точное совпадение по имени
        c.url.toLowerCase() === query.replace(/^https?:\/\//, "") // Точное совпадение по URL
    );

    if (found) {
      showResult("success", `
        <div class="search_success">
            <h2>Вы участвуете!</h2>
            <p class="subtitle">Узнать результаты можно на предстоящем мероприятии</p>
            <button class="button-style-1">ПОСЕТИТЬ МЕРОПРИЯТИЕ</button>
        </div>
      `);
    } else {
      showResult("error", `
        <div class="search_error">
            <h2>Мы не нашли вас</h2>
            <p class="subtitle">Примите участие!</p>
            <button class="button-style-1" data-fancybox data-src="#consulting">ПРИНЯТЬ УЧАСТИЕ</button>
        </div>
      `);
    }
  });

  // === Функция отображения результата ===
  function showResult(type, message) {
    resultBox.hidden = false;
    resultBox.innerHTML = message; // Убрал обертку в <p>, так как передаем готовый HTML

    if (window.gsap) {
      gsap.fromTo(
        resultBox,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }

  // === Закрываем подсказки при клике вне ===
  document.addEventListener("click", (e) => {
    if (!searchSection.contains(e.target)) suggestionsBox.hidden = true;
  });
});