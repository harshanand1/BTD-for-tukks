const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
const captchaTextBox = document.querySelector(".Captcha_box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captcha_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");
// captcha
let captchaText = null

const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char)=> (Math.random() > 0.5 ? char.toUpperCase() : char));
  captchaText = changeString.join(" ");
  captchaTextBox.value = captchaText;
  console.log(captchaText);
};

const refreshBtnClick = () => {
  generateCaptcha();
  captchaInputBox.value = "";
  captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
  submitButton.classList.toggle("disabled", !captchaInputBox.value);
  if(captchaInputBox.value === "")   message.classList.remove("active");

};

const submitBtnClick = () => {
  captchaText = captchaText
  .split("")
  .filter((char) => char !== " ")
  .join("");

  message.classList.add("active");
  if(captchaInputBox.value === captchaText){
    message.innerText = "Entered Captcha is correct";
    message.style.color = "#826afb";

  }
  else{
    message.innerText = "Entered captcha is not correct";
    message.style.color = "##FF2525";
  }
};


refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);

generateCaptcha();
// captcha close




// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());

// Show login popup
showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form
signupLoginLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
    });
});

function showPreview(input) {
  // Get the file object from the input element.
  const file = input.files[0];

  // Get the image element by its ID
  let image = document.getElementById("preview");
      
  // Use URL.createObjectURL to create a blob URL for the selected file
  const blobUrl = URL.createObjectURL(file);

 // Set the 'src' attribute of the image element to the blob URL
image.src = blobUrl;
}
// below thw code of review the picture
const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const resetButton = document.getElementById('resetButton');

imageInput.addEventListener('change', function() {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      previewImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

resetButton.addEventListener('click', function() {
  previewImage.src = "";
 });

/*CODE VALIDATION  */
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    displayError('Please enter a valid email');
  } else {
    removeError();
  }
}

function displayError(message) {
  const errorElement = document.getElementById('email-error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function removeError() {
  const errorElement = document.getElementById('email-error');
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

function validatePassword() {
  const password = passwordInput.value.trim();
  const minLength = 8;

  if (password.length < minLength) {
    displayError(`Enter valid password (minimum ${minLength} characters)`);
  } else {
    removeError();
  }
}



/*const signupEmailInput = document.getElementById('signup-email');
signupEmailInput.addEventListener('input', validateEmail);
function validateEmail() {
  const signup-email = signupEmailInput.value.trim();
  const emailRegexs = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegexs.test(email)) {
    displayError('Please enter a valid email');
  } else {
    removeError();
  }
}*/