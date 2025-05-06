document.addEventListener("DOMContentLoaded", function () {
  const validationArray = [
    {
      selector: 'input[name="email"]',
      pattern: /^\S+@\S+\.\S+$/,
      errorMessage: "Email Address Is Invalid",
    },
    {
      selector: 'input[name="password"]',
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W])[\s\S]{8,16}$/,
      errorMessage:
        "Password Must Contain One Lowercase Letter, One Uppercase Letter, One Digit And One Special Character ",
    },
  ];

  validationArray.forEach((item) => {
    const selectedElement = document.querySelector(item.selector);
    const patternElement = item.pattern;
    const errorMessageElement = item.errorMessage;
    if (selectedElement.tagName === "INPUT") {
      implementValidationOnInput(
       selectedElement,
        patternElement,
        errorMessageElement
      );

      if (selectedElement.name === "password") {
        const passwordInput = selectedElement;
        passwordInput.addEventListener("input", function () {
          const passwordValue = passwordInput.value;

          if (passwordInput.value === "") {
            implementValidationOnInput(
             selectedElement,
              patternElement,
              errorMessageElement
            );
          } else if (passwordValue.length >= 8 && passwordValue.length <= 16) {
            implementValidationOnInput(
             selectedElement,
              patternElement,
              errorMessageElement
            );
          } else if (passwordValue.length > 16) {
            implementlengthValidation(
              selectedElement,
              "This password should be between 8 and 16 characters long."
            );
          }
        });
      }
    }
  });
});
