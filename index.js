const customForm = document.getElementById('registrationForm');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Load saved username: On page load, check if a username is saved in localStorage. If so, pre-fill the username field.window .

document.addEventListener("DOMContentLoaded", function () {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        userName.value = savedUsername
    }
})


// Real-time validation: Add input event listeners to each field.
// Real-time validation while typing which ensures errors appear immediately as the user types
const inputs = [userName, email, password, confirmPassword];

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
        validateField(inputs[i])
    })
}


// Single validation function for all inputs
function validateField(input) {

    //get the span error id
    const spanError = document.getElementById(`${input.id}Error`);
    message = "" //store the custom message


    //Check validity using the Constraint Validation API  

    switch (input.id) {
        case "username":

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

            if (password.validity.valueMissing) {
                password.setCustomValidity("Password is required.");
            } else if (password.validity.tooShort) {
                password.setCustomValidity("Password must be at least 8 characters.");
            } else if (password.validity.patternMismatch) {
                password.setCustomValidity("Password must include uppercase, lowercase, and a number.");
            } else {
                password.setCustomValidity("");
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
    if (spanError) {
        spanError.textContent = input.validationMessage;
        //  Return true/false depending on field validity
        return input.checkValidity();
    }
} // function ends

// Form submit
customForm.addEventListener("submit", function (e) {
    console.log("Submit handler is running! Preventing default..."); // Add this line

    e.preventDefault(); 

    // Duplicate username check
    const existingUsername = localStorage.getItem('username');
    if (userName.value === existingUsername) {
        alert("This username is already taken!");
        userName.focus();
        return; // Stop further processing
    }

    //Validate all the input before submitting
    [userName, email, password, confirmPassword].forEach(input => validateField(input));

    //check if input has any error
    // const firstInvalidField = customForm.querySelector(".invalid");//this did not work
    const firstInvalidField = [userName, email, password, confirmPassword].find(input => !input.checkValidity());

    if (firstInvalidField) {

        // Focus first invalid field
        firstInvalidField.focus()
    }
    else {
        //save username and reset the form

        localStorage.setItem("username", userName.value);
        alert("Registration successful!");
        customForm.reset();

    }

});

