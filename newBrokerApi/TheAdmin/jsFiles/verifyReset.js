document.addEventListener("DOMContentLoaded", function () {
  const param = getParamDetailsFromLinks();
  // console.log(param);
  const requestData = {
    token: param.T,
    email: param.m,
    eid: param.n,
  };

  axios
    .post("newApi/api/task/verifyreset", requestData)
    .then(function (response) {
      console.log(response);
      const result = response.data.message;
      if (response.status === 201) {
        const message = result.message;
        const email = result.email;
        toastr.success(message);

        window.location.href = `changePassword?e=${email}`;
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        toastr["error"](message);
      } else {
        console.error(error);
      }
    });
});
