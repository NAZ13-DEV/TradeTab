const showError = function (selectedElement, errorOutput) {
  const element = document.querySelector(selectedElement);
  // console.log(element);
  // Check if the element exists
  if (!element || !(element instanceof HTMLElement)) {
    console.error("Element is invalid:", element);
    return;
  }

  // Create error message element
  message = element.nextElementSibling;
  if (!message || !message.classList.contains("errorMessage")) {
    message = document.createElement("p");
    message.classList.add("errorMessage");
    if (element.nextElementSibling) {
      element.parentNode.insertBefore(message, element.nextElementSibling);
    } else {
      element.parentNode.appendChild(message); // If there is no next sibling, append the message to the parent
    }
  }

  // Update element state based on value
  // if (element.value === "") {
  element.id = "errorOccurred";

  message.textContent = errorOutput;

  // } else {
  //   element.id = "successOccurred";
  //   if (message && message.parentNode) {
  //     message.parentNode.removeChild(message);
  //   }
  // }
};

function hideError(inputElement) {
  document.querySelector(inputElement).id = "successOccurred"; // Remove border style
  var nextSibling = document.querySelector(inputElement).nextElementSibling; // Get the next sibling element
  if (nextSibling && nextSibling.classList.contains("errorMessage")) {
    // Check if the next sibling has the class "errorMessage"
    nextSibling.remove(); // Remove the error message element
  }
}

const implementValidationOnInput = function (
  inputElement,
  pattern,
  errorMessage,
  button
) {
  document.querySelector(inputElement).addEventListener("input", function () {
    const value = this.value;

    const test = pattern.test(value);
    // console.log(test);
    if (test === true) {
      hideError(inputElement);
      button.removeAttribute("disabled", "disabled");
    }
    if (test === false) {
      showError(inputElement, errorMessage);
      button.setAttribute("disabled", "disabled");
    }
  });
};

function handlePasswordInput(
  passwordInput,
  patternElement,
  errorMEssageElement
) {
  passwordInput.on("input", function () {
    const passwordValue = passwordInput.val();

    if (passwordInput.val() === "") {
      // Handle the case when the password is empty
      implementValidationOnInput(
        passwordInput,
        patternElement,
        errorMEssageElement
      );
    } else if (passwordValue.length >= 8 && passwordValue.length <= 16) {
      // Handle the case when the password length is between 8 and 16
      implementValidationOnInput(
        passwordInput,
        patternElement,
        errorMEssageElement
      );
    } else if (passwordValue.length > 16) {
      showError(selectedElement, errorOutput);
    } else {
      confirmPassword(
        'input[name="password"]',
        'input[name="confirmPassword"]',
        "Passwords do not match"
      );
    }
  });
}
function getParamDetailsFromLinks() {
  const query = window.location.search;
  const searchParams = new URLSearchParams(query);
  // console.log(searchParams.entries());
  const obj = {};

  for (const [key, value] of searchParams.entries()) {
    obj[key] = value;
  }

  return obj;
}
