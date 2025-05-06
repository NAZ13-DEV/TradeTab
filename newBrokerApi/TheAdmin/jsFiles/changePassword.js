document.addEventListener('DOMContentLoaded', function () {
  const email = document.querySelector('#email');
  const param = getParamDetailsFromLinks();
  email.value = param.email;
  email.setAttribute('readonly', 'readonly');
  const submitBtn = document.querySelector('#btn');
  const form = document.querySelector('#change_password_form');
  const checkFormValidity = () => {
    const inputs = form.querySelectorAll(
      'input[type="email"], input[type="password"]',
    );
    let allFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== '',
    );
    submitBtn.disabled = !allFilled;
  };
  checkFormValidity();
  form.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', checkFormValidity);
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setLoaderWithCustom(submitBtn, 'Loading..');
    setTimeout(function () {
      const formData = new FormData(form);

      axios
        .post('./newApi/api/task/changePassword', formData)
        .then(function (response) {
          const result = response.data;
          if (response.status === 201) {
            const message = result.message;
            if (message === 'true') {
              Toasty.showToast(
                'success',
                'your password has been changed successfully',
              );

              setTimeout(() => {
                window.location.href = 'signin';
              }, 2000);
            }
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
            unSetLoader(submitBtn, 'Change Password');
          } else {
            console.error(error);
          }
        })
        .finally(function () {
          unSetLoader(submitBtn, 'Change Password');
        });
    }, 2500);
  });
});
// Lolwaswas5_
