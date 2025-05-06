// document.addEventListener('DOMContentLoaded', function () {
//   const siteNameElements = document.querySelectorAll('#test');
//   axios
//     .post(`../newApi/api/task/secondTest`)
//     .then((response) => {
//       if (response.status === 201) {
//         const readResult = response.data.message;
//         let numbers = [55, 53, 50, 43, 19, 10, 4];

//         // readResult.map((e) => console.log(e.fullname.split(' ')));
//         const usersnames = readResult.filter(
//           (e) => e.type === 'profit' && e.status === 'verified',
//         );
//         const realUsers = usersnames.filter((e) =>
//           numbers.includes(parseInt(e.userid)),
//         );
//         // console.log(realUsers);
//         realUsers.forEach((e) => {
//           let { amount, userid, transid, balance, status, dateoc, type } = e;
//           const formData = new FormData();
//           formData.append('amount', amount);
//           formData.append('userid', userid);
//           formData.append('transid', transid);
//           formData.append('balance', balance);
//           formData.append('status', status);
//           formData.append('dateoc', dateoc);
//           formData.append('type', type);

//           registerUser(formData);
//         });
//       }
//     })
//     .catch((error) => {
//       if (error.response && error.response.status === 422) {
//         const message = error.response.data.errors[0];
//         Toasty.showToast('danger', message);
//       }
//     });

//   function registerUser(user) {
//     axios
//       .post('../newApi/api/task/AdminMakeProfit', user)
//       .then((response) => {
//         const result = response.data;
//         if (response.status === 201) {
//           const message = result.message;
//           toastr.success(message);
//           setTimeout(() => {
//             window.location.href = 'login';
//           }, 5000);
//         }
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 422) {
//           const message = error.response.data.errors[0];
//           toastr['error'](message);
//         } else {
//           console.error(error);
//         }
//       });
//   }
// });
