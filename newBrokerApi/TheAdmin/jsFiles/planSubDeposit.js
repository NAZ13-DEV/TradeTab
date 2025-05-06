document.addEventListener('DOMContentLoaded', function () {
  // openSheet();
  const check = document.querySelector('#check');
  const close = document.querySelector('#close');
  const open = document.querySelector('#open');
  const success = document.querySelector('#success');
  check.style.display = 'none';
  open.style.display = 'none';
  const Home = document.querySelector('#content');
  const amount = document.querySelectorAll('.clickable-amount');
  const method = document.querySelectorAll('.clickable-amountt');
  const inputSelector = document.querySelector("input[name='email']");
  const copyButton = document.querySelector('#copy');
  const qr = document.querySelector('#qr');
  const waallet = document.querySelector('#waallet');
  const qrcode = document.querySelector('#qrcode');
  const copy = document.querySelector('#copy');
  const crypt_Fraction = document.querySelector('#crypt_Fraction');
  const amt = document.querySelector('#amt');
  const net = document.querySelector('#net');
  const planName = document.getElementById('planName');
  const companyWallet = '';
  let price, symbol, bitcoinFraction, depositId;
  const addressElement = document.querySelector('.add');
  const infoFromLink = getParamDetailsFromLinks();
  const param = infoFromLink.plan;
  let selectedPlan = '';
  let amountt = 0;
  let amountRange = { min: 0, max: 0 };

  if (param === 'starter') {
    selectedPlan = 'Starter Plan';
    amountRange = { min: 1250, max: 3499 };
    inputSelector.value = amountRange.min;
  } else if (param === 'standard') {
    selectedPlan = 'Standard Plan';
    amountRange = { min: 3500, max: 5299 };
    inputSelector.value = amountRange.min;
  } else if (param === 'professional') {
    selectedPlan = 'Professional Plan';
    amountRange = { min: 5300, max: 28908 };
    inputSelector.value = amountRange.min;
  } else if (param === 'elite') {
    selectedPlan = 'Elite Plan';
    amountRange = { min: 28909, max: 66908 };
    inputSelector.value = amountRange.min;
  } else if (param === 'lifetime') {
    selectedPlan = 'Lifetime Membership';
    amountRange = { min: 66909, max: 66909 };
    inputSelector.value = amountRange.min;
  } else {
    Toasty.showToast(
      'danger',
      `invalid plan choosen kindly choose a valid plan.`,
    );
    setTimeout(() => {
      window.location = 'plan_subscription';
    }, 3000);
  }
  planName.innerHTML = `Choosen Plan:   ${selectedPlan}`;

  // Assuming `userAmount` is the amount input by the user
  // const userAmount = parseInt(prompt('Enter the amount:', '0'), 10);

  // Check if the user amount is within the range
  if (
    inputSelector.value >= amountRange.min &&
    inputSelector.value <= amountRange.max
  ) {
    amountt = inputSelector.value;
  } else {
    alert(
      `Invalid amount for ${selectedPlan}. Please enter an amount between ${amountRange.min} and ${amountRange.max}.`,
    );
  }

  // openSheet();

  let timer;

  // Add click event listener to the copy button

  qr.addEventListener('click', function () {
    waallet.style.display = 'none';
    copy.style.display = 'none';
    qrcode.style.display = 'block';
    qrcode.style.width = '100%';
    qrcode.style.marginLeft = '55px';
    qr.style.display = 'none';
  });
  const countdownElement = document.getElementById('countdown');
  const loaderCircle = document.querySelector('.loader-svg circle:last-child');
  countdownElement.innerText = '00:00:00';
  const circumference = 2 * Math.PI * 30; // radius is 40
  let progress = 0;

  function setLoaderProgress() {
    loaderCircle.style.strokeDasharray = `${progress}, ${
      circumference - progress
    }`;
  }

  function countdown(Deposit) {
    let seconds = 3600;
    const progresss = 3600;
    timer = setInterval(() => {
      progress = ((progresss - seconds) / progresss) * circumference;
      setLoaderProgress();

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      countdownElement.innerText = `${hours
        .toString()
        .padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

      if (seconds === 0) {
        clearInterval(timer);
        clearInterval(fetchEmailStatusIntervalId);

        countdownElement.innerText = '00:00:00';
        axios
          .delete(`../newApi/api/task/deletPlanDeposit/${Deposit}`)
          .then(function (response) {
            if (response.status === 201) {
              const readResult = response.data.message;
              Toasty.showToast('danger', readResult);
            }
          })
          .catch(function (error) {
            if (error.response && error.response.status === 422) {
              const message = error.response.data.errors[0];
              Toasty.showToast('danger', message);
            }
          });
      } else {
        seconds--;
      }

      // Construct the data to be sent

      // }, 1000);
    }, 1000);
  }
  
  function checkStatus(Deposit, usdAmount, bitfr, symboll) {
    const fetchEmailStatusIntervalId = setInterval(function () {
      axios
        .get(`../newApi/api/task/checkPlanDepositPage/${Deposit}`)
        .then((response) => {
          if (response.status === 201) {
            const readResult = response.data.message.depositDetails;
            const { transStatus } = readResult;
            if (transStatus === 'Approved') {
              open.style.display = 'block';
              close.style.display = 'none';
              success.textContent = `your deposit of $${usdAmount}, worth ${bitfr} ${symboll} has been confirmed`;
              setTimeout(function () {
                closeSheet();
              }, 9000);
              setTimeout(function () {
                location.reload();
              }, 10000);
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
            clearInterval(timer);
            clearInterval(fetchEmailStatusIntervalId);
            closeSheet();
            setTimeout(function () {
              location.reload();
            }, 5000);
          }
        });
    }, 30 * 1000);
  }

  const disable = function (value) {
    value.setAttribute('disabled', true);
    value.classList.add('unclickable');
  };
  const enable = function (value) {
    value.setAttribute('disabled', false);
    value.classList.remove('unclickable');
  };
  amount.forEach((amount, i) => {
    amount.addEventListener('click', (e) => {
      e.preventDefault();
      inputSelector.value = amount.textContent;
      method.forEach((value) => {
        enable(value);
      });
    });
  });
  inputSelector.addEventListener('keyup', function (e) {
    method.forEach((value) => {
      enable(value);
    });
  });
  method.forEach((currentmethod, i) => {
    currentmethod.addEventListener('click', (e) => {
      e.preventDefault();

      method.forEach((value) => {
        disable(value);
      });
      if (inputSelector.value === '') {
        method.forEach((value) => {
          enable(value);
        });
        Toasty.showToast(
          'danger',
          'This field cannot be empty. Please enter an amount to deposit',
        );
      } else {
        // notify(
        //   "success",
        //   `you have selected ${currentmethod.textContent.toLowerCase()} as your payment method and you are about to deposit $${
        //     inputSelector.value
        //   }`
        // );
        // Function to fetch cryptocurrency data
        let coins;
        const crypto = currentmethod.textContent;
        axios
          .post('../newApi/api/task/fetchWallet')
          .then((response) => {
            if (response.status === 201) {
              const readResult = response.data.message;
              const { bitcoin, ethereum, id, litecoin, tether } = readResult;

              if (crypto === 'Ethereum') {
                waallet.textContent = ethereum;
                waallet.innerHTML = ethereum;
              }
              if (crypto === 'Bitcoin') {
                waallet.textContent = bitcoin;
                waallet.innerHTML = bitcoin;
              }
              if (crypto === 'Usdt') {
                coins = 'tether';
                waallet.textContent = tether;
                waallet.innerHTML = tether;
              }
              if (crypto === 'Litecoin') {
                waallet.textContent = litecoin;
                waallet.innerHTML = litecoin;
              }
              //
              const address = addressElement.textContent;
              const truncatedAddress = address.substring(0, 20) + '......';
              addressElement.textContent = truncatedAddress;
              function copyWalletDetails() {
                const walletDetails = address;
                const tempTextarea = document.createElement('textarea');
                tempTextarea.value = walletDetails;
                document.body.appendChild(tempTextarea);

                // Select and copy the text from the temporary textarea
                tempTextarea.select();
                document.execCommand('copy');
                // Remove the temporary textarea
                document.body.removeChild(tempTextarea);
                // Optionally, provide visual feedback to the user
                // For example, changing the text of the copy button
                const copyButton = document.querySelector('#copy');
                if (copyButton) {
                  copy.style.display = 'none';
                  check.style.display = 'inline';
                  setTimeout(() => {
                    copy.style.display = 'inline';
                    check.style.display = 'none';
                  }, 2000);
                }
              }
              copyButton.addEventListener('click', copyWalletDetails);
              qrcode.src = `https://quickchart.io/qr?text=${address}`;
            }

            if (crypto === 'Usdt') {
              coins = 'tether';
            } else {
              coins = crypto;
            }

            async function getCryptoData(cryptoSymbol) {
              try {
                const response = await fetch(
                  `https://api.coingecko.com/api/v3/coins/${cryptoSymbol}`,
                );
                const data = await response.json();
                return data;
              } catch (error) {
                console.error('Error fetch3ing cryptocurrency data:', error);
              }
            }

            // Example usage
            const cryptoSymbol = coins.toLowerCase();
            const usdAmount = inputSelector.value;
            getCryptoData(cryptoSymbol).then((data) => {
              price = data.market_data.current_price.usd;
              symbol = data.name;
              bitcoinFraction = usdAmount / price;
              crypt_Fraction.textContent = ` ${bitcoinFraction.toFixed(
                8,
              )} ${data.symbol.toUpperCase()} `;
              // console.log(data);
              amt.textContent = ` ${usdAmount} . USD `;
              net.textContent = `Network . ${symbol}`;
              const sessionGetUserID = localStorage.getItem('uId');
              const requestData = {
                cryptovalue: bitcoinFraction,
                cryptoAmt: usdAmount,
                netWork: symbol,
                sessionGetUserID: sessionGetUserID, 
                companyWallet: addressElement.textContent,
                selectedPlan: selectedPlan,
               
              };
              axios
                .post('../newApi/api/task/plandepositPage', requestData)
                .then((response) => {
                  if (response.status === 201) {
                    const readResult = response.data.message;
                    depositId = readResult.userId;
                    const bitfr = bitcoinFraction.toFixed(8);
                    const symboll = symbol.toUpperCase();
                    if (readResult.message === 'true') {
                      Toasty.showToast(
                        'success',
                        `your deposit has been recorded you are to pay ${usdAmount} usd in value ${bitcoinFraction.toFixed(2)} ${symbol.toUpperCase()}`,
                      );
                    }
                    countdown(depositId);
                    checkStatus(depositId, usdAmount, bitfr, symboll);
                  }
                })
                .catch((error) => {
                  if (error.response && error.response.status === 422) {
                    const message = error.response.data.errors[0];
                    Toasty.showToast('danger', message);
                  }
                });
            });
          })
          .catch((error) => {
            if (error.response && error.response.status === 422) {
              const message = error.response.data.errors[0];
              Toasty.showToast('danger', message);
            }
          });
        openSheet();
      }
    });
  });
});
