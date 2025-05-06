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
//           (e) => e.type === 'deposit' && e.status === 'verified',
//         );
//         // const realUsers = usersnames.filter((e) => numbers.includes(e.userid));
//         const realUsers = usersnames.filter((e) =>
//           numbers.includes(parseInt(e.userid)),
//         );
//         console.log(realUsers);
//         const cryptoSymbol = 'bitcoin';
//         realUsers.forEach((e) => {
//           let { amount, balance, dateoc, status, transid, type, userid } = e;
//           async function getCryptoData(cryptoSymbol) {
//             try {
//               const response = await fetch(
//                 `https://api.coingecko.com/api/v3/coins/${cryptoSymbol}`,
//               );
//               const data = await response.json();
//               return data;
//             } catch (error) {
//               console.error('Error fetch3ing cryptocurrency data:', error);
//             }
//           }

//           getCryptoData(cryptoSymbol).then((data) => {
//             price = data.market_data.current_price.usd;
//             symbol = data.name;
//             bitcoinFraction = amount / price;
//             // crypt_Fraction.textContent = ` ${bitcoinFraction.toFixed(
//             //   8,
//             // )} ${data.symbol.toUpperCase()} `;
//             // console.log(data);
//             const requestData = {
//               cryptovalue: bitcoinFraction,
//               cryptoAmt: amount,
//               netWork: symbol,
//               sessionGetUserID: userid,
//               companyWallet: '',
//             };
//             axios
//               .post('../newApi/api/task/depositPage', requestData)
//               .then((response) => {
//                 console.log(response);
//                 if (response.status === 201) {
//                     const readResult = response.data.message;
//                     depositId = readResult.userId;
//                     const bitfr = bitcoinFraction.toFixed(8);
//                     const symboll = symbol.toUpperCase();
//                     if (readResult.message === 'true') {
                     
//                     }
//                     countdown(depositId);
//                     checkStatus(depositId, usdAmount, bitfr, symboll);
//                 }
//               })
//               .catch((error) => {
//                 if (error.response && error.response.status === 422) {
//                   const message = error.response.data.errors[0];
//                   Toasty.showToast('danger', message);
//                 }
//               });
//           });
//         });
//       }
//     })
//     .catch((error) => {
//       if (error.response && error.response.status === 422) {
//         const message = error.response.data.errors[0];
//         Toasty.showToast('danger', message);
//       }
//     });

//     // function registerUser(user) {
//     //   axios
//     //     .post('../newApi/api/task/regUser', user)
//     //     .then((response) => {
//     //       const result = response.data;
//     //       if (response.status === 201) {
//     //         const message = result.message;
//     //         toastr.success(message);
//     //         setTimeout(() => {
//     //           window.location.href = 'login';
//     //         }, 5000);
//     //       }
//     //     })
//     //     .catch((error) => {
//     //       if (error.response && error.response.status === 422) {
//     //         const message = error.response.data.errors[0];
//     //         toastr['error'](message);
//     //       } else {
//     //         console.error(error);
//     //       }
//     //     });
//     // }
// });
