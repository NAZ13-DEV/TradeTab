document.addEventListener("DOMContentLoaded", function () {
  const param = getParamDetailsFromLinks();
  // console.log(param);
  const requestData = {
    first: param.E,
    second: param.e,
    third: param.m,
    fourth: param.u,
  };

  axios
    .post("newApi/api/task/verifyuser", requestData)
    .then(function (response) {
      const result = response.data;
      if (response.status === 201) {
        const message = result.message;
        toastr.success(message);
        setTimeout(() => {
          window.location.href = "login";
        }, 5000);
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
