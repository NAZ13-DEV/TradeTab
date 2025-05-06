$(document).ready(function () {
  const ValidationArray = [
    {
      selector: 'input[name="first_name"]',
      pattern: /^[a-zA-Z]+$/,
      errorMEssage: 'First Name Must Contain No Space',
    },
    {
      selector: 'input[name="last_name"]',
      pattern: /^[a-zA-Z]+$/,
      errorMEssage: 'Last Name Must Contain No Space',
    },
    {
      selector: 'input[name="house_address"]',
      pattern: /^[a-zA-Z0-9\s,.'-]+$/,
      errorMEssage: 'House Address Is Invalid',
    },
    {
      selector: 'input[name="email"]',
      pattern: /^\S+@\S+\.\S+$/,
      errorMEssage: 'Email Address Is Invalid',
    },

    {
      selector: 'input[name="username"]',
      pattern: /^[a-zA-Z0-9_-]{3,16}$/,
      errorMEssage:
        'Username Must Be Between 3 And 16 Characters And Special Characters Are Not Allowed Except The _',
    },
    {
      selector: 'input[name="secure_Answer"]',
      pattern: /^[a-zA-Z0-9\s,.'-]+$/,
      errorMEssage: 'Answer To Your Security Question Is Invalid',
    },
    {
      selector: 'input[name="phone_num"]',
      pattern: /^\+\d{10,13}$/,
      errorMEssage: 'Invalid Phone Number Format ',
    },
    {
      selector: 'input[name="password"]',
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W])[\s\S]{8,16}$/,
      errorMEssage:
        'Password Must Contain One Lowercase Letter, One Uppercase Letter, One Digit And One Special Character ',
    },
    {
      selector: 'input[name="confirmPassword"]',
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_\W])[\s\S]{8,16}$/,
      errorMEssage:
        'Confirm Password Must Contain One Lowercase Letter, One Uppercase Letter, One Digit And One Special Character  ',
    },
    {
      selector: 'input[name="dob"]',
      pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      errorMEssage: 'Date Is Invalid',
    },
    {
      selector: 'select[name="gender"]',
    },
    {
      selector: 'select[name="country"]',
    },
    {
      selector: 'select[name="state"]',
    },
    {
      selector: 'input[name="security_question"]',
      pattern: /^[a-zA-Z0-9\s,.'-]+$/,
      errorMEssage: 'Security Question Is Invalid',
    },
  ];
  let selected;
  ValidationArray.forEach(function (item) {
    const selectedElement = document.querySelector(item.selector);
    if (selectedElement.tagName.toLowerCase() === 'select') {
      implementValidationChange(selectedElement);
    } else if (selectedElement.tagName.toLowerCase() === 'input') {
      implementValidationOnInput(
        selectedElement,
        item.pattern,
        item.errorMEssage,
      );
    }
    if (selectedElement.name === 'password') {
      selected = selectedElement;
      selectedElement.addEventListener('input', function () {
        const passwordValue = selectedElement.value;
        if (passwordValue === '') {
          implementValidationOnInput(
            selectedElement,
            item.pattern,
            item.errorMEssage,
          );
        } else if (passwordValue.length >= 8 && passwordValue.length <= 16) {
          implementValidationOnInput(
            selectedElement,
            item.pattern,
            item.errorMEssage,
          );
        } else if (passwordValue.length > 16) {
          implementLengthValidation(
            selectedElement,
            'This password should be between 8 and 16 characters long.',
          );
        } else {
          confirmPassword(
            selectedElement,
            document.querySelector('input[name="confirmPassword"]'),
            'Passwords do not match',
          );
        }
      });
    }

    if (selectedElement.name === 'confirmPassword') {
      selectedElement.addEventListener('input', function () {
        const confirmPasswordValue = selectedElement.value;
        if (confirmPasswordValue === '') {
          implementValidationOnInput(
            selectedElement,
            item.pattern,
            item.errorMEssage,
          );
        } else if (
          confirmPasswordValue.length >= 8 &&
          confirmPasswordValue.length <= 16
        ) {
          implementValidationOnInput(
            selectedElement,
            item.pattern,
            item.errorMEssage,
          );
        } else if (confirmPasswordValue.length > 16) {
          implementLengthValidation(
            selectedElement,
            'This confirm password should be between 8 and 16 characters long.',
          );
        } else {
          confirmPassword(selected, selectedElement, 'Passwords do not match');
        }
      });
    }
  });
});
