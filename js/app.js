const form = document.querySelector('#form');
const userName = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

const removeParentClassesAndAddAnother = (
	element,
	removeClasses = [],
	addClass = ''
) => {
	const parent = element.parentElement;

	parent.classList.remove(...removeClasses);
	parent.classList.add(addClass);
};

const showError = (input, message) => {
	const formControl = input.parentElement;
	removeParentClassesAndAddAnother(input, ['success', 'error'], 'error');
	const small = formControl.querySelector('small');
	if (small) {
		small.textContent = message;
	}
};

const showSuccess = (input) => {
	removeParentClassesAndAddAnother(input, ['success', 'error'], 'success');
};

const isValidEmail = (email) => {
	const regex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
};

const checkRequired = (inputArr) => {
	inputArr.forEach((input) => {
		if (input.value.trim() === '') {
			showError(input, `${input.id} is required`);
		} else {
			showSuccess(input);
		}
	});
};

form.addEventListener('submit', (event) => {
	event.preventDefault();

	checkRequired([userName, email, password, confirmPassword]);
});
