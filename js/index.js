// RegExp code for validating an email address
let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const password = document.querySelector('#pw');
const passwordConfirm = document.querySelector('#pw-confirm');
const btn = document.querySelector('button');

const inputFields = document.querySelectorAll('input');
const errorLabels = document.querySelectorAll('.error');


firstName.addEventListener('focusout', (e) => {
  e.target.value === '' ? errorLabels[0].textContent = 'Please input a name' : errorLabels[0].textContent = '\xa0'
});


lastName.addEventListener('focusout', (e) => {
  e.target.value === '' ? errorLabels[1].textContent = 'Please input a name' : errorLabels[1].textContent = '\xa0'
});


email.addEventListener('focusout', (e) => {
  if ((e.target.value === '') || !(regex.test(e.target.value))) {
    errorLabels[2].textContent = 'Please provide a valid e-mail address'; 
  } else {
    errorLabels[2].textContent = '\xa0';
  } 
});


password.addEventListener('focusout', (e) => {
  if (e.target.value === '') {
    errorLabels[4].textContent = 'Password field can\'t be empty';
  } else if (e.target.value.length < 8) {
    errorLabels[4].textContent = 'Password should be at least 8 characters long';
  } else {
    errorLabels[4].textContent = '\xa0';
  }
});


passwordConfirm.addEventListener('focusout', (e) => {
  e.target.value !== password.value ? errorLabels[5].textContent = 'Passwords don\'t match' : errorLabels[1].textContent = '\xa0'
});


// only submits form if no errors present, and all required inputs made
btn.addEventListener('click', (e) => {
  if (!validateInputs()) {
    e.preventDefault();
  } else {
    alert('You\'re signed up now.');
  }
})


// evaluates if all inputs are valid
// for each error label if error message present, leaves it untouched, just flags canSubmit as false 
// for all all inputs that don't have error message yet, insert error message, if input is empty
function validateInputs() {
  let canSubmit = true;
  let index = 0;

  errorLabels.forEach(error => {
    if (error.textContent !== '\xa0') {  // '\xa0' is js equivalent of html &nbsp;
      canSubmit = false;
      index++;
    } else if (inputFields[index].value === '') {
      // exclude index 3 (=phone), as not required
      if (index === 3) { 
        index++;
      } else {
        canSubmit = false;
        index++;
        error.textContent = 'Input required'
      }
    } 
  })
  return canSubmit;
}
