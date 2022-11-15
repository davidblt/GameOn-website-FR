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
const form = document.querySelector('#form');

// On récupère les "input" du formulaire grâce à leur "name" avec une notation en point :
const firstName = form.first;
const lastName = form.last;
const email = form.email;
const birthDate = form.birthdate;
const quantity = form.quantity;
// const locations = form.location;
const locations = document.querySelectorAll('input[type="radio"]');
const termsOfUse = document.querySelector('input[name="terms"]:checked');
const newsLetters = document.querySelector('input[name="newsletters"]:checked');
const btnSubmit = form.submit;

// On récupère les balises "small" :
const firstSmall = firstName.nextElementSibling;
const lastSmall = lastName.nextElementSibling;
const emailSmall = email.nextElementSibling;
const dateSmall = birthDate.nextElementSibling;
const quantitySmall = quantity.nextElementSibling;
const locationSmall = document.getElementById('location-msg');
const registered = document.querySelector('.registered');

// Création des Expressions Régulières :
const regexName = new RegExp("^[a-zA-Z-' ]{2,50}$");
const regexEmail = new RegExp(
	'^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+.)+[.]{1}[a-z]{2,3}$',
	'g'
);

/*___________Validation des saisies du formulaire___________*/

/* Déclaration de la variable de contrôle de la validité des champs, initialisée à false par défaut, pour empêcher la validation du formulaire.
 */
let control = false;

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

// Ecoute des champs saisis :
firstName.addEventListener('change', () => {
	if (regexName.test(firstName.value.trim())) {
		firstSmall.innerHTML = 'Saisie valide.';
		firstSmall.style.color = 'green';
		control = true;
	} else {
		firstSmall.innerHTML =
			'Veuillez entrer 2 caractères ou plus pour le champs du nom.';
		firstSmall.style.color = 'red';
		control = false;
	}
});

lastName.addEventListener('change', () => {
	if (regexName.test(lastName.value.trim())) {
		lastSmall.innerHTML = 'Saisie valide.';
		lastSmall.style.color = 'green';
		// isInputValid = true;
		control = true;
	} else {
		lastSmall.innerHTML =
			'Veuillez entrer 2 caractères ou plus pour le champs du nom.';
		lastSmall.style.color = 'red';
		control = false;
	}
});

email.addEventListener('change', () => {
	if (regexEmail.test(email.value.trim())) {
		emailSmall.innerHTML = 'Saisie valide.';
		emailSmall.style.color = 'green';
		control = true;
	} else {
		emailSmall.innerHTML = "Cette adresse e-mail n'est pas valide.";
		emailSmall.style.color = 'red';
		control = false;
	}
});

birthDate.addEventListener('change', () => {
	if (birthDate.value != '') {
		dateSmall.innerHTML = '';
		control = true;
	} else {
		dateSmall.innerHTML = 'Vous devez entrer votre date de naissance.';
		dateSmall.style.color = 'red';
		control = false;
	}
});

quantity.addEventListener('change', () => {
	if (
		quantity.value > 0 &&
		quantity.value <= 99 &&
		quantity.value % 1 == 0 &&
		!quantity.value == ''
	) {
		quantitySmall.innerHTML = 'Saisie valide.';
		quantitySmall.style.color = 'green';
		control = true;
	} else {
		quantitySmall.innerHTML = 'Veuillez indiquer un nombre valide.';
		quantitySmall.style.color = 'red';
		control = false;
	}
});

termsOfUse.addEventListener('change', () => {
	let termsSmall = document.getElementById('terms-msg');
	if (termsOfUse.checked) {
		termsSmall.innerHTML = '';
		control = true;
	} else {
		termsSmall.innerHTML =
			"Vous devez accepter les conditions d'utilisation pour vous inscrire.";
		termsSmall.style.color = 'red';
		control = false;
	}
});

//------------------------------------------------------------

//______________ FINAL VALIDATION ______________

/*
 Fonction de validation du formulaire :
 si la variable "control" est true, alors le formulaire peut être envoyer au serveur.
 Si "control" est false, alors afficher un message d'information à l'utilisateur.
 */
const isFormValid = () => {
	btnSubmit.addEventListener('click', (e) => {
		e.preventDefault();
		if (control) {
			launchSuccess();
		} else {
			alert('Un ou plusieurs champs du formulaire ne sont pas valides');
		}
	});
};
isFormValid();

const launchSuccess = () => {
	registered.style.display = 'block'; // a créer en HTML CSS
	modalBody.style.display = 'none';
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
