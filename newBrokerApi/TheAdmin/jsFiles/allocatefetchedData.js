const sessionGetUserID = localStorage.getItem('uId');
if (sessionGetUserID) {
  try {
    if (sessionGetUserID) {
      const checkSessionData = { sessionGetUserID: sessionGetUserID };
      axios
        .post(
          '../newApi/api/task/checkSession',
          checkSessionData,
        )
        .then(function (response) {
          if (response.status === 201) {
            const message = response.data.message;
            if (message === 'valid session') {
            }
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
            const getLInk = window.location.href;
            localStorage.setItem('url', getLInk);
            setTimeout(() => {
              window.location.href = 'authentication-login-cover';
            }, 4000);
          }
        });
    }
  } catch (error) {
    console.log(error);
  }
} else {
  window.location.href = 'authentication-login-cover';
}
