document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('uId');
  const logout = document.querySelectorAll('#logout');
  logout.forEach((e) => {
    e.addEventListener('click', function (el) {
      axios
        .post(`../newApi/api/task/logoutUser`)
        .then((response) => {
          if (response.status === 201) {
            const readResult = response.data.message;
            if (readResult === 'true') {
              const getLInk = window.location.href;
              localStorage.setItem('url', getLInk);
              window.location.href = '../login';
            }
          }
          
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          }
        });
    });
  });
});
