// Get the form element
const formField = document.getElementById("contact");

// HTML input, select and textarea elements
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const subjectSelect = document.getElementById("subject");
const messageTextarea = document.getElementById("message");

// HTML p elements for showing error messages
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailErrorMessage")
const subjectError= document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

// HTML element for showing character count of textarea
const charCount = document.getElementById("charCount");

// Clear/reset button
const clearButton = document.getElementById("clear");

// Function that shows an error message and adds error styling to the input
function showError(message, inputElement, errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    errorElement.style.color = "red";
    inputElement.classList.add("error");
}

// Function that clears the error message and marks the input as valid
function clearError(inputElement, errorElement) {
    errorElement.textContent = "";
    errorElement.classList.add("hidden");
    inputElement.classList.remove("error");
    inputElement.classList.add("valid")
}

// Function for validates name fields where only letters are allowed
function validateName(inputElement, errorElement) {
    const value = inputElement.value.trim()
    const regex = /^[A-Za-z]+$/;

    if (!regex.test(value)) {
        showError("Only letters allowed", inputElement, errorElement);
        return false;
    }

    clearError(inputElement, errorElement);
    return true;
}

// Validate first name while typing
firstNameInput.addEventListener("input", () => {
    validateName(firstNameInput, firstNameError);
})

// Validate last name while typing
lastNameInput.addEventListener("input", () => {
    validateName(lastNameInput, lastNameError);
})

// Validate email format
function validateEmail(inputElement, errorElement) {
    const value = inputElement.value.trim();

    if (!value.includes("@") || !value.includes(".")) {
        showError("Enter a valid email", inputElement, errorElement);
        return false;
    }

    clearError(inputElement, errorElement);
    return true;
}

// Validate email while typing
emailInput.addEventListener("input", () => {
    validateEmail(emailInput, emailError);
})

// Vaidates that a subject has been selected
function validateSubject(inputElement, errorElement) {
    
    if (inputElement.value === "") {
        showError("Please choose a subject", inputElement, errorElement);
        return false;
    }

    clearError(inputElement, errorElement);
    inputElement.classList.add("valid")
    return true;
}

// Validate subject when selection changes
subjectSelect.addEventListener("change", () => {
    validateSubject(subjectSelect, subjectError)
})

// Validates message length with minimun 20 characters
function validateMessage(inputElement, errorElement) {
    const value = inputElement.value.trim();

    if (value.length < 20) {
        showError("Message must be at least 20 characters", inputElement, errorElement);
        return false;
    }

    clearError(inputElement, errorElement);
    return true;
}

// Uppdates character counter and validates message in real time
messageTextarea.addEventListener("input", function () {
    const count = messageTextarea.value.length;
    charCount.textContent = `${count}/20 characters`;

    if (count < 20) {
        charCount.style.color = "red";
        validateMessage(messageTextarea, messageError);
    } else {
        charCount.style.color = "green"
        validateMessage(messageTextarea, messageError);
    }
});

// Clears the form and resets validation states
function clearForm() {
    formField.reset();

    clearError(firstNameInput, firstNameError);
    clearError(lastNameInput, lastNameError);
    clearError(emailInput, emailError);
    clearError(subjectSelect, subjectError);
    clearError(messageTextarea, messageError);

    firstNameInput.classList.remove("error", "valid");
    lastNameInput.classList.remove("error", "valid");
    emailInput.classList.remove("error", "valid");
    subjectSelect.classList.remove("error", "valid");
    messageTextarea.classList.remove("error", "valid");
    

    charCount.textContent = "0/20 characters";
    charCount.style.color = "black";
}

// Handels form submission and final validation
formField.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    const firstValid = validateName(firstNameInput, firstNameError);
    const lastValid = validateName(lastNameInput, lastNameError);
    const emailValid = validateEmail(emailInput, emailError);
    const subjectValid = validateSubject(subjectSelect, subjectError)
    const messageValid = validateMessage(messageTextarea, messageError);

// Stop submission if any field is invalid
    if (!firstValid || !lastValid || !emailValid || !subjectValid || !messageValid) {
        return;
    }

// Show success message if everything is valid
    successMessage.classList.remove("hidden");
    successMessage.textContent = `Thank you, ${firstNameInput.value}! I will contact you soon.`;
    successMessage.style.color = "green";

// Clear form after 3 seconds
    setTimeout(() => {
        successMessage.textContent = "";
        clearForm();
    }, 3000);
})

// Clears the form when clicking the clear button
clearButton.addEventListener("click", clearForm);
