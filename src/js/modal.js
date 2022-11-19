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
const modalConfirmation = document.querySelector('.modal-confirmation');
const modalBody = document.querySelector('.modal-body');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
	modalConfirmation.style.display = 'none';
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
const locationChoice = document.querySelectorAll('input[name="location"]');
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
const termsSmall = document.getElementById('terms-msg');

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
		firstSmall.textContent = '';
	} else {
		firstSmall.textContent =
			'Veuillez entrer 2 caractères ou plus pour le champs du nom.';
	}
};
firstName.addEventListener('change', checkFirstName);

// LastName
const checkLastName = () => {
	if (regexName.test(lastName.value.trim())) {
		lastSmall.textContent = '';
	} else {
		lastSmall.textContent =
			'Veuillez entrer 2 caractères ou plus pour le champs du nom.';
	}
};
lastName.addEventListener('change', checkLastName);

// Email
const checkEmail = () => {
	if (regexEmail.test(email.value.trim())) {
		emailSmall.textContent = '';
	} else {
		emailSmall.textContent = "Cette adresse e-mail n'est pas valide.";
	}
};
email.addEventListener('change', checkEmail);

// BirthDate
const checkBirthDate = () => {
	if (birthDate.value != '') {
		dateSmall.textContent = '';
	} else {
		dateSmall.textContent = 'Vous devez entrer votre date de naissance.';
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
		quantitySmall.textContent = '';
	} else {
		quantitySmall.textContent = 'Veuillez indiquer un nombre valide.';
	}
};
quantity.addEventListener('change', checkQuantity);

// Location : Boucle pour vérifier chaque radio si coché ou non
let radioChecked = false;
const checkLocation = () => {
	for (let i = 0; i < locationChoice.length; i++) {
		if (locationChoice[i].checked) {
			radioChecked = true;
			break;
		}
	}
	if (radioChecked) {
		locationSmall.textContent = '';
	} else {
		locationSmall.textContent = 'Vous devez choisir une option.';
		return false;
	}
};
// locationChoice.addEventListener('change', checkLocation);

// Terms Of Use
const checkTermsOfUse = () => {
	if (termsOfUse.checked) {
		termsSmall.textContent = '';
	} else {
		termsSmall.textContent =
			"Vous devez accepter les conditions d'utilisation pour vous inscrire.";
	}
};
termsOfUse.addEventListener('change', checkTermsOfUse);

//______________ FINAL VALIDATION ______________

/*
Validation du formulaire :
Appel des fonctions de contrôle des champs.
Si les conditions sont remplies, alors la fonction pour afficher le message de succès est lancée.
Sinon, une alerte est envoyée à l'utilisateur pour lui signifier les erreurs.
 */

const isFormValid = () => {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		checkFirstName();
		checkLastName();
		checkEmail();
		checkBirthDate();
		checkQuantity();
		checkLocation();
		checkTermsOfUse();
		if (
			regexName.test(firstName.value.trim()) &&
			regexName.test(lastName.value.trim()) &&
			regexEmail.test(email.value.trim()) &&
			birthDate.value != '' &&
			quantity.value > 0 &&
			quantity.value <= 99 &&
			quantity.value % 1 == 0 &&
			!quantity.value == '' &&
			radioChecked == 1 &&
			termsOfUse.checked == true
		) {
			launchConfirmationModal();

			// let userRegistration = {
			// 	firstname: firstName.value,
			// 	lastname: lastName.value,
			// 	email: email.value,
			// 	birthdate: birthDate.value,
			// 	quantity: quantity.value,
				
			// }
		} else {
			alert('Un ou plusieurs champs du formulaire ne sont pas valides');
		}
	});
};
isFormValid();

const launchConfirmationModal = () => {
	modalConfirmation.style.display = 'block';
	modalBody.style.display = 'none';
	console.log('envoi serveur');
};
