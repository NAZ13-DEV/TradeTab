document.addEventListener('DOMContentLoaded', function () {
    const userDetails = fetchUserDetailsWithAxios();
    userDetails
      .then((res) => {
        const data = JSON.parse(res.data.message);
        const { verifyUser } = data;
  
        if (verifyUser === '' || verifyUser === null ||  verifyUser === 'False') {
          window.location.href = 'index';
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    const userId = localStorage.getItem('uId');
    const currency = localStorage.getItem('currency');
    const tablebody = document.getElementById('tbody');
    let status = '';
    let outcomeStat = '';
    let html = '';
    let userCurrency = ''
    axios
        .get(`../newApi/api/task/fetchUserProfitAll/${userId}`)
        .then((response) => {
            // console.log(response);
            if (response.status === 201) {
                const readResult = response.data.message;

                readResult.forEach((element, index) => {
                    const {
                        id,
                        amount,
                        userid,
                        Wallet,
                        transId,
                        userBalance,
                        transStatus,
                        dateOfTrans,
                        type
                    } = element;

                    // if (transStatus === 'Approved') {
                    //     status = ` <span class='badge bg-soft-warning text-success ms-2'>  Profit  </span>`;
                    // } else if (transStatus === 'Pending') {
                    //     status = ` <span class='badge bg-soft-warning text-warning ms-2'>   Running  </span>`;
                    // } else if (transStatus === 'Declined') {
                    //     status = ` <span class='badge bg-soft-warning text-danger ms-2'>  Loss </span>`;
                    // }

                    html += `   <tr> 
                <td>${index + 1}</td>
                <td>${currency}${formatNumberWithCommasAndDecimal(parseInt(amount))}</td>
    <td>${transId}</td>
    <td>${userBalance}</td>
    <td>${transStatus}</td>
    <td>${formatToDayMonthYear(dateOfTrans)}</td>
    <td>${type === "Loss"? "<span class='badge bg-soft-warning text-danger ms-2'>Loss </span>": type=== "Profit"?"<span class='badge bg-soft-warning text-success ms-2'>  Profit  </span>":''}</td>
              </tr>`;
                });

                tablebody.innerHTML = html;

                // Attach event listeners to all view buttons

            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                const message = error.response.data.errors[0];
            
                html = `<tr><td valign="top" colspan="6" class="dataTables_empty"><div class="text-center p-4">
            <p class="mb-0">No Earning Yet</p>
            </div></td></tr>`;
                tablebody.innerHTML = html;
            }
        });

});
