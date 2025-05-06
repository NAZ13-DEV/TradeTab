document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById('btn');
  const registerForm = document.getElementById('register_val');

  const checkFormValidity = () => {
    const inputs = registerForm.querySelectorAll(
      'input[type="text"], input[type="password"]',
    );
    let allFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== '',
    );
    // submitBtn.disabled = !allFilled;
  };

  checkFormValidity();
  registerForm.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', checkFormValidity);
  });
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    checkFormValidity();
    setLoaderWithCustom(submitBtn, 'Loading..');
    const LoginData = new FormData(this);
    axios
      .post('./newApi/api/task/ProcessLog', LoginData)
      .then(function (response) {
        if (response.status === 201) {
          const readResultAsJson = JSON.parse(response.data.message);
          const userDetails = readResultAsJson.user;

          const { id, UserLogin, AllowLogin, currency } = userDetails;
          if (AllowLogin === 'disabled') {
            Toasty.showToast(
              'danger',
              'an error occurred while trying to log you in try contacting support ',
            );
            return
          }
          // console.log(userDetails);
          if(UserLogin === "True") {
            localStorage.setItem('uId', id);
            localStorage.setItem('currency', currency);
            Toasty.showToast('success','your account has been logged in successfully');
            const getUrl = localStorage.getItem('url') ?? null;
            const e = getUrl ? getUrl : 'dashboard/index';
            localStorage.removeItem('url');
            setInterval(function () {
              window.location.href = e;
            }, 4000);
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
        unSetLoader(submitBtn, 'Sign in');
      });
  });
});
