const charLengthSlider = document.querySelector(".js-char-length-slider");
const charLengthNum = document.querySelector(".js-char-length-number");

charLengthSlider.addEventListener("input", () => {
  const charLength = charLengthSlider.value;
  charLengthNum.innerHTML = charLength;
});

function passwordPlaceholderStyle() {
  const passwordDisplay = document.querySelector(".js-password");
  const copyPassword = document.querySelector(".js-copy-password");

  passwordDisplay.style.opacity = ".2";
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

function replaceRandomChar(
  passwordSpecs,
  specs,
  specsArray,
  passwordString,
  password,
  previousRandomIndices,
  uppercaseLettersArray,
  lowercaseLettersArray,
  numbersArray,
  symbolsArray
) {
  if (passwordSpecs.includes(specs)) {
    const containsSpecs = specsArray.some((letter) =>
      passwordString.includes(letter)
    );

    if (!containsSpecs) {
      const categories = {
        uppercase: [],
        lowercase: [],
        numbers: [],
        symbols: [],
      };

      password.forEach((char, index) => {
        if (uppercaseLettersArray.includes(char)) {
          categories.uppercase.push(index);
        } else if (lowercaseLettersArray.includes(char)) {
          categories.lowercase.push(index);
        } else if (numbersArray.includes(char)) {
          categories.numbers.push(index);
        } else if (symbolsArray.includes(char)) {
          categories.symbols.push(index);
        }
      });

      const uniqueIndices = [];

      if (categories.uppercase.length === 1) {
        uniqueIndices.push(categories.uppercase[0]);
      }
      if (categories.lowercase.length === 1) {
        uniqueIndices.push(categories.lowercase[0]);
      }
      if (categories.numbers.length === 1) {
        uniqueIndices.push(categories.numbers[0]);
      }
      if (categories.symbols.length === 1) {
        uniqueIndices.push(categories.symbols[0]);
      }

      let randomPassIndex = Math.floor(Math.random() * password.length);

      while (
        previousRandomIndices.includes(randomPassIndex) ||
        uniqueIndices.includes(randomPassIndex)
      ) {
        randomPassIndex = Math.floor(Math.random() * password.length);
      }

      previousRandomIndices.push(randomPassIndex);

      const randomCharIndex = Math.floor(Math.random() * specsArray.length);

      password[randomPassIndex] = specsArray[randomCharIndex];
    }
  }
}

function generatePassword() {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
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
          charSet += uppercaseLetters;
        } else if (specs === "lowercase") {
          charSet += lowercaseLetters;
        } else if (specs === "numbers") {
          charSet += numbers;
        } else if (specs === "symbols") {
          charSet += symbols;
        }
      });

      const password = [];

      for (let i = 0; i < charLength; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);

        password.push(charSet[randomIndex]);
      }

      let passwordString = password.join("");
      console.log(passwordString);

      const uppercaseLettersArray = uppercaseLetters.split("");
      const lowercaseLettersArray = lowercaseLetters.split("");
      const numbersArray = numbers.split("");
      const symbolsArray = symbols.split("");

      let previousRandomIndices = [];

      replaceRandomChar(
        passwordSpecs,
        "uppercase",
        uppercaseLettersArray,
        passwordString,
        password,
        previousRandomIndices,
        uppercaseLettersArray,
        lowercaseLettersArray,
        numbersArray,
        symbolsArray
      );

      replaceRandomChar(
        passwordSpecs,
        "lowercase",
        lowercaseLettersArray,
        passwordString,
        password,
        previousRandomIndices,
        uppercaseLettersArray,
        lowercaseLettersArray,
        numbersArray,
        symbolsArray
      );

      replaceRandomChar(
        passwordSpecs,
        "numbers",
        numbersArray,
        passwordString,
        password,
        previousRandomIndices,
        uppercaseLettersArray,
        lowercaseLettersArray,
        numbersArray,
        symbolsArray
      );

      replaceRandomChar(
        passwordSpecs,
        "symbols",
        symbolsArray,
        passwordString,
        password,
        previousRandomIndices,
        uppercaseLettersArray,
        lowercaseLettersArray,
        numbersArray,
        symbolsArray
      );

      passwordString = password.join("");
      console.log(passwordString);
    }
  });
}
generatePassword();
