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
const modalRegistered = document.querySelector('.registered');
const modalBody = document.querySelector('.modal-body');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
	modalRegistered.style.display = 'none';
}

// close modal event
modalClose.addEventListener('click', closeModal);

// close modal form
function closeModal() {
	modalbg.style.display = 'none';
}

//------------------------------------------------------------------

/*__________FORM VALIDATION___________*/

// Sélection des éléments dans le DOM :
const form = document.getElementById('form');

// Récupèration des "input" du formulaire grâce à leur "name" avec une notation en point :
const firstName = form.first;
const lastName = form.last;
const email = form.email;
const birthDate = form.birthdate;
const quantity = form.quantity;
const locations = document.getElementById('quantity');
const termsOfUse = document.getElementById('checkbox1');
const newsLetters = document.getElementById('checkbox2');
const registered = document.querySelector('.registered');

// Récupèration des balises <small> pour afficher les messages d'erreur :
const firstSmall = firstName.nextElementSibling;
const lastSmall = lastName.nextElementSibling;
const emailSmall = email.nextElementSibling;
const dateSmall = birthDate.nextElementSibling;
const quantitySmall = quantity.nextElementSibling;
const locationSmall = document.getElementById('location-msg');

// Création des Expressions Régulières :
const regexName = new RegExp("^[a-zA-Z-' ]{2,}$");
const regexEmail = new RegExp(
	'^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+.)+[.]{1}[a-z]{2,3}$'
);

/*___________Validation des saisies du formulaire___________*/

// Ecoute des champs saisis + fonctions associées :

// FirstName
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
firstName.addEventListener('change', checkFirstName);

// LastName
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
lastName.addEventListener('change', checkLastName);

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
email.addEventListener('change', checkEmail);

// BirthDate
const checkBirthDate = () => {
	if (birthDate.value != '') {
		dateSmall.innerHTML = '';
		return true;
	} else {
		dateSmall.innerHTML = 'Vous devez entrer votre date de naissance.';
		dateSmall.style.color = 'red';
		return false;
	}
};
birthDate.addEventListener('change', checkBirthDate);

// Quantity of tournaments
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
quantity.addEventListener('change', checkQuantity);

/********* TODO : AJOUTER ECOUTE ***********/
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
locations.addEventListener('change', checkLocation);

// Terms Of Use
const checkTermsOfUse = () => {
	let termsSmall = document.getElementById('terms-msg');
	if (termsOfUse.checked) {
		termsSmall.innerHTML = '';
		return true;
	} else {
		termsSmall.innerHTML =
			"Vous devez accepter les conditions d'utilisation pour vous inscrire.";
		termsSmall.style.color = 'red';
		return false;
	}
};
termsOfUse.addEventListener('change', checkTermsOfUse);

//______________ FINAL VALIDATION ______________

/*
 Validation du formulaire :
 si la variable "control" est true, alors le formulaire peut être envoyer au serveur.
 Si "control" est false, alors afficher un message d'information à l'utilisateur.
 */

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (
		regexName.test(firstName.value.trim()) &&
		regexName.test(lastName.value.trim()) &&
		regexEmail.test(email.value.trim()) &&
		birthDate.value != '' &&
		quantity.value > 0 &&
		quantity.value <= 99 &&
		quantity.value % 1 == 0 &&
		!quantity.value == '' &&
		document.querySelector('input[name = "location"]:checked') &&
		termsOfUse.checked === true
	) {
		launchSuccess();
	} else {
		alert('Un ou plusieurs champs du formulaire ne sont pas valides');
	}
});

const launchSuccess = () => {
	registered.style.display = 'block'; // a créer en HTML CSS
	modalBody.style.display = 'none';
	form.reset();
	console.log('envoi serveur');
};

//------------------------------------------------------------------
/*** OBJET POUR ENVOI SERVEUR */
let registrationUserInfos = {
	firstName: firstName.value,
	lastName: lastName.value,
	email: email.value,
	birthDate: birthDate.value,
	quantity: Number(quantity.value),
	// location: document.querySelector('input[type="radio"]:checked'),
	// termsOfUse: termsOfUse.value,
	// newsLetters: newsLetters.value,
};
