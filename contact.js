const form = document.getElementById("contact");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const successMessage = document.getElementById("successMessage");
const emailErrorMessage = document.getElementById("emailErrorMessage")

//Error message for email. 
form.addEventListener("submit", function (event) { //add event listener when submit the form
    event.preventDefault(); // prevent browsers default form submission

    if (!email.value.includes("@")) { //check if the field contains an "@"
        emailErrorMessage.textContent = "Enter a valid Email-adress" //if its invalid, error message show
        emailErrorMessage.style.color = "red" //color of the text
    } else {
        form.submit() //if email is valid, its submitting the form
        successMessage.textContent = `Thanks for your message ${firstName.value}!` //success message
        emailErrorMessage.textContent = "" //clear the error message
        form.reset() //reset all inputs after submitting
    }
});

//Character counter
const textarea = document.getElementById("message");
const charCount = document.getElementById("charCount");

textarea.addEventListener("keyup", function () { //add event listener every time you releases a key
    const text = textarea.value; //get the text from texarea
    const count = text.length; //count the characters

    charCount.textContent = count + `/20 characters`; //update the text content of the character conunter and shows how many out of 20

    if (count < 20 && count > 0) { //if character count is below 20, number shows in red
        charCount.classList.remove("base", "green")
        charCount.classList.add("red");
    } else if (count >= 20) {
        charCount.classList.remove("base", "red")
        charCount.classList.add("green");
    } else {
        charCount.classList.add("base")
    }
});
