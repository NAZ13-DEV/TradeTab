document.addEventListener('DOMContentLoaded', function () {
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
  const userId = localStorage.getItem('uId');const currency = localStorage.getItem('currency');
  const tablebody = document.getElementById('tbody');
  const modalBody = document.getElementById('modalBody');
  let status = '';
  let html = '';
  let userCurrency = '';
  axios
    .get(`../newApi/api/task/fetchUserDepositAll/${userId}`)
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
                <td>${currency}${formatNumberWithCommasAndDecimal(parseInt(amount))}</td>

                <td>
                 ${status}
                </td>

              </tr>`;
        });

        tablebody.innerHTML = html;

    
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        Toasty.showToast('danger', message);
        html = `<tr><td valign="top" colspan="6" class="dataTables_empty"><div class="text-center p-4">
              
            <p class="mb-0">No Deposit Yet</p>
            </div></td></tr>`;
        tablebody.innerHTML = html;
      }
    });

});
