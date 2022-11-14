function editNav() {
	var x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const modalClose = document.querySelector('.close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
}

// close modal event
modalClose.addEventListener('click', closeModal);

// close modal form
function closeModal() {
	modalbg.style.display = 'none';
}

/*__________FORM VALIDATION___________*/

// Sélection des éléments dans le DOM :
const form = document.querySelector('#form');

// On récupère les "input" du formulaire grâce à leur "name" avec une notation en point :
const firstName = form.first;
const lastName = form.last;
const email = form.email;
const birthDate = form.birthdate;
const quantity = form.quantity;
// const locations = form.location;
const locations = document.querySelectorAll('input[type="radio"]');
const termsOfUse = form.terms;
const newsletters = form.newsletters;
const btnSubmit = form.submit;

// On récupère les balises "small" :
const firstSmall = firstName.nextElementSibling;
const lastSmall = lastName.nextElementSibling;
const emailSmall = email.nextElementSibling;
const dateSmall = birthDate.nextElementSibling;
const quantitySmall = quantity.nextElementSibling;
const locationSmall = document.getElementById('location-msg');

// Création des Expressions Régulières :
const regexName = new RegExp("^[a-zA-Z-' ]{2,50}$");
const regexEmail = new RegExp(
	'^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+.)+[.]{1}[a-z]{2,3}$',
	'g'
);

/*___________Validation des saisies du formulaire___________*/

// Fonctions de vérification

// Firstname
const checkFirstName = () => {
	if (regexName.test(firstName.value.trim())) {
		firstSmall.innerHTML = 'Saisie valide.';
		firstSmall.style.color = 'green';
		return true;
	} else {
		firstSmall.innerHTML =
			'Veuillez entrer 2 caractères ou plus pour le champs du nom.';
		firstSmall.style.color = 'red';
		return false;
	}
};

// Lastname
const checkLastName = () => {
	if (regexName.test(lastName.value.trim())) {
		lastSmall.innerHTML = 'Saisie valide.';
		lastSmall.style.color = 'green';
		// isInputValid = true;
		return true;
	} else {
		lastSmall.innerHTML =
			'Veuillez entrer 2 caractères ou plus pour le champs du nom.';
		lastSmall.style.color = 'red';
		return false;
	}
};

// Email
const checkEmail = () => {
	if (regexEmail.test(email.value.trim())) {
		emailSmall.innerHTML = 'Saisie valide.';
		emailSmall.style.color = 'green';
		return true;
	} else {
		emailSmall.innerHTML = "Cette adresse e-mail n'est pas valide.";
		emailSmall.style.color = 'red';
		return false;
	}
};

// Birthdate A VOIR RESTRICTIONS DATES
const checkBirthDate = () => {
	if (birthDate.value != '') {
		dateSmall.innerHTML = 'Saisie valide';
		dateSmall.style.color = 'green';
		return true;
	} else {
		dateSmall.innerHTML = 'Vous devez entrer votre date de naissance.';
		dateSmall.style.color = 'red';
		return false;
	}
};

// Tournaments quantity
const checkQuantity = () => {
	if (
		quantity.value > 0 &&
		quantity.value <= 99 &&
		quantity.value % 1 == 0 &&
		!quantity.value == ''
	) {
		quantitySmall.innerHTML = 'Saisie valide.';
		quantitySmall.style.color = 'green';
		return true;
	} else {
		quantitySmall.innerHTML = 'Veuillez indiquer un nombre valide.';
		quantitySmall.style.color = 'red';
		return false;
	}
};

// Locations  NE FONCTIONNE PAS

const checkLocation = () => {
	if (document.querySelector('input[name = "location"]:checked')) {
		locationSmall.innerHTML = 'Saisie valide.';
		locationSmall.style.color = 'green';
		return true;
	} else {
		locationSmall.innerHTML = 'Vous devez choisir une option.';
		locationSmall.style.color = 'red';
		return false;
	}
};

// Ecoute des champs saisis :
firstName.addEventListener('change', () => {
	checkFirstName();
});

lastName.addEventListener('change', () => {
	checkLastName();
});

email.addEventListener('change', () => {
	checkEmail();
});

birthDate.addEventListener('change', () => {
	checkBirthDate();
});

quantity.addEventListener('change', () => {
	checkQuantity();
});

btnSubmit.addEventListener('click', (e) => {
	e.preventDefault();
	// formValidation();
	isFormValid();
});

const isFormValid = () => {
	if (checkFirstName() && checkLastName()) {
		console.log('ok');
	} else {
		console.log('prob');
	}
};
