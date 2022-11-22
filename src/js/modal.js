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
// const firstSmall = firstName.nextElementSibling;
// const lastSmall = lastName.nextElementSibling;
// const emailSmall = email.nextElementSibling;
// const dateSmall = birthDate.nextElementSibling;
// const quantitySmall = quantity.nextElementSibling;
const locationErrorMsg = document.getElementById('location-error');
// const termsSmall = document.getElementById('terms-msg');

// Création des Expressions Régulières :
const regexName = new RegExp("^[a-zA-Z-' ]{2,}$");
const regexEmail = new RegExp(
	'^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+.)+[.]{1}[a-z]{2,3}$'
);

/*
 Affiche le message d'erreur depuis l'attribut 'data-error'
 suivant qu'il est false si l'input est valide, ou true si l'input est non valide.
 inputParent récupère l'élément 'input' propriétaire de l'attribut.
 isInputValid utilise la méthode "checkValidity()" pour retourner true ou false.
 S'il est false, l'attribut data-error n'est pas visible.
 S'il est true, data-error affiche le message.  
 */
const displayError = (input) => {
	const inputParent = input.parentElement;
	const isInputValid = input.checkValidity();
	if (isInputValid) {
		inputParent.setAttribute('data-error-visible', 'false');
	} else {
		inputParent.setAttribute('data-error-visible', 'true');
	}
};

/*___________Validation des saisies du formulaire___________*/

// Ecoute des champs saisis + fonctions associées :

// FirstName
const checkFirstName = () => {
	if (regexName.test(firstName.value.trim())) {
		firstName.setCustomValidity('');
	} else {
		firstName.setCustomValidity('Veuillez entrer 2 caractères ou plus.');
	}
	displayError(firstName);
};
firstName.addEventListener('change', checkFirstName);

// LastName
const checkLastName = () => {
	if (regexName.test(lastName.value.trim())) {
		lastName.setCustomValidity('');
	} else {
		lastName.setCustomValidity('Veuillez entrer 2 caractères ou plus.');
	}
	displayError(lastName);
};
lastName.addEventListener('change', checkLastName);

// Email
const checkEmail = () => {
	if (regexEmail.test(email.value.trim())) {
		email.setCustomValidity('');
	} else {
		email.setCustomValidity('Veuillez entrer une adresse e-mail valide.');
	}
	displayError(email);
};
email.addEventListener('change', checkEmail);

// BirthDate
const checkBirthDate = () => {
	if (birthDate.value != '') {
		birthDate.setCustomValidity('');
	} else {
		birthDate.setCustomValidity('Vous devez entrer votre date de naissance.');
	}
	displayError(birthDate);
};
birthDate.addEventListener('change', checkBirthDate);

// Quantity of tournaments
const checkQuantity = () => {
	if (
		quantity.value > 0 &&
		quantity.value <= 99 &&
		quantity.value % 1 == 0 &&
		quantity.value !== ''
	) {
		quantity.setCustomValidity('');
	} else {
		quantity.setCustomValidity('Veuillez indiquer un nombre entre 0 et 99.');
	}
	displayError(quantity);
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
		locationErrorMsg.innerHTML = '';
	} else {
		locationErrorMsg.innerHTML = 'Veuillez choisir une option.';
		// return false;
	}
};
// locationChoice.forEach((radio) => {
// 	radio.addEventListener('change', checkLocation);
// });

// Terms Of Use
const checkTermsOfUse = () => {
	if (termsOfUse.checked) {
		termsOfUse.setCustomValidity('');
	} else {
		termsOfUse.setCustomValidity(
			"Veuillez accepter les conditions d'utilisation pour vous inscrire."
		);
	}
	displayError(termsOfUse);
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
			quantity.value !== '' &&
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
