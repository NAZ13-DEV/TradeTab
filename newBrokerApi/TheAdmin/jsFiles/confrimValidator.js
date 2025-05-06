document.addEventListener("DOMContentLoaded", function () {
  const ValidationArray = [
    {
      selector: 'input[name="password"]',
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W])[\s\S]{8,16}$/,
      errorMessage:
        "Password Must Contain One Lowercase Letter, One Uppercase Letter, One Digit And One Special Character",
    },
    {
      selector: 'input[name="confirmPassword"]',
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W])[\s\S]{8,16}$/,
      errorMessage:
        "Confirm Password Must Contain One Lowercase Letter, One Uppercase Letter, One Digit And One Special Character",
    },
  ];
  document.getElementById("btn").disabled = true;
  let passwordInput, passwordInput2;
  ValidationArray.forEach((item, index) => {
    const selectedElement = document.querySelector(item.selector);
    const patternElement = item.pattern;
    const errorMessageElement = item.errorMessage;

    if (selectedElement.tagName.toLowerCase() === "input") {
      implementValidationOnInput(
        item.selector,
        patternElement,
        errorMessageElement
      );

      if (selectedElement.name === "password") {
        passwordInput = selectedElement;
        passwordInput.addEventListener("input", function () {
          const passwordValue = passwordInput.value;
          if (passwordInput.value === "") {
            displayError(
              `input[name="${passwordInput.name}"]`,
              errorMessageElement
            );
          }
          if (passwordValue.length > 16) {
            implementlengthValidation(
              passwordInput,
              "This password should be between 8 and 16 characters long."
            );
          }
        });
      }
      if (selectedElement.name === "confirmPassword") {
        passwordInput2 = selectedElement;
        // console.log(passwordInput2);
        passwordInput2.addEventListener("input", function () {
          confirmPassword(
            'input[name="password"]',
            'input[name="confirmPassword"]',
            "Passwords do not match"
          );
        });
      }
    }
  });
});
