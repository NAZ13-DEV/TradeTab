document.addEventListener('DOMContentLoaded', function () {
  const validationArray = [
    {
      selector: 'input[name="email"]',
      pattern: /^\S+@\S+\.\S+$/,
      errorMessage: 'Email Address Is Invalid',
    },
  ];

  validationArray.forEach((item) => {
    const selectedElement = document.querySelector(item.selector);
    const patternElement = item.pattern;
    const errorMessageElement = item.errorMessage;
    if (selectedElement.tagName === 'INPUT') {
      implementValidationOnInput(
        selectedElement,
        patternElement,
        errorMessageElement,
      );
    }
  });
});
