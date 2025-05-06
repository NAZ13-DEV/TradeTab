document.addEventListener('DOMContentLoaded', function () {
  const tablebody = document.querySelector('#tbody');
  const pagination = document.querySelector('#pagination');

  let currentPage = 1; // Current page number
  const itemsPerPage = 15; // Number of items per page

  let count = 0;
  let html;
  let pagenum;
  let totalPages;

  axios
    .get('../api/task/FetchAllCryptoWithdrawal')
    .then(function (response) {
      const result = response.data.message;
      if (response.status === 201) {
        totalPages = Math.ceil(result.length / itemsPerPage);
        pagenum = result.length;
        renderPagination(totalPages);
        axios
          .get(
            `../api/task/FetchAllCryptoWithdrawalLimit/${currentPage},${itemsPerPage}`
          )
          .then(function (response) {
            if (response.status === 201) {
              console.log(response.data);
              const result = response.data.message.deposits;
              const user = response.data.message.userDetails[0];
              renderTableRows(result, user);
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
    const depositDetailsWithUserNames = data
      .map((deposit) => {
        // console.log(userD);
        const user = userD.find((u) => u.id == deposit.userId);
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
      const {
        id,

        amount,
        payment_mode,
        wallet,
        transId,
        transStatus,
        dateOfTrans,
      } = element.deposit;
      html += `
<tr>
<th scope="row">${count}</th>
<td>${firstName} ${last_Name}</td>
<td>${amount}</td>
<td>${payment_mode}</td>
<td>${wallet}</td>
<td>${transId}</td>
<td>${transStatus}</td>
<td>${dateOfTrans}</td>
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

</tr>
`;
      tablebody.innerHTML = html;
    });
  }

  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('disapprove-deposit')) {
      const userid = event.target.dataset.userId;
      axios
        .patch(`../api/task/disapprovecryptowithdrawal/${userid}`)
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
        .patch(`../api/task/approvecryptowithdrawal/${userid}`)
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
      .get(
        `../api/task/FetchAllCryptoWithdrawalLimit/${currentPage},${itemsPerPage}`
      )
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

  // Add event listener to the table body to handle click events on delete buttons
  tablebody.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-deposit')) {
      const userid = event.target.dataset.userId;

      axios
        .delete(`../api/task/deletecryptowithdrawal/${userid}`)
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
        .get(`../api/task/fetchCryptoWithdrawalWithId/${productId}`)
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

  // Function to render edit form with fetched data
  function renderEditForm(row, user, countContent, data) {
    const { firstName, last_Name } = user;
    const {
      id,
      amount,
      payment_mode,
      wallet,
      transId,
      transStatus,
      dateOfTrans,
    } = data;

    row.innerHTML = `
    <th scope="row">${countContent}</th>
<td><input type="text" class="form-control" readonly value="${firstName} ${last_Name}"></td>
<td><input type="text" class="form-control" value="${amount}"></td>
<td><input type="text" class="form-control" readonly value="${payment_mode}"></td>
<td><input type="text" class="form-control" value="${wallet}"></td>
<td><input type="text" class="form-control"readonly value="${transId}"></td>
<td><input type="text" class="form-control" value="${transStatus}"></td>
<td><input type="text" class="form-control" value="${dateOfTrans}"></td>
<td><input type="text" style="display:none" class="form-control" value="${id}"></td>
    <td>
      <button class="btn btn-success btn-sm save-product" data-product-id="${id}">Save</button>
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
        .get(`../api/task/fetchCryptoWithdrawalWithId/${productId}`)
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

  // Function to update the row with the saved data
  function renderUpdatedRow(row, user, countContent, editedData) {
    const inputs = row.querySelectorAll('input');
    // inputs.forEach((element) => {
    //   console.log(element);
    // });
    const { id, firstName, last_Name } = user;
    const amount = inputs[1].value.trim();
    const payment_mode = inputs[2].value.trim();
    const wallet = inputs[3].value.trim();
    const transId = inputs[4].value.trim();
    const transStatus = inputs[5].value.trim();
    const dateOfTrans = inputs[6].value.trim();

    const jsonData = {
      id: editedData.id,
      amount,
      payment_mode,
      wallet,
      transId,
      transStatus,
      dateOfTrans,
      userId: id,
    };
    // console.log(jsonData);
    axios
      .put(`../api/task/editcryptoWithdrawal`, jsonData)
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
<td>${firstName} ${last_Name}</td>
<td>${amount}</td>
<td>${payment_mode}</td>
<td>${wallet}</td>
<td>${transId}</td>
<td>${transStatus}</td>
<td>${dateOfTrans}</td>
<td>
  <button data-user-id="${editedData.id}" class="btn btn-warning btn-md edit-deposit-details">Edit withdrawal details</button>
</td>
<td>
  <button data-user-id="${editedData.id}" class="btn btn-danger btn-md delete-deposit">Delete withdrawal</button>
</td>
<td>
  <button data-user-id="${editedData.id}" class="btn btn-secondary btn-md disapprove-deposit">Disapprove withdrawal</button>
</td>
<td>
  <button data-user-id="${editedData.id}" class="btn btn-success btn-md approve-deposit">Approve withdrawal</button>
</td>
  `;
  }
});
