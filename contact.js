const form = document.getElementById("contact");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const successMessage = document.getElementById("successMessage");
const emailErrorMessage = document.getElementById("emailErrorMessage")

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!email.value.includes("@")) {
        emailErrorMessage.textContent = "Enter a valid Email-adress"
        emailErrorMessage.style.color = "red"
    } else {
        form.submit()
        successMessage.textContent = "Thanks for your message"
        successMessage.style.color = "green"
        emailErrorMessage.textContent = ""
        form.reset()
    }
});
