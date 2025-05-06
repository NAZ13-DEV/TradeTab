document.addEventListener('DOMContentLoaded', function () {
  const sessionGetUserID = localStorage.getItem('uId');
  const Home = document.querySelector('#content');
  const userDetails = fetchUserDetailsAndTransactionInfosWithAxios();
  const modalLIstBody = document.getElementById('modalLIstBody');
  const setHomePageHtml = function () {
    let html = '';

    userDetails
      .then(function (result) {
        if (result.status === 201) {
          const processSumAndAmount = (array, arrayName) => {
            if (array.length === 1) {
              array.unshift('0.0');

              const lastAmountFromArray = array[array.length - 2];
              array.shift();
              const theRemainAmount = array.map(Number);
              const totalRemainAmounts = theRemainAmount.reduce(
                (total, amount) => total + amount,
                0,
              );
              return {
                [`${arrayName}LastAmt`]: lastAmountFromArray,
                [`${arrayName}Total`]: totalRemainAmounts,
              };
            } else {
              const convertedarray = array.map(Number);
              const fullbalance = convertedarray.reduce(
                (total, amount) => total + amount,
                0,
              );
              array.pop();
              const theRemainAmount = array.map(Number);
              const balanceWIthoutLastNumber = theRemainAmount.reduce(
                (total, amount) => total + amount,
                0,
              );

              return {
                [`${arrayName}LastAmt`]: balanceWIthoutLastNumber,
                [`${arrayName}Total`]: fullbalance,
              };
            }
          };

          const message = result.data.message;
          const userDetails = message.userDetails;
          const profit = message.profit;
          const pdate = profit.map((e) => e.date);
          const pamount = profit.map((e) => e.amount);

          const profitDate = JSON.stringify(pdate);
          const profitAmount = JSON.stringify(pamount);

          const deposit = message.deposit;
          const ddate = deposit.map((e) => e.date);
          const damount = deposit.map((e) => e.amount);
          const depositDate = JSON.stringify(ddate);
          const depositAmount = JSON.stringify(damount);

          const withdrawal = message.withdrawal;
          const wdate = withdrawal.map((e) => e.date);
          const wamount = withdrawal.map((e) => e.amount);
          const withdrawalDate = JSON.stringify(wdate);
          const withdrawalAmount = JSON.stringify(wamount);

          const profitD = processSumAndAmount(pamount, 'p');
          const { pLastAmt, pTotal } = profitD;

          const drofitD = processSumAndAmount(damount, 'd');
          const { dLastAmt, dTotal } = drofitD;

          const wrofitD = processSumAndAmount(wamount, 'w');
          const { wLastAmt, wTotal } = wrofitD;

          // const finalp =pTotal.toLocaleString();
          // const finalw =wTotal.toLocaleString();
          // const finalt =dTotal.toLocaleString();
          // console.log(finalp, finalw, finaltZ);
          function calculatePercentageIncrease(initialAmount, finalAmount) {
            const initial = parseFloat(initialAmount);
            const final = parseFloat(finalAmount);
            if (initial === 0.0) {
              const percentageIncrease = final;
              return `${percentageIncrease}%`;
            }
            if (initialAmount > 0) {
              const percentageIncrease =
                ((finalAmount - initialAmount) / initialAmount) * 100;
              return `${percentageIncrease.toFixed(2)}%`;
            }
          }
          const dpercentage = calculatePercentageIncrease(dLastAmt, dTotal);
          const ppercentage = calculatePercentageIncrease(pLastAmt, pTotal);
          const wpercentage = calculatePercentageIncrease(wLastAmt, wTotal);
          // console.log(dpercentage, ppercentage, wpercentage);

          // function formatNumber(num) {
          //   const nFormat = new Intl.NumberFormat();
          //   return nFormat.format(num);
          // }
          const {
            userBalance,
            userProfit,
            amountDeposited,
            amountWithdrawal,
            currency,
          } = userDetails;

          // const userDetailBalance = formatNumber(userBalance);
          const html = `  <div class="content container-fluid">
          <!-- Page Header -->
          <div class="page-header">
          <div class="row align-items-center">
          <div class="col">
          <h1 class="page-header-title">Dashboard</h1>
          </div>
          <!-- End Col -->
          
        
          <!-- End Col -->
          </div>
          <!-- End Row -->
          </div>
          <!-- End Page Header -->
          
          <!-- Stats -->
          <div class="row">
          <div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <!-- Card -->
          <a class="card card-hover-shadow h-100">
          <div class="card-body">
          <h6 class="card-subtitle">Balance</h6>
          
          <div class="row align-items-center gx-2 mb-1">
          <div class="col-12">
          <h2 class="card-title text-inherit">${currency}${formatNumberWithCommasAndDecimal(
            parseFloat(userBalance),
          )}</h2>
          </div>
          <!-- End Col -->
          <style>
          /* Style for the horizontal line */
          </style>
          <div class="col-6">
          <!-- Chart -->
          
          <!-- End Chart -->
          </div>
          <!-- End Col -->
          
          </div>
          <!-- End Row -->
          
          
          </div>
          
          
          </a>
          
          <!-- End Card -->
          </div>
          
          <div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <!-- Card -->
          <a class="card card-hover-shadow h-100" >
          <div class="card-body">
          <h6 class="card-subtitle">PROFIT</h6>
          
          <div class="row align-items-center gx-2 mb-1">
          <div class="col-12">
          <h2 class="card-title text-inherit">${currency}${formatNumberWithCommasAndDecimal(parseFloat(userProfit))}</h2>
          </div>
          <!-- End Col -->
          
          <div class="col-6">
          <!-- Chart -->
          <div class="chartjs-custom" style="height: 3rem">
          <canvas class="js-chart" data-hs-chartjs-options='{
          "type": "line",
          "data": {
          "labels": ${profitDate},
          "datasets": [{
          "data": ${profitAmount},
          "backgroundColor": ["rgba(55, 125, 255, 0)", "rgba(255, 255, 255, 0)"],
          "borderColor": "#377dff",
          "borderWidth": 2,
          "pointRadius": 0,
          "pointHoverRadius": 0
          }]
          },
          "options": {
          "scales": {
          "y": {
          "display": false
          },
          "x": {
          "display": false
          }
          },
          "hover": {
          "mode": "nearest",
          "intersect": false
          },
          "plugins": {
          "tooltip": {
          "postfix":${JSON.stringify(currency)},
          "hasIndicator": false,
          "intersect": false
          }
          }
          }
          }'>
          </canvas>
          </div>
          <!-- End Chart -->
          </div>
          <!-- End Col -->
          </div>
          <!-- End Row -->
          
           ${
             ppercentage === '0%'
               ? `<span class="badge bg-soft-secondary text-secondary">
         ${ppercentage}
          </span>`
               : `<span class="badge bg-soft-success text-success">
         <i class="bi-graph-up"></i> ${ppercentage}
          </span>`
           }
          <span class="text-body fs-6 ms-1">from ${currency}${formatNumberWithCommasAndDecimal(pLastAmt)}</span>
          </div>
          </a>
          <!-- End Card -->
          </div>
          
          <div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <!-- Card -->
          <a class="card card-hover-shadow h-100" >
          <div class="card-body">
          <h6 class="card-subtitle">AMOUNT DEPOSITED</h6>
          
          <div class="row align-items-center gx-2 mb-1">
          <div class="col-12">
           
          <h2 class="card-title text-inherit">${currency}${formatNumberWithCommasAndDecimal(parseFloat(amountDeposited))}</h2>
          </div>
          <!-- End Col -->
          <div class="col-6">
          <!-- Chart -->
              <div class="chartjs-custom" style="height: 3rem">
          <canvas class="js-chart" data-hs-chartjs-options='{
          "type": "line",
          "data": {
            "labels": ${depositDate},
          "datasets": [{
          "data": ${depositAmount},
          "backgroundColor": ["rgba(55, 125, 255, 0)", "rgba(255, 255, 255, 0)"],
          "borderColor": "#377dff",
          "borderWidth": 2,
          "pointRadius": 0,
          "pointHoverRadius": 0
          }]
          },
          "options": {
          "scales": {
          "y": {
          "display": false
          },
          "x": {
          "display": false
          }
          },
          "hover": {
          "mode": "nearest",
          "intersect": false
          },
          "plugins": {
          "tooltip": {
          "postfix":${JSON.stringify(currency)},
          "hasIndicator": false,
          "intersect": false
          }
          }
          }
          }'>
          </canvas>
          </div>
          <!-- End Chart -->
          </div>
          <!-- End Col -->
          </div>
          <!-- End Row -->
        ${
          dpercentage === '0%'
            ? `<span class="badge bg-soft-secondary text-secondary">
         ${dpercentage}
          </span>`
            : `<span class="badge bg-soft-success text-success">
         <i class="bi-graph-up"></i> ${dpercentage}
          </span>`
        }
          
          <span class="text-body fs-6 ms-1">from ${currency}${formatNumberWithCommasAndDecimal(dLastAmt)}</span>
          </div>
          </a>
          <!-- End Card -->
          </div>
          
          <div class="col-sm-6 col-lg-3 mb-3 mb-lg-5">
          <!-- Card -->
          <a class="card card-hover-shadow h-100" >
          <div class="card-body">
          <h6 class="card-subtitle">AMOUNT WITHDRAWN</h6>
          
          <div class="row align-items-center gx-2 mb-1">
          <div class="col-12">
          <h2 class="card-title text-inherit">${currency}${formatNumberWithCommasAndDecimal(parseFloat(amountWithdrawal))}</h2>
          </div>
          <!-- End Col -->
          
          <div class="col-6">
          <!-- Chart -->
                <div class="chartjs-custom" style="height: 3rem">
          <canvas class="js-chart" data-hs-chartjs-options='{
          "type": "line",
          "data": {
           "labels": ${withdrawalDate},
          "datasets": [{
          "data": ${withdrawalAmount},
          "backgroundColor": ["rgba(55, 125, 255, 0)", "rgba(255, 255, 255, 0)"],
          "borderColor": "#377dff",
          "borderWidth": 2,
          "pointRadius": 0,
          "pointHoverRadius": 0
          }]
          },
          "options": {
          "scales": {
          "y": {
          "display": false
          },
          "x": {
          "display": false
          }
          },
          "hover": {
          "mode": "nearest",
          "intersect": false
          },
          "plugins": {
          "tooltip": {
          "postfix":${JSON.stringify(currency)},
          "hasIndicator": false,
          "intersect": false
          }
          }
          }
          }'>
          </canvas>
          </div>
          <!-- End Chart -->
          </div>
          <!-- End Col -->
          </div>
          <!-- End Row -->
          
             ${
               wpercentage === '0%'
                 ? `<span class="badge bg-soft-secondary text-secondary">
         ${wpercentage}
          </span>`
                 : `<span class="badge bg-soft-success text-success">
         <i class="bi-graph-up"></i> ${wpercentage}
          </span>`
             }
          <span class="text-body fs-6 ms-1">from ${currency}${formatNumberWithCommasAndDecimal(wLastAmt)}</span>
          </div>
          </a>
          <!-- End Card -->
          </div>
          </div>
          <!-- End Stats -->
          <div class="col-sm-12 col-lg-12 mb-3 mb-lg-5">
          <div class="row">
          <div class="col-12">
          <div class="card">
          <div class="card-body">
          <!-- TradingView Widget BEGIN -->
          <div class="tradingview-widget-container">
          <div id="tradingview_158b7" style="border-radius: 20px;"><iframe
          title="symbol overview TradingView widget" lang="en" id="tradingview_99628" frameborder="0"
          allowtransparency="true" scrolling="no"
          src="https://s.tradingview.com/embed-widget/symbol-overview/?locale=en#%7B%22symbols%22%3A%5B%5B%22Bitcoin%22%2C%22BITSTAMP%3ABTCUSD%7C1D%22%5D%2C%5B%22Ethereum%22%2C%22BITSTAMP%3AETHUSD%7C1D%22%5D%2C%5B%22Binance%22%2C%22BINANCE%3ABNBUSD%7C1D%22%5D%5D%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22500px%22%2C%22colorTheme%22%3A%22light%22%2C%22gridLineColor%22%3A%22rgba(42%2C%2046%2C%2057%2C%200.06)%22%2C%22fontColor%22%3A%22%23787b86%22%2C%22scalePosition%22%3A%22right%22%2C%22scaleMode%22%3A%22Normal%22%2C%22chartType%22%3A%22line%22%2C%22fontFamily%22%3A%22-apple-system%2C%20BlinkMacSystemFont%2C%20Trebuchet%20MS%2C%20Roboto%2C%20Ubuntu%2C%20sans-serif%22%2C%22valuesTracking%22%3A%221%22%2C%22page-uri%22%3A%22incoptfx.com%2Fuserdashlog%2Fdashboard%22%2C%22utm_source%22%3A%22incoptfx.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22symbol-overview%22%7D"
          style="margin: 0px !important; padding: 0px !important; width: 100%; height: 500px;"></iframe>
          </div>
          <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
          <script type="text/javascript">
          new TradingView.MediumWidget({
          "symbols": [
          [
          "Bitcoin",
          "BITSTAMP:BTCUSD|1D"
          ],
          [
          "Ethereum",
          "BITSTAMP:ETHUSD|1D"
          ],
          [
          "Binance",
          "BINANCE:BNBUSD|1D"
          ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "500",
          "locale": "en",
          "colorTheme": "light",
          "isTransparent": false,
          "autosize": false,
          "showVolume": false,
          "hideDateRanges": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "noTimeScale": false,
          "valuesTracking": "1",
          "chartType": "line",
          "fontColor": "#787b86",
          "gridLineColor": "rgba(42, 46, 57, 0.06)",
          "container_id": "tradingview_158b7"
          });
          </script>
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          
          
          <!-- Footer -->
          
   
          </div>`;
          Home.insertAdjacentHTML('beforeend', html);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        }
      });
  };
  setHomePageHtml();

//   axios
//     .get(`../newApi/api/task/fetchReferral/${sessionGetUserID}`)
//     .then(function (response) {
//       if (response.status === 201) {
//         const message = response.data.message;
//         const { currency } = message.referrerDetails[0];
//         const allreferral = message.referralDetails;
// console.log(allreferral);
//         allreferral.forEach((element, index) => {
//           const { nameOfRefers, status } = element;

//           html += `   
//           <hr class="mt-2" /> 
//           <ul class="list-unstyled list-py-2 mb-0" >
          
//           <li>
//           <div class="d-flex">
          
//           <div class="flex-grow-1 ms-3">
//           <div class="row align-items-center">
//           <div class="col-sm">
//           <h5 class="mb-0">
//           <a class="d-flex align-items-center">
//           <div class="flex-shrink-0">
//           <div class="avatar avatar-circle">
//           <img
//           class="avatar-img"
//           src="assets/img/160x160/img10.jpg"
//           alt="Image Description"
//           />
//           </div>
//           </div>
//           <div class="flex-grow-1 ms-3">
//           <span class="d-block h5 text-inherit mb-0">
//           ${nameOfRefers}
//           <i
//           class="${status === 'Pending' ? 'bi bi-patch-exclamation-fill text-warning' : status === 'Approved' ? 'bi bi-patch-check-fill text-success' : ''}"
//           data-bs-toggle="tooltip"
//           data-bs-placement="top"
//           title="Top endorsed"
//           ></i>
//           </span>
//           </div>
//           </a>
//           </h5>
          
//           </div>
          
//           </div>
//           <!-- End Row -->
//           </div>
//           </div>
//           </li>
//           </ul>  `;
//         });
//         console.log(html);
//         modalLIstBody.innerHTML = html;
//       }
//     })
//     .catch(function (error) {
//       if (error.response && error.response.status === 422) {
//         const message = error.response.data.errors[0];
//         // Toasty.showToast('danger', message);
//         // console.log(message);
//       }
//     });
});
