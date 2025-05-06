document.addEventListener('DOMContentLoaded', function () {
  const tablebody = document.querySelector('#tbody');
  const pagination = document.querySelector('#pagination');
  const userIden = document.querySelector('#userId');
  const Amount = document.querySelector('#Amount');
  const Amountn = document.querySelector('#Amountn');
  const umessageId = document.querySelector('#umessageId');
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
  const exampleModalContentLabel = document.querySelector('#exampleModalContentLabel');
  const exampleModalContentProfileLabel = document.querySelector('#exampleModalContentProfileLabel');
  const addform = document.getElementById('addform');
  const addprofitform = document.getElementById('addprofitform');
  const fetchUser = fetchUserDetailsWithAxios();


  let currentPage = 1; // Current page number
  const itemsPerPage = 15; // Number of items per page

  let count = 0;
  let html;
  let pagenum;
  let totalPages;

  axios
    .get('../api/task/Viewuploadkyc')
    .then(function (response) {
      const result = response.data.message;
      if (response.status === 201) {
        totalPages = Math.ceil(result.length / itemsPerPage);
        pagenum = result.length;
        renderPagination(totalPages);
        axios
          .get(
            `../api/task/FetchAllUProofKyc/${currentPage},${itemsPerPage}`
          )
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
            DocumentType,
            userid,
            FrontView,
            BackView,
            Status,
            submitDate,
            approveDate,
          } = element;
console.log( FrontView ,
  BackView=== "null",);
          axios.get(`../api/task/fetchUserDetails/${userid}`).then((response) => {
              if (response.status === 201) {
                  const readResult = response.data.message;
                  const { firstName, last_Name } = readResult
                  html += `
            <tr>
                <th scope="row">${count}</th>
                <td>${firstName} ${last_Name}</td> 
                <td>${DocumentType}</td>
                <td>${userid}</td>
                <td>
                ${FrontView !== "null"  ? `<img src="${JSON.parse(FrontView)}" alt="proof Image" height='120' width='120'>` : ""}
              </td>
              <td>
                ${BackView !== "null" ? `<img src="${JSON.parse(BackView)}" alt="proof Image" height='120' width='120'>` : ""}
              </td>
                <td>${Status}</td>
                <td>${submitDate}</td>
                <td>${approveDate}</td>
                <td>
                <button data-user-id="${id}" class="btn btn-danger btn-md delete-user">Delete kyc</button>
                </td>
                <td>
<button data-user-id="${id}" class="btn btn-secondary btn-md disapprove-deposit">Disapprove kyc</button>
</td>
<td>
<button data-user-id="${id}" class="btn btn-success btn-md approve-deposit">Approve kyc</button>
</td>
            </tr>
          `;
                  tablebody.innerHTML = html;
              }
          }).catch(function (error) {
              console.error(error);
          });


      });
  }

  // Function to render pagination buttons
  function renderPagination(totalPages) {
      let html = '';
      const maxVisiblePages = 4;

      // Previous button
      html += `
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link prev" href="#" data-page="${currentPage - 1}">&laquo;</a>
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
              <li class="page-item">
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
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''} next">
            <a class="page-link next" href="#" data-page="${currentPage + 1}">&raquo;</a>
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
      axios.get(`../api/task/FetchAllUProofKyc/${currentPage},${itemsPerPage}`)
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
            .delete(`../api/task/deletkyc/${userid}`)
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

});
