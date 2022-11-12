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
const form = document.querySelector('form');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthDate = document.getElementById('birthDate');
const quantity = document.getElementById('quantity');
const allLocations = document.querySelectorAll(".checkbox-input[type='radio']");
const termsOfUse = document.getElementById('checkbox1');
const newsletters = document.getElementById('checkbox2');
const btnSubmit = document.querySelector('.btn-submit');

// Variables des Expressions Régulières :
const regexName = new RegExp("^[a-zA-Z-' ]{2,50}$");
const regexEmail = new RegExp(
	'^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+.)+[.]{1}[a-z]{2,3}$'
);

// Validation des saisies du formulaire :

// First Name :
let isValidFirstName = false;
const checkFirstName = () => {
	firstName.addEventListener('change', () => {
		const firstNameValue = firstName.value.trim();
		firstName.setCustomValidity(''); // fixe les propriétés de validation d'un input
		if (regexName.test(firstNameValue) === false || firstNameValue === '') {
			firstName.setCustomValidity(
				'Veuillez entrer 2 caractères ou plus pour le champ du prénom.'
			);
		} else {
			return (isValidFirstName = true);
		}
		firstName.reportValidity(); // Affiche le message d'erreur à l'utilisateur
	});
};
checkFirstName();

// Last Name :
let isValidLastName = false;
const checkLastName = () => {
	lastName.addEventListener('change', () => {
		const lastNameValue = lastName.value.trim();
		lastName.setCustomValidity('');
		if (regexName.test(lastNameValue) === false || lastNameValue === '') {
			lastName.setCustomValidity(
				'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
			);
		} else {
			return (isValidLastName = true);
		}
		lastName.reportValidity();
	});
};
checkLastName();

// E-mail :
let isValidEmail = false;
const checkEmail = () => {
	email.addEventListener('change', () => {
		const emailValue = email.value.trim();
		email.setCustomValidity('');
		if (regexEmail.test(emailValue) === false || emailValue === '') {
			email.setCustomValidity("La saisie de l'adresse email n'est pas valide.");
		} else {
			return (isValidEmail = true);
		}
		email.reportValidity();
	});
};
checkEmail();

// Birth Date :
let isValidBirthDate = false;
const checkBirthDate = () => {
	if (birthDate === Number) {
		return true;
	} else {
		return false;
	}
};
checkBirthDate();

// Location :
let isValidLocation = false;
const checkLocation = () => {
	for (let i = 0; i < allLocations.length; i++) {
		if (allLocations[i].checked) {
			return (isValidLocation = true);
		}
	}
	return (isValidLocation = false);
};
checkLocation();

// Validation pour envoi du formulaire :
const isFormValid = () => {
	btnSubmit.addEventListener('click', (e) => {
		e.preventDefault(); // stop la propagation de l'évènement aux parents.

		if (
			isValidFirstName == true &&
			isValidLastName == true &&
			isValidEmail == true &&
			isValidLocation == true &&
			termsOfUse.checked == true
		) {
			alert('Merci ! Votre réservation a été reçue.');
		} else {
			alert('Un ou plusieurs champs requis ne sont pas valides.');
		}
	});
};
isFormValid();
