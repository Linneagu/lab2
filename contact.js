const formField = document.getElementById("contact");

// HTML input, select & textarea elements
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const subjectSelect = document.getElementById("subject");
const messageTextarea = document.getElementById("message");

// HTML p elements for showing errors
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailErrorMessage")
const subjectError= document.getElementById("subjectError")
const messageError = document.getElementById("messageError")
const successMessage = document.getElementById("successMessage");

// HTML element for showing character count of textarea
const charCount = document.getElementById("charCount");

const clearButton = document.getElementById("clear")

//Function for showError and clearError
function showError(message, inputElement, errorElement) {
    errorElement.textContent = message
    errorElement.style.color = "red"
    inputElement.classList.add("error")
}

function clearError(inputElement, errorElement) {
    errorElement.textContent = ""
    inputElement.classList.remove("error")
}

//Function for validation
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

function validateEmail(inputElement, errorElement) {
    const value = inputElement.value.trim();

    if (!value.includes("@") || !value.includes(".")) {
        showError("Enter a valid email", inputElement, errorElement);
        return false;
    }

    clearError(inputElement, errorElement);
    return true;
}

function validateSubject(inputElement, errorElement) {
    if (inputElement.value === "") {
        showError("Please choose a subject", inputElement, errorElement);
        return false;
    }

    clearError(inputElement, errorElement);
    inputElement.classList.add("valid")
    return true;
}

function validateMessage(inputElement, errorElement) {
    const value = inputElement.value.trim();

    if (value.length < 20) {
        showError("Message must be at least 20 characters", inputElement, errorElement);
        return false;
    }

    clearError(inputElement, errorElement);
    return true;
}

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

    setTimeout(() => {
        successMessage.textContent = "";
    }, 3000);
}

formField.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstValid = validateName(firstNameInput, firstNameError);
    const lastValid = validateName(lastNameInput, lastNameError);
    const emailValid = validateEmail(emailInput, emailError);
    const subjectValid = validateSubject(subjectSelect, subjectError)
    const messageValid = validateMessage(messageTextarea, messageError);

    if (!firstValid || !lastValid || !emailValid || !subjectValid || !messageValid) {
        return;
    }

    successMessage.textContent = `Thank you, ${firstNameInput.value}! I will contact you soon.`;
    successMessage.style.color = "green";

    clearForm();
})

messageTextarea.addEventListener("keyup", function () {
    const count = messageTextarea.value.length;
    charCount.textContent = `${count}/20 characters`;

    if (count < 20) {
        charCount.style.color = "red";
    } else {
        charCount.style.color = "green"
    }
});

clearButton.addEventListener("click", clearForm);
