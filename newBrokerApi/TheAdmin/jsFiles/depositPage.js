document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#form');
  const amount = document.querySelector("#outlined");
  const button = document.querySelector("#btn");
  const wallet = document.querySelector("#refUrlB");
  const method = document.querySelector("select[name='payment_mode']");
  const depAmt = document.querySelectorAll("#depAmt");
  const coinVal = document.querySelector("#coinVal");
  const coinTy = document.querySelector("#coinTy");
  const paymo = document.querySelector("#paymo");
  const refUrl = document.querySelector("#refUrl");
  const coinImg = document.querySelector("#coinImg");
  const firstFund = document.querySelector("#firstFund");
  const seconfDetail = document.querySelector("#seconfDetail");
  const loaderOverlay = document.querySelector("#loaderOverlay");
  const Send = document.querySelector("#Send");
  const fileUploadForm = document.querySelector("#fileUploadForm");
  const upload = document.querySelector("#upload");
  const note = document.querySelector("#note");
  const thirdDetail = document.querySelector("#thirdDetail");
  const fileUploadSection = document.querySelector("#fileUploadSection");
  const currency = localStorage.getItem('currency')
  // console.log(fileUploadForm);


  const userDetails = fetchUserDetailsWithAxios();
  userDetails
    .then((res) => {
      const data = JSON.parse(res.data.message);
      const { verifyUser } = data;

      if (verifyUser === '' || verifyUser === null ||  verifyUser === 'False' || verifyUser === "Pending") {
        window.location.href = 'index';
        return;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  seconfDetail.style.visibility = "hidden";
  fileUploadSection.style.visibility = "hidden";
  thirdDetail.style.visibility = "hidden";
  loaderOverlay.style.display = "none";
  let price, symbol, bitcoinFraction;

  const getUrl = getParamDetailsFromLinks();
  const gottenparam = getUrl.plan ?? null;

  if (gottenparam !== null) {
    try {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        setLoaderWithCustom(button, 'Loading..');
        setTimeout(() => {
          if (amount.value === '') {
            Toasty.showToast(
              'danger',
              'amount field cannot be empty. Please enter an amount to deposit',
            );
            unSetLoader(button, 'Fund Now');
          }
          if (method.value === '') {
            Toasty.showToast(
              'danger',
              'Deposit field cannot be empty. Please choose a method  to deposit',
            );
            unSetLoader(button, 'Fund Now');
          }
          const depositMethod = method.value;
          coinTy.textContent = `${method.value.toUpperCase()} ADDRESS`;
          paymo.value = `${method.value.toUpperCase()}`;
          // console.log(depositMethod);

          axios
            .post('../newApi/api/task/fetchWallet')
            .then((response) => {
              if (response.status === 201) {
                const readResult = response.data.message;
                const { bitcoin, ethereum, tether, bnb, solana, usdc, xrp, dogecoin, toncoin, cardano, tron, avalanche } = readResult;


                if (depositMethod === 'ethereum') {
                  wallet.value = ethereum;
                  coinImg.src = "ethereum.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${ethereum}`;
                }
                if (depositMethod === 'bitcoin') {
                  wallet.value = bitcoin;
                  coinImg.src = "bitcoin.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${bitcoin}`;
                }
                if (depositMethod === 'tether') {
                  wallet.value = tether;
                  coinImg.src = "tether.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${tether}`;
                }
                if (depositMethod === 'binancecoin') {
                  wallet.value = bnb;
                  coinImg.src = "bnb.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${bnb}`;
                }
                if (depositMethod === 'solana') {
                  wallet.value = solana;
                  coinImg.src = "solana.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${solana}`;
                }
                if (depositMethod === 'usd-coin') {
                  wallet.value = usdc;
                  coinImg.src = "usdc.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${usdc}`;
                }
                if (depositMethod === 'ripple') {
                  wallet.value = xrp;
                  coinImg.src = "xrp.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${xrp}`;
                }
                if (depositMethod === 'dogecoin') {
                  wallet.value = dogecoin;
                  coinImg.src = "dogecoin.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${dogecoin}`;
                }
                if (depositMethod === 'the-open-network') {
                  wallet.value = toncoin;
                  coinImg.src = "toncoin.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${toncoin}`;
                }
                if (depositMethod === 'cardano') {
                  wallet.value = cardano;
                  coinImg.src = "cardano.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${cardano}`;
                }
                if (depositMethod === 'tron') {
                  wallet.value = tron;
                  coinImg.src = "tron.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${tron}`;
                }
                if (depositMethod === 'avalanche-2') {
                  wallet.value = avalanche;
                  coinImg.src = "avalanche.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${avalanche}`;
                }

                coins = depositMethod;
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
                const usdAmount = amount.value;
                getCryptoData(cryptoSymbol).then((data) => {
                  price = data.market_data.current_price.usd;
                  symbol = data.name;
                  bitcoinFraction = usdAmount / price;
                  depAmt.forEach(e => {
                    e.textContent = ` ${currency}${usdAmount}`;
                  })
                  note.textContent = `Please ensure your payment was made to this ${cryptoSymbol} Wallet ${wallet.value}`;
                  coinVal.textContent = `with a value of ${bitcoinFraction.toFixed(4)} ${data.symbol.toUpperCase()} `;
                  const sessionGetUserID = localStorage.getItem('uId');
                  const requestData = {
                    cryptovalue: bitcoinFraction,
                    cryptoAmt: usdAmount,
                    netWork: symbol,
                    sessionGetUserID: sessionGetUserID,
                    companyWallet: wallet.value,
                    selectedPlan: gottenparam
                  };
                  axios
                    .post('../newApi/api/task/plandepositPage', requestData)
                    .then((response) => {
                      if (response.status === 201) {
                        const readResult = response.data.message;
                        depositId = readResult.userId;
                        if (readResult.message === 'true') {
                          // Toasty.showToast(
                          //   'success',
                          //   `your deposit has been recorded you are to pay ${usdAmount} ${currency} in value ${bitcoinFraction.toFixed(2)} ${symbol.toUpperCase()}`,
                          // );
                          unSetLoader(button, 'Fund Now');
                          firstFund.style.display = 'none';
                          loaderOverlay.style.display = 'flex';
                          setTimeout(() => {
                            loaderOverlay.style.display = 'none';
                          }, 6000);
                          seconfDetail.style.visibility = 'visible';
                        }
                      }
                    })
                    .catch((error) => {
                      if (error.response && error.response.status === 422) {
                        const message = error.response.data.errors[0];
                        Toasty.showToast('danger', message);
                      }
                    })
                });
              }
            })
            .catch((error) => {
              if (error.response && error.response.status === 422) {
                const message = error.response.data.errors[0];
                Toasty.showToast('danger', message);
              }
            }).finally(function () {
              unSetLoader(button, 'Fund Now');
            })
        });
      }, 3000);
    } catch (error) {
      console.log(error);

    }
  } else {
    try {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        setLoaderWithCustom(button, 'Loading..');
        setTimeout(() => {

          if (amount.value === '') {
            Toasty.showToast(
              'danger',
              'amount field cannot be empty. Please enter an amount to deposit',
            );
            unSetLoader(button, 'Fund Now');

          }
          if (method.value === '') {
            Toasty.showToast(
              'danger',
              'Deposit field cannot be empty. Please choose a method  to deposit',
            );
            unSetLoader(button, 'Fund Now');
          }

          const depositMethod = method.value;

          coinTy.textContent = `${method.value.toUpperCase()} ADDRESS`;
          paymo.value = `${method.value.toUpperCase()}`;
          axios
            .post('../newApi/api/task/fetchWallet')
            .then((response) => {
              if (response.status === 201) {
                const readResult = response.data.message;
                const { bitcoin, ethereum, tether, bnb, solana, usdc, xrp, dogecoin, toncoin, cardano, tron, avalanche } = readResult;

                if (depositMethod === 'ethereum') {
                  wallet.value = ethereum;
                  coinImg.src = "ethereum.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${ethereum}`;
                }
                if (depositMethod === 'bitcoin') {
                  wallet.value = bitcoin;
                  coinImg.src = "bitcoin.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${bitcoin}`;
                }
                if (depositMethod === 'tether') {
                  wallet.value = tether;
                  coinImg.src = "tether.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${tether}`;
                }
                if (depositMethod === 'binancecoin') {
                  wallet.value = bnb;
                  coinImg.src = "bnb.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${bnb}`;
                }
                if (depositMethod === 'solana') {
                  wallet.value = solana;
                  coinImg.src = "solana.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${solana}`;
                }
                if (depositMethod === 'usd-coin') {
                  wallet.value = usdc;
                  coinImg.src = "usdc.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${usdc}`;
                }
                if (depositMethod === 'ripple') {
                  wallet.value = xrp;
                  coinImg.src = "xrp.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${xrp}`;
                }
                if (depositMethod === 'dogecoin') {
                  wallet.value = dogecoin;
                  coinImg.src = "dogecoin.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${dogecoin}`;
                }
                if (depositMethod === 'the-open-network') {
                  wallet.value = toncoin;
                  coinImg.src = "toncoin.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${toncoin}`;
                }
                if (depositMethod === 'cardano') {
                  wallet.value = cardano;
                  coinImg.src = "cardano.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${cardano}`;
                }
                if (depositMethod === 'tron') {
                  wallet.value = tron;
                  coinImg.src = "tron.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${tron}`;
                }
                if (depositMethod === 'avalanche-2') {
                  wallet.value = avalanche;
                  coinImg.src = "avalanche.svg";
                  qrCoin.src = `https://quickchart.io/qr?text=${avalanche}`;
                }


                coins = depositMethod;
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
                const usdAmount = amount.value;
                getCryptoData(cryptoSymbol).then((data) => {
                  price = data.market_data.current_price.usd;
                  symbol = data.name;
                  bitcoinFraction = usdAmount / price;
                  depAmt.forEach(e => {
                    e.textContent = ` ${currency}${usdAmount}`;
                  })


                  note.textContent = `Please ensure your payment was made to this ${cryptoSymbol} Wallet ${wallet.value}`;
                  coinVal.textContent = `with a value of ${bitcoinFraction.toFixed(4)} ${data.symbol.toUpperCase()} `;
                  const sessionGetUserID = localStorage.getItem('uId');
                  const requestData = {
                    cryptovalue: bitcoinFraction,
                    cryptoAmt: usdAmount,
                    netWork: symbol,
                    sessionGetUserID: sessionGetUserID,
                    companyWallet: wallet.value,
                  };
                  axios
                    .post('../newApi/api/task/depositPage', requestData)
                    .then((response) => {
                      if (response.status === 201) {
                        const readResult = response.data.message;
                        depositId = readResult.userId;
                        if (readResult.message === 'true') {
                          // Toasty.showToast(
                          //   'success',
                          //   `your deposit has been recorded you are to pay ${usdAmount} ${currency} in value ${bitcoinFraction.toFixed(2)} ${symbol.toUpperCase()}`,
                          // );
                          unSetLoader(button, 'Fund Now');
                          firstFund.style.display = 'none';
                          loaderOverlay.style.display = 'flex';
                          setTimeout(() => {
                            loaderOverlay.style.display = 'none';
                          }, 6000);
                          seconfDetail.style.visibility = 'visible';
                        }
                      }
                    })
                    .catch((error) => {
                      if (error.response && error.response.status === 422) {
                        const message = error.response.data.errors[0];
                        Toasty.showToast('danger', message);
                      }
                    })
                });
              }
            })
            .catch((error) => {
              if (error.response && error.response.status === 422) {
                const message = error.response.data.errors[0];
                Toasty.showToast('danger', message);
              }
            }).finally(function () {
              unSetLoader(button, 'Fund Now');
            })
        });
      }, 3000);
    } catch (error) {
      console.log(error);

    }
  }
  Send.addEventListener('click', function (e) {
    e.preventDefault();
    seconfDetail.style.display = 'none';
    fileUploadSection.style.visibility = 'visible';
  });

  upload.addEventListener('click', function (e) {
    e.preventDefault();
    
    const LoginData = new FormData(fileUploadForm);
    LoginData.append('id', sessionGetUserID); 
const fileInput = LoginData.get('documents');  
 
if (fileInput.name === "" || fileInput.size === 0) {
  Toasty.showToast('error', 'your proof of payment is empty');
} else {
       axios
      .post('../newApi/api/task/uploadproof', LoginData)
      .then(function (response) {
        if (response.status === 201) {
          const readResultAsJson = response.data.message;
          if (readResultAsJson === 'true') {
            Toasty.showToast('success', 'your proof of payment has been submitted');
            seconfDetail.style.display = 'none';
            fileUploadSection.style.visibility = 'hidden';
            thirdDetail.style.visibility = 'visible';
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response && error.response.status === 422) {
          const message = error.response.data;
          const messag = JSON.parse(message);
          Toasty.showToast('danger', messag);
        }
      })
}


  });



});
