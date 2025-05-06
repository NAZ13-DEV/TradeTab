document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById('btn');
  const registerForm = document.getElementById('register_val');
  const checkFormValidity = () => {
    const inputs = registerForm.querySelectorAll('input[type="email"]');
    let allFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== '',
    );
    submitBtn.disabled = !allFilled;
  };

  checkFormValidity();
  registerForm.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', checkFormValidity);
  });
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    checkFormValidity();

    setLoaderWithCustom(submitBtn, 'Loading..');

    const ProcessResetData = new FormData(this);
    axios
      .post('../newApi/api/task/ProcessReset', ProcessResetData)
      .then(function (response) {
        if (response.status === 201) {
          const readResult = response.data.message;
          const status = readResult;
          if (status === 'true') {
          Toasty.showToast('success', 'a reset link has been sent to your email');
 
          }
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        }
      })
      .finally(function () {
        unSetLoader(submitBtn, 'Change Password');
      });
  });
});
// Lolwaswas5_
