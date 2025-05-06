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
    // loaderOverlay.style.display = "none";
    const userId = localStorage.getItem('uId');const currency = localStorage.getItem('currency');
    const tablebody = document.getElementById('tbody');
    let status = '';
    let outcomeStat = '';
    let html = '';
    let userCurrency = ''
    axios
        .get(`../newApi/api/task/fetchUserTradeAll/${userId}`)
        .then((response) => {
            // console.log(response);
            if (response.status === 201) {
                const readResult = response.data.message;

                readResult.forEach((element, index) => {
                    const { id,
                        bvolamount,
                        btype,
                        ordertype,
                        bsymbol,
                        IntervalLL,
                        LeverageEE,
                        bsl,
                        btp,
                        userid,
                        transId,
                        transStatus,
                        dateOfTrans,
                        outcome } = element;

                    if (transStatus === 'Profit') {
                        status = ` <span class='badge bg-soft-warning text-success ms-2'>  Profit  </span>`;
                    } else if (transStatus === 'Pending') {
                        status = ` <span class='badge bg-soft-warning text-warning ms-2'>   Running  </span>`;
                    } else if (transStatus === 'Loss') {
                        status = ` <span class='badge bg-soft-warning text-danger ms-2'>  Loss </span>`;
                    }
                    if (outcome === 'Profit') {
                        outcomeStat = ` <span class='badge bg-soft-warning text-success ms-2'>  Profit  </span>`;
                    } else if (outcome === 'Loss') {
                        outcomeStat = ` <span class='badge bg-soft-warning text-danger ms-2'>  Loss </span>`;
                    }
                    html += `   <tr> 
                <td>${index + 1}</td>
                <td>${currency}${formatNumberWithCommasAndDecimal(parseInt(bvolamount))}</td>
<td style="text-align: center">${btype}</td>
<td style="text-align: center">${ordertype}</td>
<td style="text-align: center">${bsymbol}</td>
<td style="text-align: center">${IntervalLL / 60} Min</td>
<td style="text-align: center">${LeverageEE}</td>
<td style="text-align: center">${bsl}</td>
<td style="text-align: center">${btp}</td>
<td style="text-align: center">#${transId}</td>
<td style="text-align: center">${status}</td>
<td style="text-align: center">${formatToDayMonthYear(dateOfTrans)}</td>
<td style="text-align: center">${outcome === null ? 'Pending' : outcomeStat}</td>
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
            <p class="mb-0">No Trade Yet</p>
            </div></td></tr>`;
                tablebody.innerHTML = html;
            }
        });

});
