document.addEventListener('DOMContentLoaded', function () {
  const tablebody = document.querySelector('#tbody');
  const pagination = document.querySelector('#pagination');
  const userIden = document.querySelector('#userId');
  const Amount = document.querySelector('#Amount');
  const Amountn = document.querySelector('#Amountn');
  const umessageIdd = document.querySelector('#umessageIdd');
  const userproId = document.querySelector('#userproId');
  const message = document.querySelector('#message');
  const umessage = document.querySelector('#umessage');
  const AmountForLoss = document.getElementById('AmountForLoss');
  const userIdForLoss = document.getElementById('userIdForLoss');
  const addLossForm = document.getElementById('addLossForm');
  const addsharesform = document.getElementById('addsharesform');
  const Amountnll = document.getElementById('Amountnll');
  const userproIdll = document.getElementById('userproIdll');
  const addsharesRoi = document.getElementById('addsharesRoi');
  const AmountRoi = document.getElementById('AmountRoi');
  const userRoi = document.getElementById('userRoi');
  const exampleModalContentLabel = document.querySelector(
    '#exampleModalContentLabel'
  );
  const exampleModalContentProfileLabel = document.querySelector(
    '#exampleModalContentProfileLabel'
  );
  const addform = document.getElementById('addform');
  const addprofitform = document.getElementById('addprofitform');

  let currentPage = 1; // Current page number
  const itemsPerPage = 15; // Number of items per page

  let count = 0;
  let html;
  let pagenum;
  let totalPages;

  axios
    .get('../api/task/FetchAllUser')
    .then(function (response) {
      const result = response.data.message;
      if (response.status === 201) {
        totalPages = Math.ceil(result.length / itemsPerPage);
        pagenum = result.length;
        renderPagination(totalPages);
        axios
          .get(`../api/task/FetchAllUserLimit/${currentPage},${itemsPerPage}`)
          .then(function (response) {
            const result = response.data.message;
            // console.log(result);

            if (response.status === 201) {
              renderTableRows(result);
            }
          })
          .catch(function (error) {
            if (error.response && error.response.status === 422) {
              const message = error.response.data.errors[0];
              Toasty.showToast('danger', message);
            } else {
              console.error(error);
            }
          });
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        Toasty.showToast('danger', message);
      } else {
        console.error(error);
      }
    });

  // Function to render table rows
  function renderTableRows(data) {
    count = (currentPage - 1) * itemsPerPage; // Reset count based on current page
    let html = '';
    data.forEach((element, index) => {
      count++; // Increment count for each row
      if (count > pagenum) {
        count = 1; // Reset count if it exceeds the total number of items
      }
      const {
        id,
        firstName,
        last_Name,
        Username,
        email,
        Phone,
        country,
        Password,
        refer,
        encryptedPassword,
        Plan,
        createdAt,
        userid,
        ip,
        img,
        balance,
        total_depo,
        total_pro,
        status,
        demo_balance,
        sup,
        alert,
        numb,
        kyc,
        IMFClearanceCode,
        Address,
        City,
        State,
        verifi,
        dis,
        email_log,
        name_of_code,
        withd,
        signal_message,
        emailVerication,
        UserLogin,
        currency,
      } = element;
      html += `
              <tr>
                  <th scope="row">${count}</th>
                  <td>${firstName}</td>
                  <td>${last_Name}</td>
                  <td>${Username}</td>
                  <td>${email}</td>
                  <td>${Phone}</td>
                  <td>${country}</td>
                  <td>${Password}</td>
                  <td>${refer}</td>
                  <td>${encryptedPassword}</td>
                  <td>${Plan}</td>
                  <td>${createdAt}</td>
                  <td>${userid}</td>
                  <td>${ip}</td>
                  <td>${img}</td>
                  <td>${balance}</td>
                  <td>${total_depo}</td>
                  <td>${total_pro}</td>
                  <td>${status}</td>
                  <td>${demo_balance}</td>
                  <td>${sup}</td>
                  <td>${alert}</td>
                  <td>${numb}</td>
                  <td>${kyc}</td>
                  <td>${IMFClearanceCode}</td>
                  <td>${Address}</td>
                  <td>${City}</td>
                  <td>${State}</td>
                  <td>${verifi}</td>
                  <td>${dis}</td>
                  <td>${email_log}</td>
                  <td>${name_of_code}</td>
                  <td>${withd}</td>
                  <td>${signal_message}</td>
                  <td>${emailVerication}</td>
                  <td>${UserLogin}</td>
                  <td>${currency}</td>
<td>
  <button data-user-id="${id}" class="btn btn-warning btn-md edit-user-details">Edit User</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-danger btn-md delete-user">Delete user</button>
</td>
 
${
  UserLogin === null || UserLogin === ''
    ? `<td>
       <button data-user-id="${id}" class="btn btn-secondary btn-md disable-user">Disable User Login</button>
     </td>`
    : UserLogin === 'disabled'
      ? `<td>
         <button data-user-id="${id}" disabled="disabled" class="btn btn-secondary btn-md disable-user">Disable User Login</button>
       </td>`
      : `<td>
       <button data-user-id="${id}" class="btn btn-secondary btn-md disable-user">Disable User Login</button>
     </td>`
}
${
  UserLogin === 'enabled'
    ? `<td>
         <button data-user-id="${id}" disabled="disabled" class="btn btn-success btn-md enable-user">Enable User Login</button>
       </td>`
    : `<td>
         <button data-user-id="${id}" class="btn btn-success btn-md enable-user">Enable User Login</button>
       </td>`
}

<td>
  <button data-user-id="${id}" class="btn btn-dark btn-md change-signal-message"data-toggle="modal" data-target="#exampleModal" id="addCollapse">Change Signal Message</button>
</td>

<td>
  <button data-user-id="${id}" class="btn btn-secondary btn-md disable-alert-message">Disable Alert Message</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-success btn-md enable-alert-message">Enable Alert Message</button>
</td>
<td>
  <button data-user-id="${id}"class="btn btn-warning  FundUser"data-toggle="modal" data-target="#exampleModalContent" id="addCollapse">Fund User</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-info btn-md add-profit" data-toggle="modal" data-target="#exampleModalContentProfile" id="addCollapse">Add Profit</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-dark btn-md add-loss" data-toggle="modal" data-target="#exampleModalContentProfileLoss" id="addCollapse">Add Loss</button>
</td>
 
</tr>
`;
      tablebody.innerHTML = html;
    });
  }
  {
    /* <td>
  <button data-user-id="${id}" class="btn btn-secondary btn-md disable-cron">Disable Automatic Deposit</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-success btn-md enable-cron">Enable Automatic Deposit</button>
</td> */
  }
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('disable-cron')) {
      const userid = event.target.dataset.userId;
      axios
        .patch(`../api/task/disableCron/${userid}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            Toasty.showToast('success', message);
            setTimeout(() => {
              location.reload();
            }, 3000);
            event.target.setAttribute('disabled', 'disabled');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('enable-cron')) {
      const userid = event.target.dataset.userId;
      axios
        .patch(`../api/task/enableCron/${userid}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            Toasty.showToast('success', message);
            setTimeout(() => {
              location.reload();
            }, 3000);
            event.target.setAttribute('disabled', 'disabled');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });

  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-roi')) {
      const userid = event.target.dataset.userId;
      axios
        .get(`../api/task/FetchAllUsers/${userid}`)
        .then(function (response) {
          const fetchedData = response.data.message;
          if (response.status === 201) {
            const { firstName, last_Name } = fetchedData;
            AmountRoi.placeholder = `Add a Share ROI For ${firstName} ${last_Name} `;
            userRoi.value = userid;
          }
        })
        .catch(function (error) {
          s;
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-share')) {
      const userid = event.target.dataset.userId;
      axios
        .get(`../api/task/FetchAllUsers/${userid}`)
        .then(function (response) {
          const fetchedData = response.data.message;
          if (response.status === 201) {
            const { firstName, last_Name } = fetchedData;
            Amountnll.placeholder = `Add a Share For ${firstName} ${last_Name}  `;
            userproIdll.value = userid;
          }
        })
        .catch(function (error) {
          s;
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-loss')) {
      const userid = event.target.dataset.userId;
      axios
        .get(`../api/task/FetchAllUsers/${userid}`)
        .then(function (response) {
          const fetchedData = response.data.message;
          if (response.status === 201) {
            const { firstName, last_Name } = fetchedData;
            userIdForLoss.value = userid;
            AmountForLoss.placeholder = `Add a Loss For ${firstName} ${last_Name}  `;
          }
        })
        .catch(function (error) {
          s;
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });

  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('change-signal-message')) {
     
      const userid = event.target.dataset.userId;
      axios
        .get(`../api/task/FetchAllUsers/${userid}`)
        .then(function (response) {
          const fetchedData = response.data.message;
          if (response.status === 201) {
            const { firstName, last_Name } = fetchedData;
            umessageIdd.value = userid;
            // console.log(umessageIdd);
            umessage.placeholder = `Add a signal message For ${firstName} ${last_Name} `;
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
    addLossForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      if (
        !formData.get('AmountnForLoss').trim() ||
        !formData.get('userIdForLoss').trim()
      ) {
        Toasty.showToast('danger', 'Please fill in all the required fields.');
        return;
      }
      axios
        .post('../api/task/AdminMakeLoss', formData)
        .then((response) => {
          if (response.status === 201) {
            const readResult = response.data.message;
            if (readResult.message === 'true') {
              Toasty.showToast(
                'success',
                `Loss of ${formData.get('AmountnForLoss')} has been Approved `
              );
              setTimeout(() => {
                location.reload()
              }, 3000);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
    addsharesform.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      if (
        !formData.get('Amountnll').trim() ||
        !formData.get('userproIdll').trim() ||
        !formData.get('AmountPer').trim()
      ) {
        Toasty.showToast('danger', 'Please fill in all the required fields.');
        return;
      }
      axios
        .post('../api/task/AdminMakeShares', formData)
        .then((response) => {
          if (response.status === 201) {
            const readResult = response.data.message;
            if (readResult.message === 'true') {
              Toasty.showToast(
                'success',
                `Share of ${formData.get('Amountnll')} has been Approved `
              );
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
    addsharesRoi.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      if (
        !formData.get('AmountRoi').trim() ||
        !formData.get('userRoi').trim()
      ) {
        Toasty.showToast('danger', 'Please fill in all the required fields.');
        return;
      }
      axios
        .post('../api/task/AdminMakeRoiShares', formData)
        .then((response) => {
          if (response.status === 201) {
            const readResult = response.data.message;
            if (readResult.message === 'true') {
              Toasty.showToast(
                'success',
                `Share of ${formData.get('Amountnll')} has been Approved `
              );
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  addprofitform.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    if (!formData.get('Amountn').trim() || !formData.get('userproId').trim()) {
      Toasty.showToast('danger', 'Please fill in all the required fields.');
      return;
    }

    axios
      .post('../api/task/AdminMakeProfit', formData)
      .then((response) => {
        if (response.status === 201) {
          const readResult = response.data.message;
          if (readResult.message === 'true') {
            Toasty.showToast(
              'success',
              `Profit of ${formData.get('Amountn')} has been Approved `
            );
            setTimeout(() => {
              location.reload()
            }, 3000);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
  message.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this); 
    console.log(formData.get('umessage'), formData.get('umessageIdd'), formData);
    if (
      !formData.get('umessage').trim() ||
      !formData.get('umessageIdd').trim()
    ) {
      Toasty.showToast('danger', 'Please fill in all the required fields.');
      return;
    }
    const mData = {
      umessage:formData.get('umessage'),
      umessageIdd:formData.get('umessageIdd')
    } 
    axios
      .patch(`../api/task/changeSignalMessage`, mData)
      .then((response) => {
        const result = response.data.message;
        if (response.status === 201) {
          const message = result;
          Toasty.showToast('success', message);
          setTimeout(() => {
            location.reload();
          }, 3000);
          event.target.setAttribute('disabled', 'disabled');
        }
      })
      .catch((error) => {F
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        } else {
          console.error(error);
        }
      });
  });

  addform.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const coin = formData.get('shipmentStatus');

    if (
      !formData.get('Amount').trim() ||
      !formData.get('shipmentStatus').trim() ||
      !formData.get('userId').trim()
    ) {
      Toasty.showToast('danger', 'Please fill in all the required fields.');

      return;
    }
    async function getCryptoData(cryptoSymbol) {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoSymbol}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetch3ing cryptocurrency data:', error);
      }
    }
    const cryptoSymbol = coin.toLowerCase();
    const usdAmount = formData.get('Amount');
    getCryptoData(cryptoSymbol).then((data) => {
      price = data.market_data.current_price.usd;
      symbol = data.name;
      bitcoinFraction = usdAmount / price;
      formData.append('symbol', symbol);
      formData.append('bitcoinFraction', bitcoinFraction);
      const arrangedData = {
        amtValue: formData.get("bitcoinFraction"),
        amount: formData.get("Amount"),
        transMethod: formData.get("symbol"),
        userid: formData.get("userId"),
        Wallet: formData.get("wallet"), // Added value for Wallet
      };
      
      
      axios
        .post('../api/task/AdminMakeDeposit', arrangedData)
        .then((response) => {
          const readResult = response.data.message;
          if (response.status === 201) {
            const readResult = response.data.message;

            if (readResult.message === 'true') {
              Toasty.showToast(
                'success',
                `Deposit of ${usdAmount} has been Approved `
              );
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-profit')) {
      const userid = event.target.dataset.userId;
      axios
        .get(`../api/task/FetchAllUsers/${userid}`)
        .then(function (response) {
          const fetchedData = response.data.message;
          if (response.status === 201) {
            const { firstName, last_Name } = fetchedData;
            userproId.value = userid;
            Amountn.placeholder = `Enter Amount you want to add as profit for ${firstName} ${last_Name} `;
            exampleModalContentProfileLabel.innerHTML = `Add Profit For ${firstName} ${last_Name} `;
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-loss')) {
      const userid = event.target.dataset.userId;
      axios
        .get(`../api/task/FetchAllUsers/${userid}`)
        .then(function (response) {
          const fetchedData = response.data.message;
          if (response.status === 201) {
            const { firstName, last_Name } = fetchedData;
            userproId.value = userid;
            Amountn.placeholder = `Enter Amount you want to add as profit for ${firstName} ${last_Name} `;
            exampleModalContentProfileLabel.innerHTML = `Add Profit For ${firstName} ${last_Name} `;
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('FundUser')) {
      const userid = event.target.dataset.userId;
      axios
        .get(`../api/task/FetchAllUsers/${userid}`)
        .then(function (response) {
          const fetchedData = response.data.message;
          if (response.status === 201) {
            const { firstName, last_Name } = fetchedData;
            userIden.value = userid;
            Amount.placeholder = `Enter Amount you want to deposit for ${firstName} ${last_Name}  `;
            exampleModalContentLabel.innerHTML = `Add deposit For ${firstName} ${last_Name} `;
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });

  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('disable-alert-message')) {
      const userid = event.target.dataset.userId;
      axios
        .patch(`../api/task/disableAlertMessage/${userid}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            Toasty.showToast('success', message);
            setTimeout(() => {
              location.reload();
            }, 3000);
            event.target.setAttribute('disabled', 'disabled');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });

  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('enable-alert-message')) {
      const userid = event.target.dataset.userId;
      axios
        .patch(`../api/task/enableAlertMessage/${userid}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            Toasty.showToast('success', message);
            setTimeout(() => {
              location.reload();
            }, 3000);
            event.target.setAttribute('disabled', 'disabled');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });

  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('enable-email')) {
      const userid = event.target.dataset.userId;
      axios
        .patch(`../api/task/enabledEmailAlert/${userid}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            Toasty.showToast('success', message);
            setTimeout(() => {
              location.reload();
            }, 3000);
            event.target.setAttribute('disabled', 'disabled');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });

  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('disable-email')) {
      const userid = event.target.dataset.userId;
      axios
        .patch(`../api/task/disableEmailAlert/${userid}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            Toasty.showToast('success', message);
            setTimeout(() => {
              location.reload();
            }, 3000);
            event.target.setAttribute('disabled', 'disabled');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('disable-user')) {
      const userid = event.target.dataset.userId;

      axios
        .patch(`../api/task/disableUserLogin/${userid}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            Toasty.showToast('success', message);
            setTimeout(() => {
              location.reload();
            }, 3000);
            event.target.setAttribute('disabled', 'disabled');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('enable-user')) {
      const userid = event.target.dataset.userId;

      axios
        .patch(`../api/task/enableUserLogin/${userid}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            Toasty.showToast('success', message);
            setTimeout(() => {
              location.reload();
            }, 3000);
            event.target.setAttribute('disabled', 'disabled');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });

  // Function to render pagination buttons
  function renderPagination(totalPages) {
    let html = '';
    const maxVisiblePages = 4;
    // Previous button
    html += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''} ">
      <a class="page-link prev" href="#" data-page="${currentPage - 1}"  >&laquo;</a>
    </li>
    `;

    // Numbered pagination buttons
    if (totalPages <= maxVisiblePages) {
      // If totalPages is less than or equal to maxVisiblePages, display all pages
      for (let i = 1; i <= totalPages; i++) {
        html += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
        `;
      }
    } else {
      // If totalPages is greater than maxVisiblePages, display first maxVisiblePages pages followed by ellipsis
      for (let i = 1; i <= maxVisiblePages; i++) {
        html += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
        `;
      }
      // Add ellipsis
      html += `
        <li class="page-item ">
          <span class="page-link">...</span>
        </li>
      `;
      // Display the last page
      html += `
        <li class="page-item">
          <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
        </li>
      `;
    }

    // Next button
    html += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ' next'}">
      <a class="page-link next" href="#" data-page="${currentPage + 1}"  >&raquo;</a>
    </li>
    `;

    pagination.innerHTML = html;
  }

  // Event listener for pagination click
  pagination.addEventListener('click', function (event) {
    event.preventDefault();
    if (
      event.target.tagName === 'A' &&
      !event.target.classList.contains('prev') &&
      !event.target.classList.contains('next')
    ) {
      const paginationItems = pagination.querySelectorAll('.page-item');
      paginationItems.forEach((item) => {
        item.classList.remove('active');
      });

      event.target.parentNode.classList.add('active');

      currentPage = parseInt(event.target.dataset.page);
      fetchData();
    } else if (
      event.target.classList.contains('next') &&
      currentPage < totalPages
    ) {
      currentPage++;
      renderPagination(totalPages);
      fetchData();
    } else if (event.target.classList.contains('prev') && currentPage > 1) {
      currentPage--;
      renderPagination(totalPages);
      fetchData();
    }
  });

  // Function to fetch data from server
  function fetchData() {
    axios
      .get(`../api/task/FetchAllUserLimit/${currentPage},${itemsPerPage}`)
      .then(function (response) {
        const result = response.data.message;
        if (response.status === 201) {
          renderTableRows(result);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        } else {
          console.error(error);
        }
      });
  }

  // Add event listener to the table body to handle click events on delete buttons
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-user')) {
      const userid = event.target.dataset.userId;

      axios
        .delete(`../api/task/deletUser/${userid}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            Toasty.showToast('success', message);
            setTimeout(() => {
              location.reload();
            }, 3000);
            event.target.closest('tr').remove();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });

  // Add event listener to handle click events on the "Edit" buttons
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-user-details')) {
      const row = event.target.closest('tr');
      const countContent = row.querySelector('th').textContent.trim(); // Get the value of countContent before modification
      const productId = event.target.dataset.userId;

      // Fetch data for the specific product ID
      axios
        .get(`../api/task/FetchAllUsers/${productId}`)
        .then(function (response) {
          const result = response.data.message;
          if (response.status === 201) {
            renderEditForm(row, countContent, result);
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    }
  });

  // Function to render edit form with fetched data
  function renderEditForm(row, countContent, data) {
    const {
      id,
      firstName,
      last_Name,
      Username,
      email,
      Phone,
      country,
      Password,
      refer,
      encryptedPassword,
      Plan,
      createdAt,
      userid,
      ip,
      img,
      balance,
      total_depo,
      total_pro,
      status,
      demo_balance,
      sup,
      alert,
      numb,
      kyc,
      IMFClearanceCode,
      Address,
      City,
      State,
      verifi,
      dis,
      email_log,
      name_of_code,
      withd,
      signal_message,
      emailVerication,
      UserLogin,
      currency,
    } = data;

    row.innerHTML = `
    <th scope="row">${countContent}</th>
    <td><input type="text" class="form-control" value="${firstName}"></td>
    <td><input type="text" class="form-control" value="${last_Name}"></td>
    <td><input type="text" class="form-control" value="${Username}"></td>
    <td><input type="text" class="form-control" value="${email}"></td>
    <td><input type="text" class="form-control" value="${Phone}"></td>
    <td><input type="text" class="form-control" value="${country}"></td>
    <td><input type="text" class="form-control" value="${Password}"></td>
    <td><input type="text" class="form-control" value="${refer}"></td>
    <td><input type="text" class="form-control" value="${encryptedPassword}"></td>
    <td><input type="text" class="form-control" value="${Plan}"></td>
    <td><input type="text" class="form-control" value="${createdAt}"></td>
    <td><input type="text" class="form-control" value="${userid}"></td>
    <td><input type="text" class="form-control" value="${ip}"></td>
    <td><input type="text" class="form-control" value="${img}"></td>
    <td><input type="text" class="form-control" value="${balance}"></td>
    <td><input type="text" class="form-control" value="${total_depo}"></td>
    <td><input type="text" class="form-control" value="${total_pro}"></td>
    <td><input type="text" class="form-control" value="${status}"></td>
    <td><input type="text" class="form-control" value="${demo_balance}"></td>
    <td><input type="text" class="form-control" value="${sup}"></td>
    <td><input type="text" class="form-control" value="${alert}"></td>
    <td><input type="text" class="form-control" value="${numb}"></td>
    <td><input type="text" class="form-control" value="${kyc}"></td>
    <td><input type="text" class="form-control" value="${IMFClearanceCode}"></td>
    <td><input type="text" class="form-control" value="${Address}"></td>
    <td><input type="text" class="form-control" value="${City}"></td>
    <td><input type="text" class="form-control" value="${State}"></td>
    <td><input type="text" class="form-control" value="${verifi}"></td>
    <td><input type="text" class="form-control" value="${dis}"></td>
    <td><input type="text" class="form-control" value="${email_log}"></td>
    <td><input type="text" class="form-control" value="${name_of_code}"></td>
    <td><input type="text" class="form-control" value="${withd}"></td>
    <td><input type="text" class="form-control" value="${signal_message}"></td>
    <td><input type="text" class="form-control" value="${emailVerication}"></td>
    <td><input type="text" class="form-control" value="${UserLogin}"></td>
    <td><input type="text" class="form-control" value="${currency}"></td>
        <td>
      <button class="btn btn-success btn-sm save-product" data-product-id="${id}">Save</button>
    </td>
        <td>
    
      <button class="btn btn-danger btn-sm cancel-edit">Cancel</button>
    </td>
  `;
    // Remove borders from all table cells
    row.querySelectorAll('input').forEach((td) => {
      td.style.border = 'none';
      td.style.width = '200px';
    });
    // Remove borders from the table row
    row.style.border = 'none';
  }

  // Add event listener to handle click events on the "Save" and "Cancel" buttons within the edit mode
  tablebody.addEventListener('click', function (event) {
    const row = event.target.closest('tr');
    if (event.target.classList.contains('save-product')) {
      const productId = event.target.dataset.productId;
      const countContent = row.querySelector('th').textContent.trim(); // Get the value of countContent before modification

      // Fetch data for the specific product ID
      axios
        .get(`../api/task/FetchAllUsers/${productId}`)
        .then(function (response) {
          const editedData = response.data.message;
          if (response.status === 201) {
            renderUpdatedRow(row, countContent, editedData); // Pass the row and the fetched data to update the row
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          } else {
            console.error(error);
          }
        });
    } else if (event.target.classList.contains('cancel-edit')) {
      location.reload(); // Reload the page to cancel editing and reset changes
    }
  });

  // Function to update the row with the saved data
  function renderUpdatedRow(row, countContent, editedData) {
    const inputs = row.querySelectorAll('input');
    // inputs.forEach((element, i) => {
    //   console.log(element, i);
    // });

    const { id } = editedData;
    const firstName = inputs[0].value.trim();
    const last_Name = inputs[1].value.trim();
    const Username = inputs[2].value.trim();
    const email = inputs[3].value.trim();
    const Phone = inputs[4].value.trim();
    const country = inputs[5].value.trim();
    const Password = inputs[6].value.trim();
    const refer = inputs[7].value.trim();
    const encryptedPassword = inputs[8].value.trim();
    const Plan = inputs[9].value.trim();
    const createdAt = inputs[10].value.trim();
    const userid = inputs[11].value.trim();
    const ip = inputs[12].value.trim();
    const img = inputs[13].value.trim();
    const balance = inputs[14].value.trim();
    const total_depo = inputs[15].value.trim();
    const total_pro = inputs[16].value.trim();
    const status = inputs[17].value.trim();
    const demo_balance = inputs[18].value.trim();
    const sup = inputs[19].value.trim();
    const alert = inputs[20].value.trim();
    const numb = inputs[21].value.trim();
    const kyc = inputs[22].value.trim();
    const IMFClearanceCode = inputs[23].value.trim();
    const Address = inputs[24].value.trim();
    const City = inputs[25].value.trim();
    const State = inputs[26].value.trim();
    const verifi = inputs[27].value.trim();
    const dis = inputs[28].value.trim();
    const email_log = inputs[29].value.trim();
    const name_of_code = inputs[30].value.trim();
    const withd = inputs[31].value.trim();
    const signal_message = inputs[32].value.trim();
    const emailVerication = inputs[33].value.trim();
    const UserLogin = inputs[34].value.trim();
    const currency = inputs[35].value.trim();

    const jsonData = {
      uid: id,
      firstName,
      last_Name,
      Username,
      email,
      Phone,
      country,
      Password,
      refer,
      encryptedPassword,
      Plan,
      createdAt,
      userid,
      ip,
      img,
      balance,
      total_depo,
      total_pro,
      status,
      demo_balance,
      sup,
      alert,
      numb,
      kyc,
      IMFClearanceCode,
      Address,
      City,
      State,
      verifi,
      dis,
      email_log,
      name_of_code,
      withd,
      signal_message,
      emailVerication,
      UserLogin,
      currency,
    };

    // console.log(jsonData);
    axios
      .put(`../api/task/edituser`, jsonData)
      .then(function (response) {
        const result = response.data;

        if (response.status === 201) {
          const message = result.message;
          Toasty.showToast('success', message);
          setTimeout(() => {
            // location.reload();
          }, 3000);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        } else {
          console.error(error);
        }
      });
    // console.log(UserLogin);
    // Update the row with the saved data
    row.innerHTML = `
      <th scope="row">${countContent}</th>
      <td>${firstName}</td>
      <td>${last_Name}</td>
      <td>${Username}</td>
      <td>${email}</td>
      <td>${Phone}</td>
      <td>${country}</td>
      <td>${Password}</td>
      <td>${refer}</td>
      <td>${encryptedPassword}</td>
      <td>${Plan}</td>
      <td>${createdAt}</td>
      <td>${userid}</td>
      <td>${ip}</td>
      <td>${img}</td>
      <td>${balance}</td>
      <td>${total_depo}</td>
      <td>${total_pro}</td>
      <td>${status}</td>
      <td>${demo_balance}</td>
      <td>${sup}</td>
      <td>${alert}</td>
      <td>${numb}</td>
      <td>${kyc}</td>
      <td>${IMFClearanceCode}</td>
      <td>${Address}</td>
      <td>${City}</td>
      <td>${State}</td>
      <td>${verifi}</td>
      <td>${dis}</td>
      <td>${email_log}</td>
      <td>${name_of_code}</td>
      <td>${withd}</td>
      <td>${signal_message}</td>
      <td>${emailVerication}</td>
      <td>${UserLogin}</td>
      <td>${currency}</td>
<td>
  <button data-user-id="${id}" class="btn btn-warning btn-md edit-user-details">Edit User</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-danger btn-md delete-user">Delete user</button>
</td>
 
${
  UserLogin === null || UserLogin === ''
    ? `<td>
       <button data-user-id="${id}" class="btn btn-secondary btn-md disable-user">Disable User Login</button>
     </td>`
    : UserLogin === 'disabled'
      ? `<td>
         <button data-user-id="${id}" disabled="disabled" class="btn btn-secondary btn-md disable-user">Disable User Login</button>
       </td>`
      : `<td>
       <button data-user-id="${id}" class="btn btn-secondary btn-md disable-user">Disable User Login</button>
     </td>`
}
${
  UserLogin === 'enabled'
    ? `<td>
         <button data-user-id="${id}" disabled="disabled" class="btn btn-success btn-md enable-user">Enable User Login</button>
       </td>`
    : `<td>
         <button data-user-id="${id}" class="btn btn-success btn-md enable-user">Enable User Login</button>
       </td>`
}

<td>
  <button data-user-id="${id}" class="btn btn-dark btn-md change-signal-message"data-toggle="modal" data-target="#exampleModal" id="addCollapse">Change Signal Message</button>
</td>

<td>
  <button data-user-id="${id}" class="btn btn-secondary btn-md disable-alert-message">Disable Alert Message</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-success btn-md enable-alert-message">Enable Alert Message</button>
</td>
<td>
  <button data-user-id="${id}"class="btn btn-warning  FundUser"data-toggle="modal" data-target="#exampleModalContent" id="addCollapse">Fund User</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-info btn-md add-profit" data-toggle="modal" data-target="#exampleModalContentProfile" id="addCollapse">Add Profit</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-dark btn-md add-loss" data-toggle="modal" data-target="#exampleModalContentProfileLoss" id="addCollapse">Add Loss</button>
</td>
 

</tr>
      `;
  }
});
{
  /* <td>
  <button data-user-id="${id}" class="btn btn-secondary btn-md disable-cron">Disable Automatic Deposit</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-success btn-md enable-cron">Enable Automatic Deposit</button>
</td> */
}
