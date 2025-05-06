// axios
//   .get(`newApi/api/task/viewoneinfo`)
//   .then(function (response) {
//     const result = response.data.message;
//     if (response.status === 201) {
//       const paymentMethods = result.meth;
//       console.log(paymentMethods);
//       // paymentMethods.forEach((element) => {
//       //
//       // });
//     }
//   })
//   .catch(function (error) {
//     if (error.response && error.response.status === 422) {
//       const message = error.response.data.errors[0];
//       toastr["error"](message);
//     } else {
//       console.error(error);
//     }
//   });
