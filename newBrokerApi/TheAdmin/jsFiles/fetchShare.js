document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('uId');
  const tablebody = document.getElementById('tbody');
  const modalBody = document.getElementById('modalBody');
  let status = '';
  let html = '';
  let userCurrency = '';
  axios
    .get(`../newApi/api/task/fetchUseShareAll/${userId}`)
    .then((response) => {
      // console.log(response);
      if (response.status === 201) {
        const readResult = response.data.message;

        readResult.forEach((element, index) => {
          const {
            Wallet,
            amount,
            amtValue,
            dateOfTrans,
            id,
            transId,
            transMethod,
            transStatus,
            userBalance,
            userid,
          } = element;

          if (transStatus === 'Approved') {
            status = ` <span class='badge bg-soft-warning text-success ms-2'>
            ${transStatus}
          </span>`;
          } else if (transStatus === 'Pending') {
            status = ` <span class='badge bg-soft-warning text-warning ms-2'>
            ${transStatus}
          </span>`;
          } else if (transStatus === 'Declined') {
            status = ` <span class='badge bg-soft-warning text-danger ms-2'>
            ${transStatus}
          </span>`;
          }
          html += `   <tr>
                <td>${index + 1}</td>
                <td>#${transId}</td>
                <td>${dateOfTrans}</td>
                <td>${transMethod}</td>
                <td>${formatNumberWithCommasAndDecimal(parseInt(amount))}</td>

                <td>
                 ${status}
                </td>
                <td>
         <a
                            class="btn btn-white btn-sm view-button"
                            href="javascript:;"
                            data-bs-toggle="modal"
                            data-bs-target="#accountInvoiceReceiptModal"
                            data-userId=${id}
                          >
                            <i class="bi-eye-fill me-1"></i>
                             view Details
                          </a>
 
                   
                </td>
              </tr>`;
        });

        tablebody.innerHTML = html;

        // Attach event listeners to all view buttons
        const viewButtons = document.querySelectorAll('.view-button');
        viewButtons.forEach((button) => {
          button.addEventListener('click', function (e) {
            const depositId = this.getAttribute('data-userId');
            axios
              .get(`../newApi/api/task/fetchonesharesDetails/${depositId}`)
              .then((response) => {
                if (response.status === 201) {
                  const depostApiResult = response.data.message.depositDetails;
                  const userApiResult = response.data.message.userDetails;

                  const {
                    Wallet,
                    amount,
                    amtValue,
                    dateOfTrans,
                    id,
                    transId,
                    transMethod,
                    transStatus,
                    userBalance,
                    userid,
                  } = depostApiResult;
                  const { currency } = userApiResult;
                  const formattedDate = convertDateFormat(dateOfTrans);

                  let tbody = '';
                  tbody += ` <div class="text-center mb-5">
              <h3 class="mb-1">Invoice for share purchase</h3>
              <span class="d-block">Invoice id #${transId}</span>
            </div>


            <div class="row mb-6">
              <div class="col-md-4 mb-3 mb-md-0">
                <small class="text-cap text-secondary mb-0">Shares Worth:</small>
                <span class="text-dark">${currency}${formatNumberWithCommasAndDecimal(parseInt(amount))}</span>
              </div>
              <!-- End Col -->

              <div class="col-md-4 mb-3 mb-md-0">
                <small class="text-cap text-secondary mb-0">Date paid:</small>
                <span class="text-dark">${formattedDate}</span>
              </div>
              <!-- End Col -->

              <div class="col-md-4">
                <small class="text-cap text-secondary mb-0">
                  Purchase Method:
                </small>
                <div class="d-flex align-items-center">
               ${transMethod.toUpperCase()}
                </div>
              </div>
              <!-- End Col -->
            </div>
            <!-- End Row -->

            <small class="text-cap mb-2">Summary</small>

            <ul class="list-group mb-4">
              <li class="list-group-item text-dark">
                <div class="d-flex justify-content-between align-items-center">
                  <strong>Coin Value</strong>
                  <span>${parseFloat(amtValue).toFixed(2)} ${transMethod === 'Litecoin' ? 'Ltc' : transMethod === 'Tether' ? 'Usdt' : transMethod === 'Bitcoin' ? 'Btc' : transMethod === 'Ethereum' ? 'Eth' : ''}</span>
                </div>
              </li>
             
              <li class="list-group-item list-group-item-light text-dark">
                <div class="d-flex justify-content-between align-items-center">
                  <strong>Transaction Status</strong>
                 <span style="${transStatus === 'Approved' ? 'color:green' : transStatus === 'Pending' ? 'color:#f0c99b' : transStatus === 'Declined' ? 'color:red' : ''}">  ${transStatus}</span>
                </div>
              </li>
                    <li class="list-group-item list-group-item-light text-dark">
                <div class="d-flex justify-content-between align-items-center">
                  <strong>${transMethod} Wallet</strong>
                  <span>  ${Wallet}</span>
                </div>
              </li>
            </ul>
            <hr class="my-5" />`;
                  modalBody.innerHTML = tbody;
                }
              })
              .catch((error) => {
                console.error('There was an error!', error);
              });
          });
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        // Toasty.showToast('danger', message);
        html = `<tr><td valign="top" colspan="6" class="dataTables_empty"><div class="text-center p-4">
              <img class="mb-3" src="./assets/svg/illustrations/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="default">
              <img class="mb-3" src="./assets/svg/illustrations-light/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="dark">
            <p class="mb-0">No Share Yet</p>
            </div></td></tr>`;
        tablebody.innerHTML = html;
      }
    });
});
