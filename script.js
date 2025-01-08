const charLengthSlider = document.querySelector(".js-char-length-slider");
const charLengthNum = document.querySelector(".js-char-length-number");
const passwordDisplay = document.querySelector(".js-password");
const copyPassword = document.querySelector(".js-copy-password");
const passCheckboxes = document.querySelectorAll(".js-pass-checkbox");

charLengthSlider.addEventListener("input", () => {
  const charLength = charLengthSlider.value;
  charLengthNum.innerHTML = charLength;
});

function passwordPlaceholderStyle() {
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

function checkCheckedCheckboxesWithPassLength() {
  let numberOfCheckedCheckboxes = 0;

  passCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      numberOfCheckedCheckboxes++;
    }
  });

  return numberOfCheckedCheckboxes;
}

function copyToClipboard() {
  copyPassword.addEventListener("click", async () => {
    await navigator.clipboard.writeText(passwordDisplay.innerText);

    copyPassword.classList.add("copied");
  });
}
copyToClipboard();

function generatePassword() {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "~`!@#$%^&*()_-+={[}]|:;/\"'<,>.?/";

  generateBtn.addEventListener("click", () => {
    const charLength = Number(charLengthSlider.value);
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
      alert(
        "Please input a character length greater than 0 and check at least 1 checkbox."
      );
      return;
    } else {
      const numberOfCheckedCheckboxes = checkCheckedCheckboxesWithPassLength();

      if (!(numberOfCheckedCheckboxes <= charLength)) {
        alert(
          "The number of checked critera has to be less than the length of the password. Please check again."
        );
        return;
      }

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

      passwordDisplay.innerText = passwordString;
      passwordDisplay.style.opacity = "1";
      copyPassword.style.pointerEvents = "auto";
      copyPassword.classList.remove("copied");

      const passwordScore = checkPasswordStrength(passwordString);
      stylePasswordStrength(passwordScore);
    }
  });
}
generatePassword();

function checkPasswordStrength(passwordString) {
  let score = 0;

  if (/[~`!@#$%^&*()_+={[}\]|:;/\"'<,>.?/-]/g.test(passwordString)) {
    score += 10;
  }
  if (/[0-9]/g.test(passwordString)) {
    score += 10;
  }

  if (passwordString.length < 8) {
    score = 0;
  } else if (passwordString.length >= 8 && passwordString.length <= 12) {
    score += 10;
  } else if (passwordString.length > 12) {
    score += 20;
  }

  return score;
}

function stylePasswordStrength(passwordScore) {
  const passwordStrengthText = document.querySelector(".js-pass-strength-text");
  const bars = document.querySelectorAll(".js-bar");
  const firstBar = document.querySelector(".js-first-bar");
  const secondBar = document.querySelector(".js-second-bar");
  const thirdBar = document.querySelector(".js-third-bar");
  const fourthBar = document.querySelector(".js-fourth-bar");

  bars.forEach((bar) => {
    bar.style.backgroundColor = "transparent";
  });

  if (passwordScore < 10) {
    passwordStrengthText.innerText = "Too weak!";
    firstBar.style.backgroundColor = "#F64A4A";
  } else if (passwordScore < 20) {
    passwordStrengthText.innerText = "Weak";
    firstBar.style.backgroundColor = "#FB7C58";
    secondBar.style.backgroundColor = "#FB7C58";
  } else if (passwordScore < 40) {
    passwordStrengthText.innerText = "Medium";
    firstBar.style.backgroundColor = "#F8CD65";
    secondBar.style.backgroundColor = "#F8CD65";
    thirdBar.style.backgroundColor = "#F8CD65";
  } else if (passwordScore >= 40) {
    passwordStrengthText.innerText = "Strong";
    firstBar.style.backgroundColor = "#A4FFAF";
    secondBar.style.backgroundColor = "#A4FFAF";
    thirdBar.style.backgroundColor = "#A4FFAF";
    fourthBar.style.backgroundColor = "#A4FFAF";
  }
}
