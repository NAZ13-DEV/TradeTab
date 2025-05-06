document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('uId'); const currency = localStorage.getItem('currency');
  const cryptotablebody = document.getElementById('tbody');
  const banktablebody = document.getElementById('tbodyy');


  let crytostatus = '';
  let cryptohtml = '';
  let bankstatus = '';
  let bankhtml = '';
  let tbody = '';
  // console.log(cryptotablebody, banktablebody, cryptoModalBody, banktablebody);
  /* crypto withdrawal part */
  axios
    .get(`../newApi/api/task/fetchUserWithdrawalAll/${userId}`)
    .then((response) => {
      if (response.status === 201) {
        const readResultt = response.data.message;
        if (readResultt.crypto.length === 0) {
          cryptohtml = `<tr><td valign="top" colspan="6" class="dataTables_empty"><div class="text-center p-4">
<p class="mb-0">No Crypto Withdrawal Yet</p>
</div></td></tr>`;
          cryptotablebody.innerHTML = cryptohtml;
        }
        if (readResultt.crypto) {
          const readResult = readResultt.crypto;
          readResult.forEach((element, index) => {
            const {
              Wallet,
              amount,
              dateOfTrans,
              id,
              transId,
              transMethod,
              transStatus,
              userBalance,
              userid,
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
            cryptohtml += `   <tr>
<td>${index + 1}</td>
<td>${dateOfTrans}</td> 
<td>${transMethod.toUpperCase()}</td>
<td>${currency}${formatNumberWithCommasAndDecimal(parseInt(amount))}</td>
<td>${Wallet}</td>
<td>
${crytostatus}
</td>

</tr>`;
          });
          cryptotablebody.innerHTML = cryptohtml;
        } else {
          console.log('errrrer');
        }

        /* bank withdrawal part */
        if (readResultt.bank.length === 0) {
          bankhtml = `<tr><td valign="top" colspan="6" class="dataTables_empty"><div class="text-center p-4">
<p class="mb-0">No Bank Withdrawal Yet</p>
</div></td></tr>`;
          banktablebody.innerHTML = bankhtml;
        }
        if (readResultt.bank) {
          const readResult = readResultt.bank;
          readResult.forEach((element, index) => {
            const {
              id,
              userid,
              accName,
              accNum,
              bankName,
              bankAdress,
              routing,
              swiftcode,
              amount,
              narration,
              transId,
              transStatus,
              dateOfTrans
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
            bankhtml += `  <tr>
<td>${index + 1}</td>
<td>${accName}</td>
<td>${accNum}</td>
<td>${currency}${formatNumberWithCommasAndDecimal(parseInt(amount))}</td>
<td>${bankAdress}</td>
<td>${bankName}</td>
<td>${dateOfTrans}</td>
<td>${routing}</td>
<td>${swiftcode}</td>
<td>${transId}</td>
<td>${bankstatus}</td>
  
</tr>`;
          });
          banktablebody.innerHTML = bankhtml;
        }




      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];

      }
    });
});
