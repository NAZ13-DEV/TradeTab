document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('uId');
  const cryptotablebody = document.getElementById('tbody');
  const banktablebody = document.getElementById('tbodyy');

  const cryptoModalBody = document.getElementById('cryptoModalBody');
  const BankmodalBody = document.getElementById('BankmodalBody');
  let crytostatus = '';
  let cryptohtml = '';
  let bankstatus = '';
  let bankhtml = '';
  // console.log(cryptotablebody, banktablebody, cryptoModalBody, banktablebody);
  /*  part */
  axios
    .get(`../api/task/fetchUserProfitLoss/${userId}`)
    .then((response) => {
      if (response.status === 201) {
        const readResultt = response.data.message.details;
        const user = response.data.message.user;
        const { currency } = user;
        const profit = readResultt.filter((e) => e.type === 'Profit');
        const loss = readResultt.filter((e) => e.type === 'Loss');
            if (profit.length === 0) {
              cryptohtml = `<tr><td valign="top" colspan="6" class="dataTables_empty"><div class="text-center p-4">
              <img class="mb-3" src="./assets/svg/illustrations/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="default">
              <img class="mb-3" src="./assets/svg/illustrations-light/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="dark">
            <p class="mb-0">No Profit Recorded Yet</p>
            </div></td></tr>`;
              cryptotablebody.innerHTML = cryptohtml;
            }
if (profit) {
    profit.forEach((element, index) => {
        const {
            amount,
            dateOfTrans,
            id,
            transId,
            transStatus,
            type,
            userBalance,
          } = element;
          if (transStatus === 'Approved') {
            crytostatus = ` <span class='badge bg-soft-warning text-success ms-2'>
            ${transStatus}
            </span>`;
          } else if (transStatus === 'Pending') {
              crytostatus = ` <span class='badge bg-soft-warning text-warning ms-2'>
              ${transStatus}
              </span>`;
            } else if (transStatus === 'Declined') {
                crytostatus = ` <span class='badge bg-soft-danger text-warning ms-2'>
                ${transStatus}
                </span>`;
            }
            //  console.log(crytostatus);
                  const formattedDate = convertDateFormat(dateOfTrans);

            cryptohtml += `   <tr>
<td>${index + 1}</td>
   <td>${currency}${formatNumberWithCommasAndDecimal(parseInt(amount))}</td> 
   <td>${formattedDate}</td> 
   <td>#${transId}</td>
   
   <td>
   ${crytostatus}
   </td>
   
   <td>${currency}${formatNumberWithCommasAndDecimal(parseInt(userBalance))}</td>
   <td>
   <a class="btn btn-white btn-sm view-button" href="javascript:;" data-bs-toggle="modal" data-bs-target="#accountInvoiceReceiptModal" data-userId="${id}">
   <i class="bi-eye-fill me-1"></i>
   View Details
   </a>
   

   </td>          
</tr>`;
});
        cryptotablebody.innerHTML = cryptohtml;
        const viewButtons = document.querySelectorAll('.view-button');
        viewButtons.forEach((button) => {
          button.addEventListener('click', function (e) {
              const Id = this.getAttribute('data-userId');
              axios
              .get(`../api/task/fetchoneprofitloss/${Id}`)
              .then((response) => {
                if (response.status === 201) {
            const readResultt = response.data.message.details;
            const user = response.data.message.user;
                     const {
                       amount,
                       dateOfTrans,
                       id,
                       transId,
                       transStatus,
                       type,
                       userBalance,
                     } = readResultt;
                  const { currency } = user;
                  const formattedDate = convertDateFormat(dateOfTrans);

                  let tbody = '';
                  tbody += `<div class="text-center mb-5">
              <h3 class="mb-1">Invoice for Trade Profit</h3>
              <span class="d-block">Invoice ID #${transId}</span>
              </div>
              <div class="row mb-6">
              <div class="col-md-4 mb-3 mb-md-0">
              <small class="text-cap text-secondary mb-0">Profit Amount:</small>
              <span class="text-dark">${currency}${formatNumberWithCommasAndDecimal(parseInt(amount))}</span>
              </div>
              <!-- End Col -->
              
              <div class="col-md-4 mb-3 mb-md-0">
              <small class="text-cap text-secondary mb-0">Date of Profit:</small>
              <span class="text-dark">${formattedDate}</span>
              </div>
           
                  </div>
                  <!-- End Row -->
                  
                  <small class="text-cap mb-2">Summary</small>

            <ul class="list-group mb-4">
       
            <li class="list-group-item text-dark">
                <div class="d-flex justify-content-between align-items-center">
                <strong>User Balance</strong>
                <span>${currency}${formatNumberWithCommasAndDecimal(parseInt(userBalance))}</span>
                </div>
                </li>
                <li class="list-group-item list-group-item-light text-dark">
                <div class="d-flex justify-content-between align-items-center">
                <strong>Transaction Status</strong>
                <span style="${transStatus === 'Approved' ? 'color:green' : transStatus === 'Pending' ? 'color:#f0c99b' : transStatus === 'Declined' ? 'color:red' : ''}">  ${transStatus}</span>
                </div>
                </li>
              
              </ul>
              <hr class="my-5" />`;
                  cryptoModalBody.innerHTML = tbody;
                }
            })
            .catch((error) => {
                console.error('There was an error!', error);
              });
          });
        });
    }
    if (loss.length === 0) {
      bankhtml = `<tr><td valign="top" colspan="6" class="dataTables_empty"><div class="text-center p-4">
              <img class="mb-3" src="./assets/svg/illustrations/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="default">
              <img class="mb-3" src="./assets/svg/illustrations-light/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="dark">
            <p class="mb-0">No Loss Recorded Yet</p>
            </div></td></tr>`;
      banktablebody.innerHTML = bankhtml;
    }
if (loss) {
    loss.forEach((element, index) => {
        const {
            amount,
            dateOfTrans,
            id,
            transId,
            transStatus,
            type,
            userBalance,
          } = element;
          if (transStatus === 'Approved') {
            bankstatus = ` <span class='badge bg-soft-warning text-success ms-2'>
            ${transStatus}
            </span>`;
          } else if (transStatus === 'Pending') {
              bankstatus = ` <span class='badge bg-soft-warning text-warning ms-2'>
              ${transStatus}
              </span>`;
            } else if (transStatus === 'Declined') {
                bankstatus = ` <span class='badge bg-soft-danger text-warning ms-2'>
                ${transStatus}
                </span>`;
            }
            //  console.log(bankstatus);
                  const formattedDate = convertDateFormat(dateOfTrans);

            bankhtml += `   <tr>
<td>${index + 1}</td>
   <td>${currency}${formatNumberWithCommasAndDecimal(parseInt(amount))}</td> 
   <td>${formattedDate}</td> 
   <td>#${transId}</td>
   
   <td>
   ${bankstatus}
   </td>
   
   <td>${currency}${formatNumberWithCommasAndDecimal(parseInt(userBalance))}</td>
   <td>
   <a class="btn btn-white btn-sm view-button" href="javascript:;" data-bs-toggle="modal" data-bs-target="#accountInvoiceReceiptModals" data-userId="${id}">
   <i class="bi-eye-fill me-1"></i>
   View Details
   </a>
   

   </td>          
</tr>`;
});;
;
        banktablebody.innerHTML = bankhtml;
        const viewButtons = document.querySelectorAll('.view-button');
        viewButtons.forEach((button) => {
          button.addEventListener('click', function (e) {
              const Id = this.getAttribute('data-userId');
              axios
              .get(`../api/task/fetchoneprofitloss/${Id}`)
              .then((response) => {
                if (response.status === 201) {
            const readResultt = response.data.message.details;
            const user = response.data.message.user;
                     const {
                       amount,
                       dateOfTrans,
                       id,
                       transId,
                       transStatus,
                       type,
                       userBalance,
                     } = readResultt;
                  const { currency } = user;
                  const formattedDate = convertDateFormat(dateOfTrans);

                  let tbod = '';
                  tbod += `<div class="text-center mb-5">
              <h3 class="mb-1">Invoice for Trade Loss</h3>
              <span class="d-block">Invoice ID #${transId}</span>
              </div>
              <div class="row mb-6">
              <div class="col-md-4 mb-3 mb-md-0">
              <small class="text-cap text-secondary mb-0">Profit Amount:</small>
              <span class="text-dark">${currency}${formatNumberWithCommasAndDecimal(parseInt(amount))}</span>
              </div>
              <!-- End Col -->
              
              <div class="col-md-4 mb-3 mb-md-0">
              <small class="text-cap text-secondary mb-0">Date of Profit:</small>
              <span class="text-dark">${formattedDate}</span>
              </div>
           
                  </div>
                  <!-- End Row -->
                  
                  <small class="text-cap mb-2">Summary</small>

            <ul class="list-group mb-4">
       
            <li class="list-group-item text-dark">
                <div class="d-flex justify-content-between align-items-center">
                <strong>User Balance</strong>
                <span>${currency}${formatNumberWithCommasAndDecimal(parseInt(userBalance))}</span>
                </div>
                </li>
                <li class="list-group-item list-group-item-light text-dark">
                <div class="d-flex justify-content-between align-items-center">
                <strong>Transaction Status</strong>
                <span style="${transStatus === 'Approved' ? 'color:green' : transStatus === 'Pending' ? 'color:#f0c99b' : transStatus === 'Declined' ? 'color:red' : ''}">  ${transStatus}</span>
                </div>
                </li>
              
              </ul>
              <hr class="my-5" />`;
                  BankmodalBody.innerHTML = tbod;
                }
            })
            .catch((error) => {
                console.error('There was an error!', error);
              });
          });
        });
    }
 
}  
});
});
