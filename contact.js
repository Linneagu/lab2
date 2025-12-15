const form = document.getElementById("contact");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const successMessage = document.getElementById("successMessage");
const emailErrorMessage = document.getElementById("emailErrorMessage")

form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent browsers default form submission

    if (!email.value.includes("@")) { //check if the field contains an "@"
        emailErrorMessage.textContent = "Enter a valid Email-adress" //if its invalid, error message show
        emailErrorMessage.style.color = "red" //color of the text

    } else {
        form.submit() //if email is valid, its submitting the form
        successMessage.textContent = "Thanks for your message" //success message
        successMessage.style.color = "green" //color of the text
        emailErrorMessage.textContent = "" //clear the error message
        form.reset() //reset all inputs after submitting
    }
});

const textarea = document.getElementById("message");
const charCount = document.getElementById("charCount");

textarea.addEventListener("keyup", function(){
    const text = textarea.value; //get the text from texarea
    const count = text.length; //count number of signs
    charCount.textContent = "Character count: " + count;
})