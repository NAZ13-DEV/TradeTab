document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.querySelector('.register_val');
  const submitBtn = document.querySelector('.btn-loader');
  const checkbox = document.getElementById('tc');
  // const referral = document.getElementById('referral');
  // const wholereferal = document.getElementById('wholereferal');
  // const getUrl = getParamDetailsFromLinks();
  // const gottenparam = getUrl.u ?? null;

  // console.log(registerForm,submitBtn,);

  // if (gottenparam !== null) {
  //   referral.value = gottenparam;
  // } else {
  //   referral.value = 'null';
  //   wholereferal.style.display = 'none';
  // }

  const checkFormValidity = () => {
    const inputs = registerForm.querySelectorAll(
      'input[type="text"], input[type="email"], input[type="date"],input[type="number"] , input[type="radio"], textarea , input[type="password"], input[type="checkbox"] , select',
    );
 
    let allFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== '',
    );
    let termsAccepted = checkbox.checked;

    submitBtn.disabled = !(termsAccepted);
  };

  registerForm.querySelectorAll('input, select').forEach((input) => {
    input.addEventListener('input', checkFormValidity);
  });

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    setLoaderWithCustom(submitBtn, 'Loading..');
    checkFormValidity();

    if (!submitBtn.disabled) {
      const data = new FormData(registerForm);
 
      axios
        .post('./newApi/api/task/regUser', data)
        .then(function (response) {
          if (response.status === 201) {
            const message = response.data.message.status;
            const userMail = response.data.message.email;
            if (message === 'true') {
              Toasty.showToast(
                'success',
                'your account registration is successful',
              );
              setTimeout(() => {
                const useEmail  = document.querySelector('#email');
                window.location.href=`verify?e=${useEmail.value}`;
              }, 3000);
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
          unSetLoader(submitBtn, 'Sign up');
        });
    }
  });

  // Initial check on load
  checkFormValidity();
});
