// Скрипт обработки форм обратной связи
document.querySelectorAll('form').forEach(form => {
	form.addEventListener('submit', function(event) {
		event.preventDefault(); // предотвратить стандартную отправку формы
		var formData = new FormData(this);
		var modalConsulting = document.getElementById('consulting');
		var formContainer = this.closest('.modal') || this; // Определяет, находится ли форма в модалке или на странице
		fetch('files/sendmail.php', { // измените URL на актуальный путь к вашему PHP скрипту
			method: 'POST',
			body: formData
		}).then(response => response.text()).then(data => {
			var countdown = 5; // 5 секунд
			var timerElement = document.getElementById('thanks_timer');
			if(modalConsulting && formContainer.id === 'consulting') {
				Fancybox.close(true); // Закрыть все открытые модальные окна
				Fancybox.show([{
					src: '#thanks',
					type: 'inline'
				}]);
			} else {
				Fancybox.show([{
					src: '#thanks',
					type: 'inline'
				}]);
			}
			// Обновить таймер в элементе thanks_timer
			if(timerElement) {
				timerElement.innerText = countdown;
				var timerInterval = setInterval(() => {
					countdown--;
					timerElement.innerText = countdown;
				}, 1000);
			}
			// Закрыть модальное окно и очистить форму через 5 секунд
			setTimeout(() => {
				Fancybox.close(true);
				clearInterval(timerInterval);
				form.reset();
			}, 5000);
		}).catch(error => console.error('Error:', error));
	});
});