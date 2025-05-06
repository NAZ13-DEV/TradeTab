document.addEventListener('DOMContentLoaded', function () {
  const firstFund = document.querySelector('#firstFund');
  const thirdDetail = document.querySelector('#thirdDetail');
  const loaderOverlay = document.querySelector('#loaderOverlay');
  const withdrawAmt = document.querySelector('#withdrawAmt');
  const bnkAmount = document.querySelector('#bnkAmount');
  const crypAmount = document.querySelector('#crypAmount');
  const note = document.querySelector('#note');
  const currency = localStorage.getItem('currency');
  thirdDetail.style.visibility = 'hidden';
  loaderOverlay.style.display = 'none';

  const userDetails = fetchUserDetailsWithAxios();
  userDetails
    .then((res) => {
      const data = JSON.parse(res.data.message);
      const { userBalance, verifyUser } = data;

      if (verifyUser === '' || verifyUser === null ||  verifyUser === 'False' || verifyUser === "Pending") {
        window.location.href = 'index';
        return;
      }
      const button = document.querySelector('#btn');
      function showForm(paymentMode) {
        document.querySelectorAll('.withdrawal-form').forEach(function (form) {
          form.style.display = 'none';
        });
        if (paymentMode === 'Bank') {
          document.getElementById('Bank').style.display = 'block';
        } else if (paymentMode !== '- Select Withdrawal Method -') {
          document.getElementById('Crypto').style.display = 'block';
        }
      }

      function validateForm(event) {
        event.preventDefault(); // Prevent the default form submission
        setLoaderWithCustom(button, 'Loading..');
        var paymentMode = document.getElementById('payment_mode').value;
        var isValid = true;

        if (paymentMode === '- Select Withdrawal Method -') {
          Toasty.showToast('danger', 'Please select a withdrawal method.');
          unSetLoader(button, 'Withdraw');
          isValid = false;
        } else if (paymentMode === 'Bank') {
          var bankname = document.querySelector('input[name="bankname"]').value;
          var bankadd = document.querySelector('input[name="bankadd"]').value;
          var accname = document.querySelector('input[name="accname"]').value;
          var accnum = document.querySelector('input[name="accnum"]').value;
          var routnum = document.querySelector('input[name="routnum"]').value;
          var swcode = document.querySelector('input[name="swcode"]').value;
          var amount = bnkAmount.value;
          if (
            bankname === '' ||
            bankadd === '' ||
            accname === '' ||
            accnum === '' ||
            routnum === '' ||
            swcode === '' ||
            amount === ''
          ) {
            Toasty.showToast(
              'danger',
              'Please fill out all fields in the Bank Transfer form.'
            );
            unSetLoader(button, 'Withdraw');
            isValid = false;
          }
          if (parseFloat(amount) >= parseFloat(userBalance)) {
            Toasty.showToast(
              'danger',
              'cannot proccess withdrawal, insufficient balance'
            );
            unSetLoader(button, 'Withdraw');
            isValid = false;
          }
        } else {
          var wadd = document.querySelector('input[name="wadd"]').value;
          var amount = document.querySelector(
            '#Crypto input[name="amount"]'
          ).value;

          if (wadd === '' || amount === '') {
            Toasty.showToast(
              'danger',
              'Please fill out all fields in the Crypto Withdrawal form.'
            );
            unSetLoader(button, 'Withdraw');
            isValid = false;
          }
          if (parseFloat(amount) >= parseFloat(userBalance)) {
            Toasty.showToast(
              'danger',
              'cannot proccess withdrawal, insufficient balance'
            );
            unSetLoader(button, 'Withdraw');
            isValid = false;
          }
        }

        if (isValid) {
          if (paymentMode === 'Bank') {
            submitBankForm();
          } else {
            submitCryptoForm();
          }
        }
      }

      function submitBankForm() {
        var data = {
          id: localStorage.getItem('uId'),
          accname: document.querySelector('input[name="accname"]').value,
          accnum: document.querySelector('input[name="accnum"]').value,
          bankname: document.querySelector('input[name="bankname"]').value,
          bankadd: document.querySelector('input[name="bankadd"]').value,
          routnum: document.querySelector('input[name="routnum"]').value,
          swcode: document.querySelector('input[name="swcode"]').value,
          amount: bnkAmount.value,
        };

        axios
          .post('../newApi/api/task/bankWithdrawal', data)
          .then(function (response) {
            if (response.status === 201) {
              const readResult = response.data.message;
              if (readResult === 'true') {
                withdrawAmt.textContent = `${currency}${bnkAmount.value}`;
                note.textContent = `Your Withdrawal of ${currency}${formatNumberWithCommasAndDecimal(bnkAmount.value)} Is Being Proccessed`;
                unSetLoader(button, 'Fund Now');
                firstFund.style.display = 'none';
                loaderOverlay.style.display = 'flex';
                setTimeout(() => {
                  loaderOverlay.style.display = 'none';
                }, 6000);
                thirdDetail.style.visibility = 'visible';
              }
            }
            unSetLoader(button, 'Withdraw');
          })
          .catch(function (error) {
            // alert('An error occurred with the bank withdrawal. Please try again.');
            unSetLoader(button, 'Withdraw');
          })
          .finally(function () {
            unSetLoader(button, 'Withdraw');
          });
      }

      function submitCryptoForm() {
        var data = {
          payment_mode: document.querySelector('#payment_mode').value,
          withdrawalAmount: crypAmount.value,
          sessionGetUserID: localStorage.getItem('uId'),
          wallet: document.querySelector('input[name="wadd"]').value,
        };
        axios
          .post('../newApi/api/task/CryptoWithdrawal', data)
          .then(function (response) {
            if (response.status === 201) {
              const readResult = response.data.message;
              if (readResult === 'true') {
                withdrawAmt.textContent = `${currency}${crypAmount.value}`;
                note.textContent = `Your Withdrawal of ${currency}${formatNumberWithCommasAndDecimal(crypAmount.value)} Is Being Proccessed`;
                unSetLoader(button, 'Fund Now');
                firstFund.style.display = 'none';
                loaderOverlay.style.display = 'flex';
                setTimeout(() => {
                  loaderOverlay.style.display = 'none';
                }, 6000);
                thirdDetail.style.visibility = 'visible';
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            unSetLoader(button, 'Withdraw');
          });
      }

      // Show form based on selected payment mode
      document
        .getElementById('payment_mode')
        .addEventListener('change', function () {
          showForm(this.value);
        });

      // Add event listener to the form to call validateForm on submit
      document.querySelector('#form').addEventListener('submit', validateForm);
    })
    .catch(function (error) {
      console.log(error);

      unSetLoader(button, 'Withdraw');
    });
});
