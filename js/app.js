const form = document.querySelector('#form');
const userName = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

/**
 * Удаляет указанные классы у родительского элемента и добавляет новый класс.
 * @param {HTMLElement} element - Элемент, у которого будет изменён родительский элемент.
 * @param {string[]} removeClasses - Массив классов для удаления (по умолчанию пустой).
 * @param {string} addClass - Класс для добавления (по умолчанию пустая строка).
 */
const removeParentClassesAndAddAnother = (
	element,
	removeClasses = [],
	addClass = ''
) => {
	const parent = element.parentElement;
	parent.classList.remove(...removeClasses);
	parent.classList.add(addClass);
};

/**
 * Показывает сообщение об ошибке для поля ввода.
 * @param {HTMLInputElement} input - Поле ввода, для которого показывается ошибка.
 * @param {string} message - Текст сообщения об ошибке.
 */
const showError = (input, message) => {
	const formControl = input.parentElement;
	removeParentClassesAndAddAnother(input, ['success', 'error'], 'error');
	const small = formControl.querySelector('small');
	if (small) {
		small.textContent = message;
	}
};

/**
 * Показывает успешное состояние для поля ввода.
 * @param {HTMLInputElement} input - Поле ввода, для которого показывается успешное состояние.
 */
const showSuccess = (input) => {
	removeParentClassesAndAddAnother(input, ['success', 'error'], 'success');
};

/**
 * Проверяет, является ли email допустимым.
 * @param {string} email - Строка для проверки.
 * @returns {boolean} - True, если email валиден, иначе false.
 */
const isValidEmail = (email) => {
	const regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
};

/**
 * Проверяет, заполнены ли все обязательные поля.
 * @param {HTMLInputElement[]} inputArr - Массив полей ввода для проверки.
 */
const checkRequired = (inputArr) => {
	inputArr.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, `${input.id} is required`);
		} else {
			showSuccess(input);
		}
	});
};
/**
 * Обработчик события  submit формы.
 * @param {Event} event - Событие submit.
 */
const handleFormSubmit = (event) => {
	event.preventDefault();

	checkRequired([userName, email, password, confirmPassword]);
};

form.addEventListener('submit', handleFormSubmit);
