const sessionGetUserID = localStorage.getItem('Adminid');
if (sessionGetUserID) {
  try {
    const data = {
      sessionGetUserID: sessionGetUserID,
    };

    axios
      .post('../api/task/checkAdminSession', data)
      .then(function (response) {
        if (response.status === 201) {
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          if (message === 'invalid') {
            window.location.href = 'login';
            localStorage.removeItem('Adminid');
          }
        } else {
          console.error(error);
        }
      });
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const message = error.response.data.errors[0];
      toastr['error'](message);
    } else {
      console.error(error);
    }
  }
} else {
  window.location.href = 'login';
}

// const interval = setInterval(() => {
//   const statusSession = localStorage.getItem("Login");
//   if (statusSession === "false") {
//     setTimeout(() => {
//       toastr["error"]("your session is expired login to continue");
//       window.location.replace("login");
//       siginEmail.textContent = "Hello, Sign in";
//       clearInterval(interval);
//     }, 5000);
//   }
// }, 1000);
