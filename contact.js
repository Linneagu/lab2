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
const messageError = document.getElementById("messageError")
const successMessage = document.getElementById("successMessage");

// HTML element for showing character count of textarea
const charCount = document.getElementById("charCount");

function showError(message, element) {
    element.textContent = message
    element.style.color = "red"
}

function clearError(element) {
    element.textContent = ""
}

function validateName(inputElement, errorElement) {
    const value = inputElement.value.trim()
    const regex = /^[A-Za-z]+$/;

    if (!regex.test(value)) {
        showError("Only letters allowed", errorElement);
        return false;
    }

    clearError(errorElement);
    return true;
}

function validateEmail(inputElement, errorElement) {
    const value = inputElement.value.trim();

    if (!value.includes("@") || !value.includes(".")) {
        showError("Enter a valid email", errorElement);
        return false;
    }

    clearError(errorElement);
    return true;
}

function validateMessage(inputElement, errorElement) {
    const value = inputElement.value.trim();

    if (value.length < 20) {
        showError("Message must be at least 20 characters", errorElement);
        return false;
    }

    clearError(errorElement);
    return true;
}

function clearForm() {

}

formField.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstValid = validateName(firstNameInput, firstNameError);
    const lastValid = validateName(lastNameInput, lastNameError);
    const emailValid = validateEmail(emailInput, emailError);
    const messageValid = validateMessage(messageTextarea, messageError);

    if (!firstValid || !lastValid || !emailValid || !messageValid) {
        return;
    }

    successMessage.textContent = `Thank you, ${firstNameInput.value}! I will contact you soon.`;
    successMessage.style.color = "green";

    setTimeout(() => {
        successMessage.textContent = "";
    }, 3000);

    formField.reset();

    charCount.textContent = "0/20 characters";
    charCount.style.color = "black";
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
