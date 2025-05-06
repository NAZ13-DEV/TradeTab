document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('uId');
  const form = document.getElementById('register_val');
 const oldPinInput = document.getElementById('oldpin');
  const newPinInput = document.getElementById('newpin');
  const submitButton = document.getElementById('btn');
  const fetchUser = fetchUserDetailsWithAxios();
 

   // Disable submit button by default
   submitButton.disabled = true;

   // Validate inputs and enable/disable submit button
   function validateInputs() {
     const oldPin = oldPinInput.value.trim();
     const newPin = newPinInput.value.trim();

     const isValid =
       oldPin.length === 4 &&
       newPin.length === 4 &&
       /^\d{4}$/.test(oldPin) &&
       /^\d{4}$/.test(newPin);

     submitButton.disabled = !isValid;
   }

   // Add event listeners to input fields
   oldPinInput.addEventListener('input', validateInputs);
   newPinInput.addEventListener('input', validateInputs);

   // Prevent non-numeric input
   function enforceNumericInput(event) {
     const char = String.fromCharCode(event.which);
     if (!/\d/.test(char)) {
       event.preventDefault();
     }
   }

   oldPinInput.addEventListener('keypress', enforceNumericInput);
   newPinInput.addEventListener('keypress', enforceNumericInput);


  // Handle form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    setLoader(submitButton);
    const formdata = new FormData(this);
    formdata.append('userid', userId);
    // Send Axios request
    axios
      .post('../newApi/api/task/changeTwoFaReset', formdata)
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
        unSetLoader(submitButton, 'change 2-step Verification');
      });
  });
});
