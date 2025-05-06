document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('uId');
  const form = document.getElementById('register_val');
  const inputs = form.querySelectorAll('input.form-control-single-number');
  const submitButton = document.getElementById('btn');
  const fetchUser = fetchUserDetailsWithAxios();
  fetchUser.then((response) => {
    if (response.status === 201) {
      const readResult = JSON.parse(response.data.message);
      const {twoFactorUthentication, twoFaAUthCode } = readResult;
     
      if (twoFactorUthentication === 'activated' && twoFaAUthCode !== null) {
        window.location = 'index';
      }
    }
  });
  // Validate inputs and enable/disable submit button
  function validateInputs() {
    let allFilled = true;
    let allNumbers = true;

    inputs.forEach((input) => {
      const value = input.value.trim();
      if (value === '') {
        allFilled = false;
      }
      if (isNaN(value) || value.length !== 1) {
        allNumbers = false;
      }
    });

    submitButton.disabled = !(allFilled && allNumbers);
  }

  function handleInput(event) {
    const input = event.target;
    const value = input.value.trim();

    // If the value is a number and length is 1, move to the next input
    if (!isNaN(value) && value.length === 1) {
      const nextInput = input.nextElementSibling;
      if (nextInput && nextInput.classList.contains('input-field')) {
        nextInput.focus();
      }
    }

    validateInputs();
  }

  inputs.forEach((input) => {
    input.addEventListener('input', handleInput);
  });

  // Initial validation to set button state on page load
  validateInputs();
  // Handle form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    setLoader(submitButton);
    let code = '';
    inputs.forEach((input) => {
      code += input.value.trim();
    });
    // Send Axios request
    axios
      .post('../newApi/api/task/createPinForTwoFaReset', {
        code: code,
        userid: userId,
      })
      .then((response) => {
        if (response.status === 201) {
          const readResult = response.data.message;
          Toasty.showToast('success', readResult);
          setTimeout(() => {
            window.location = 'index';
          }, 4000);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        }
      })
      .finally(function () {
        unSetLoader(submitButton, 'Activate 2-step Verification');
      });
  });
});
