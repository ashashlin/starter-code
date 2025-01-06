const charLengthSlider = document.querySelector(".js-char-length-slider");
const charLengthNum = document.querySelector(".js-char-length-number");

charLengthSlider.addEventListener("input", () => {
  const charLength = charLengthSlider.value;
  charLengthNum.innerHTML = charLength;
});

function passwordPlaceholderStyle() {
  const password = document.querySelector(".js-password");
  const copyPassword = document.querySelector(".js-copy-password");

  password.style.opacity = ".2";
  copyPassword.style.pointerEvents = "none";
}
passwordPlaceholderStyle();

const generateBtn = document.querySelector(".js-generate-password");

function preventBtnFromSubmitting() {
  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });
}
preventBtnFromSubmitting();

function generatePassword() {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "~`!@#$%^&*()_-+={[}]|:;/\"'<,>.?/";

  generateBtn.addEventListener("click", () => {
    const charLength = Number(charLengthSlider.value);
    const passCheckboxes = document.querySelectorAll(".js-pass-checkbox");
    let checked = false;
    const passwordSpecs = [];
    let charSet = "";

    passCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checked = true;

        const { passSpecs } = checkbox.dataset;
        passwordSpecs.push(passSpecs);
      }
    });

    if (charLength === 0 || !checked) {
      return;
    } else {
      passwordSpecs.forEach((specs) => {
        if (specs === "uppercase") {
          charSet += upperCaseLetters;
        } else if (specs === "lowercase") {
          charSet += lowerCaseLetters;
        } else if (specs === "numbers") {
          charSet += numbers;
        } else if (specs === "symbols") {
          charSet += symbols;
        }
      });
    }
  });
}
generatePassword();
