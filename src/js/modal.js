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
const allLocations = document.querySelectorAll(".checkbox-input[type='radio']");
const termsOfUse = form.terms;
const newsletters = form.newsletters;
const btnSubmit = form.submit;

// On récupère les balises "small" :
const firstSmall = firstName.nextElementSibling;
const lastSmall = lastName.nextElementSibling;
const emailSmall = email.nextElementSibling;

// Création des Expressions Régulières :
const regexName = new RegExp("^[a-zA-Z-' ]{2,50}$", 'g');
const regexEmail = new RegExp(
	'^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+.)+[.]{1}[a-z]{2,3}$',
	'g'
);

/*___________Validation des saisies du formulaire___________*/

// Fonctions de vérification :
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

const checkLastName = () => {
	if (regexName.test(lastName.value.trim())) {
		lastSmall.innerHTML = 'Saisie valide.';
		lastSmall.style.color = 'green';
		return true;
	} else {
		lastSmall.innerHTML =
			'Veuillez entrer 2 caractères ou plus pour le champs du nom.';
		lastSmall.style.color = 'red';
		return false;
	}
};

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
