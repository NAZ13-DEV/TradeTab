document.addEventListener('DOMContentLoaded', function () {
  const tablebody = document.querySelector('#tbody');
  const pagination = document.querySelector('#pagination');
  const Amountn = document.querySelector('#Amountn');
  const userproId = document.querySelector('#userproId');
  const AmountForLoss = document.querySelector('#AmountForLoss');
  const userIdForLoss = document.querySelector('#userIdForLoss');
  const tradeidForLoss = document.querySelector('#tradeidForLoss');
  const tradeproId = document.querySelector('#tradeproId');
  const userIden = document.querySelector('#userId');
  const Amount = document.querySelector('#Amount');
  const umessageId = document.querySelector('#umessageId');
  const message = document.querySelector('#message');
  const umessage = document.querySelector('#umessage');
  const addLossForm = document.getElementById('addLossForm');
  const addsharesform = document.getElementById('addsharesform');
  const Amountnll = document.getElementById('Amountnll');
  const userproIdll = document.getElementById('userproIdll');
  const addsharesRoi = document.getElementById('addsharesRoi');
  const AmountRoi = document.getElementById('AmountRoi');
  const userRoi = document.getElementById('userRoi');
  let currentPage = 1; // Current page number
  const itemsPerPage = 15; // Number of items per page

  let count = 0;
  let html;
  let pagenum;
  let totalPages;

  axios
    .get('../api/task/FetchAllTrade')
    .then(function (response) {
      const result = response.data.message;
      
      if (response.status === 201) {
        totalPages = Math.ceil(result.length / itemsPerPage);
        pagenum = result.length;
        renderPagination(totalPages);
        axios
          .get(
            `../api/task/FetchAllTradeLimit/${currentPage},${itemsPerPage}`,
          )
          .then(function (response) {
            if (response.status === 201) {
              const result2 = response.data.message.deposits;
              const user = response.data.message.userDetails[0];
              // console.log(user);
              renderTableRows(result2, user);
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
  function renderTableRows(data, userD) {
    count = (currentPage - 1) * itemsPerPage; // Reset count based on current page
    let html = '';
    // console.log(typeof userD);
    const depositDetailsWithUserNames = data
    .map((deposit) => {
      
      const user = userD.find((u) => u.id == deposit.userid);
        if (user) {
          return {
            firstName: user.firstName,
            last_Name: user.last_Name,
            deposit: deposit,
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    depositDetailsWithUserNames.forEach((element) => {
      count++; // Increment count for each row
      if (count > pagenum) {
        count = 1; // Reset count if it exceeds the total number of items
      }
      const { firstName, last_Name } = element;
      const {id, amount, Symbol, Intervah, Leverage, stploss, takeprofit, EntryPrice, tradeType, trading_pairs, userid, dateo, trans_id, status, amt_earned} = element.deposit;
      html += `
<tr>
<th scope="row">${count}</th>
<td>${firstName} ${last_Name} </td>
<td>${amount}</td>
<td>${Symbol}</td>
<td>${Intervah} sec</td>
<td>${Leverage}</td>
<td>${stploss}</td>
<td>${takeprofit}</td>
<td>${EntryPrice}</td>
<td>${tradeType}</td>
<td>${trading_pairs}</td>
<td>#${trans_id}</td>
<td>${status}</td>
<td>${dateo}</td>
<td>${amt_earned}</td>


<td>
  <button data-user-id="${id}" class="btn btn-danger btn-md delete-deposit">Delete Trade</button>
</td>
<td>
  <button data-trade-id="${id}" data-user-id="${userid}" ${ status === "Loss" ?`disabled`:""} class="btn btn-danger btn-md add-loss" data-toggle="modal" id="addCollapse">Lose Trade</button>
</td>
<td>
  <button data-trade-id="${id}"data-user-id="${userid}" ${status === "Profit" || status === "Approved"?`disabled`:""} class="btn btn-success btn-md add-profit" data-toggle="modal"  id="addCollapse"">win Trade</button>
</td>

</tr>
`;
      tablebody.innerHTML = html;
    });
  }

  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('disapprove-deposit')) {
      const userid = event.target.dataset.userId;
      axios
        .patch(`../api/task/disapproveKyc/${userid}`)
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
    if (event.target.classList.contains('approve-deposit')) {
      const userid = event.target.dataset.userId;
      axios
        .patch(`../api/task/approveKyc/${userid}`)
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
      .get(`../api/task/FetchAllTradeLimit/${currentPage},${itemsPerPage}`)
      .then(function (response) {
        if (response.status === 201) {
          const result = response.data.message.deposits;
          const userDetails = response.data.message.userDetails[0];
          renderTableRows(result, userDetails);
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
  // tablebody.addEventListener('click', function (event) {
  //   if (event.target.classList.contains('add-profit')) {
  //     const userid = event.target.dataset.userId;
  //     axios
  //       .get(`../api/task/FetchAllUsers/${userid}`)
  //       .then(function (response) {
  //         const fetchedData = response.data.message;
  //         if (response.status === 201) {
  //           const { fullast_Name } = fetchedData;
  //           userproId.value = userid;
  //           Amountn.placeholder = `Enter Amount you want to add as profit for ${fullast_Name} `;
  //           exampleModalContentProfileLabel.innerHTML = `Add Profit For ${fullast_Name} `;
  //         }
  //       })
  //       .catch(function (error) {
  //         if (error.response && error.response.status === 422) {
  //           const message = error.response.data.errors[0];
  //           Toasty.showToast('danger', message);
  //         } else {
  //           console.error(error);
  //         }
  //       });
  //   }
  // });
  // tablebody.addEventListener('click', function (event) {
  //   if (event.target.classList.contains('add-loss')) {
  //     const userid = event.target.dataset.userId;
  //     axios
  //       .get(`../api/task/FetchAllUsers/${userid}`)
  //       .then(function (response) {
  //         const fetchedData = response.data.message;
  //         if (response.status === 201) {
  //           const { fullast_Name } = fetchedData;
  //           userIdForLoss.value = userid;
  //           AmountForLoss.placeholder = `Enter Amount you want to add as profit for ${fullast_Name} `;
  //           exampleModalContentProfileLabel.innerHTML = `Add Profit For ${fullast_Name} `;
  //         }
  //       })
  //       .catch(function (error) {
  //         if (error.response && error.response.status === 422) {
  //           const message = error.response.data.errors[0];
  //           Toasty.showToast('danger', message);
  //         } else {
  //           console.error(error);
  //         }
  //       });
  //   }
  // });
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-profit')) {
      const userid = event.target.dataset.userId;
      const tradeId = event.target.dataset.tradeId;
      axios
        .patch(`../api/task/outComeProfit/${tradeId}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            axios.get(`../api/task/FetchAllUsers/${userid}`)
              .then(function (response) {
                const fetchedData = response.data.message;
                if (response.status === 201) {
                  const { firstName, last_Name } = fetchedData;
                  userproId.value = userid;
                  tradeproId.value = tradeId
                  Amountn.placeholder = `Enter Amount you want to add as profit for ${firstName} ${last_Name}`;
                  exampleModalContentProfileLabel.innerHTML = `Add Profit For  ${firstName} ${last_Name}`;

                  // Show the modal after fetching details
                  $('#exampleModalContentProfile').modal('show');

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
    if (event.target.classList.contains('add-loss')) {
      // console.log(event.target.dataset);
      
      const userid = event.target.dataset.userId;
      const tradeId = event.target.dataset.tradeId;
      axios
        .patch(`../api/task/outComeLoss/${tradeId}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            axios.get(`../api/task/FetchAllUsers/${userid}`)
              .then(function (response) {
                const fetchedData = response.data.message;
                if (response.status === 201) {
                  const { firstName, last_Name } = fetchedData;
                  userIdForLoss.value = userid;
                  tradeidForLoss.value = tradeId

                  AmountForLoss.placeholder = `Enter Amount you want to add as loss for  ${firstName} ${last_Name}`;
                  exampleModalContentProfileLabel.innerHTML = `Add Loss For  ${firstName} ${last_Name}`;

                  // Show the modal after fetching details
                  $('#exampleModalContentProfileLoss').modal('show');
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

  // Add event listener to the table body to handle click events on delete buttons
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-deposit')) {
      const userid = event.target.dataset.userId;
      axios
        .delete(`../api/task/deleteTrade/${userid}`)
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
    if (event.target.classList.contains('edit-deposit-details')) {
      const row = event.target.closest('tr');
      const countContent = row.querySelector('th').textContent.trim(); // Get the value of countContent before modification
      const productId = event.target.dataset.userId;

      // Fetch data for the specific product ID
      axios
        .get(`../api/task/fetchKycWithId/${productId}`)
        .then(function (response) {
          if (response.status === 201) {
            const result = response.data.message.depositDetails;
            const user = response.data.message.userDetails;
            renderEditForm(row, user, countContent, result);
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


  // Add event listener to handle click events on the "Save" and "Cancel" buttons within the edit mode
  tablebody.addEventListener('click', function (event) {
    const row = event.target.closest('tr');
    if (event.target.classList.contains('save-product')) {
      const productId = event.target.dataset.productId;
      const countContent = row.querySelector('th').textContent.trim(); // Get the value of countContent before modification

      // Fetch data for the specific product ID
      axios
        .get(`../api/task/fetchKycWithId/${productId}`)
        .then(function (response) {
          if (response.status === 201) {
            const result = response.data.message.depositDetails;
            const user = response.data.message.userDetails;

            renderUpdatedRow(row, user, countContent, result); // Pass the row and the fetched data to update the row
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
  addLossForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    if (
      !formData.get('AmountnForLoss').trim() ||
      !formData.get('userIdForLoss').trim()|| !formData.get('tradeidForLoss').trim()
    ) {
      Toasty.showToast('danger', 'Please fill in all the required fields.');
      return;
    }
    axios
      .post('../api/task/AdminMakeLosstrade', formData)
      .then((response) => {
        if (response.status === 201) {
          const readResult = response.data.message;
          if (readResult.message === 'true') {
            Toasty.showToast(
              'success',
              `Loss of ${formData.get('AmountnForLoss')} has been Approved `,
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
  addprofitform.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    if (!formData.get('Amountn').trim() || !formData.get('userproId').trim() ||  !formData.get('tradeproId').trim()) {
      Toasty.showToast('danger', 'Please fill in all the required fields.');
      return;
    }

    axios
      .post('../api/task/AdminMakeProfittrade', formData)
      .then((response) => {
        if (response.status === 201) {
          const readResult = response.data.message;
          if (readResult.message === 'true') {

            Toasty.showToast(
              'success',
              `Profit of ${formData.get('Amountn')} has been Approved `,
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
  // Function to update the row with the saved data
  function renderUpdatedRow(row, user, countContent, editedData) {
    const inputs = row.querySelectorAll('input');

    const { id, firstName , last_Name } = user;
    const transMethod = inputs[1].value.trim();
    const amount = inputs[2].value.trim();
    const userBalance = inputs[3].value.trim();
    const userid = inputs[4].value.trim();
    const Wallet = inputs[5].value.trim();
    const transId = inputs[6].value.trim();
    const transStatus = inputs[7].value.trim();
    const dateOfTrans = inputs[8].value.trim();
    const bankName = inputs[9].value.trim();
    const accNum = inputs[10].value.trim();
    const accName = inputs[11].value.trim();
    const country = inputs[12].value.trim();
    const swiftcode = inputs[13].value.trim();
    const narration = inputs[14].value.trim();

    const jsonData = {
      id: transId,
      transMethod: transMethod,
      amount: amount,
      userBalance: userBalance,
      userid: userid,
      Wallet: Wallet,
      transId: transId,
      transStatus: transStatus,
      dateOfTrans: dateOfTrans,
      bankName: bankName,
      accNum: accNum,
      accName: accName,
      country: country,
      swiftcode: swiftcode,
      narration: narration,
    };

    axios
      .put(`../api/task/editKyc`, jsonData)
      .then(function (response) {
        const result = response.data;
        if (response.status === 201) {
          const message = result.message;
          Toasty.showToast('success', message);
          setTimeout(() => {
            location.reload();
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
    row.innerHTML = `
<th scope="row">${countContent}</th>
<td>${firstName}, ${last_Name} </td>
<td>${transMethod}</td>
<td>${amount}</td>
<td>${userBalance}</td>
<td>${userid}</td>
<td>${Wallet}</td>
<td>${transId}</td>
<td>${transStatus}</td>
<td>${dateOfTrans}</td>
<td>${bankName}</td>
<td>${accNum}</td>
<td>${accName}</td>
<td>${country}</td>
<td>${swiftcode}</td>
<td>${narration}</td>
<td>
  <button data-user-id="${id}" class="btn btn-warning btn-md edit-deposit-details">Edit withdrawal details</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-danger btn-md delete-deposit">Delete withdrawal</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-secondary btn-md disapprove-deposit">Disapprove withdrawal</button>
</td>
<td>
  <button data-user-id="${id}" class="btn btn-success btn-md approve-deposit">Approve withdrawal</button>
</td>
  `;
  }
});
