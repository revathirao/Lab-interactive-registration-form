const customForm = document.getElementById('registrationForm');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const emailError = document.getElementById('emailError');
const userNameError = document.getElementById('usernameError');
const passwordError  = document.getElementById('passwordError');
const confirmPasswordError  = document.getElementById('confirmPasswordError');
 

// Load saved username: On page load, check if a username is saved in localStorage. If so, pre-fill the username field.window .

document.addEventListener("DOMContentLoaded",function(){
      const savedUsername = localStorage.getItem('username'); 
      if(savedUsername){
        userNameInput.value= savedUsername
      }
})

// Real-time validation: Add input event listeners to each field.

// Check validity using the Constraint Validation API
function validateEmail() {
    if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity('Please enter a valid email address, for example, name@example.com.');
    } else if (emailInput.validity.valueMissing) {
      emailInput.setCustomValidity('We need your email address to contact you!');
    }
    else {
      emailInput.setCustomValidity(''); // Clear custom error if valid
    }
    
    // // Display the custom message or clear it
     emailInput.textContent = customEmailInput.validationMessage;
     return emailInput.checkVisibility
  }
 

    // Single validation function for all inputs
    function validateField(input) {
        //get the span error bu id
        const spanError = document.getElementById(`${input.id}Error`);
        message = "" //store the custom message


        //Check validity using the Constraint Validation API  

        switch (input.id) {
            case "userName":

                if (input.validity.valueMissing) {
                    input.setCustomValidity("User Name is required field")
                } else if (input.validity.patternMismatch) {
                    input.setCustomValidity("Only alphabets numbers and underscores allowed")
                } else if (input.validity.tooShort) {
                    input.setCustomValidity("Username must be at least 5 characters.")
                } else {
                    input.setCustomValidity(""); // Clear custom error if valid
                }
                break;  

        case "email":

                if (email.validity.typeMismatch) {
                    email.setCustomValidity("Please enter a valid email address, for example, name@example.com.");
                } else if (email.validity.valueMissing) {
                    email.setCustomValidity("We need your email address to contact you!")
                }
                else {
                    email.setCustomValidity(""); // Clear custom error if valid
                } 
                break;   
                
            case "password":

                if (password.validity.typeMismatch) {
                    password.patternMismatch("Password must include uppercase, lowercase, and a number.");
                } else if (password.validity.valueMissing) {
                    password.setCustomValidity("Password is a required field");
                }
                else {
                    password.setCustomValidity(""); // Clear custom error if valid
                }  
                break;       

            case "confirmPassword":

                // Explicit check: must match password field

                if (confirmPassword.value !== password.value) {
                    confirmPassword.setCustomValidity("Passwords do not match.");
                } else {
                    confirmPassword.setCustomValidity('');
                }
                break; 

        }

  //  Apply the custom validity message

 //  Display the current validation message in the corresponding <span>
    if(spanError){
        spanError.textContent = input.validationMessage;
         //  Return true/false depending on field validity
         return input.checkVisibility;
    }
 } // function ends

  const input= [username, email, password, confirmPassword];]