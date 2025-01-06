const charLengthSlider = document.querySelector(".js-char-length-slider");
const charLengthNum = document.querySelector(".js-char-length-number");

charLengthSlider.addEventListener("input", () => {
  const charLength = charLengthSlider.value;
  charLengthNum.innerHTML = charLength;

  charLengthZero();
});

function charLengthZero() {
  const charLength = Number(charLengthSlider.value);
  const password = document.querySelector(".js-password");
  const copyPassword = document.querySelector(".js-copy-password");

  if (charLength === 0) {
    password.style.opacity = ".2";
    copyPassword.style.pointerEvents = "none";
  } else {
    password.style.opacity = "1";
    copyPassword.style.pointerEvents = "auto";
  }
}
charLengthZero();
