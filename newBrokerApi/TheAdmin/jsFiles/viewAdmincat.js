document.addEventListener("DOMContentLoaded", function () {
  const tablebody = document.querySelector("#tbody");
  const pagination = document.querySelector("#pagination");
  let currentPage = 1; // Current page number
  const itemsPerPage = 15; // Number of items per page

  let count = 0;
  let html;
  let pagenum;
  let totalPages;
  let pid, imagesHTML, countContent, fname, lname;

  axios
    .get("../api/task/viewAdmincat")
    .then(function (response) {
      const result = response.data.message;
      if (response.status === 201) {
        totalPages = Math.ceil(result.length / itemsPerPage);
        pagenum = result.length;
        renderPagination(totalPages);
        axios
          .get(
            `../api/task/viewAdmincatLimit/${currentPage},${itemsPerPage}`
          )
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
              toastr["error"](message);
            } else {
              console.error(error);
            }
          });
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        toastr["error"](message);
      } else {
        console.error(error);
      }
    });
  function fetchUserData(userId) {
    return axios
      .get(`../api/task/fetUserById/${userId}`)
      .then(function (response) {
        const result = response.data.message;
        if (response.status === 201) {
          return { fname: result.fname, lname: result.lname };
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          toastr["error"](message);
        } else {
          console.error(error);
        }
      });
  }

  // Function to render table rows
  function renderTableRows(data) {
    count = (currentPage - 1) * itemsPerPage; // Reset count based on current page
    let html = "";
    data.forEach((element, index) => {
      pid = element.getUserId;
      fetchUserData(pid)
        .then(({ fname, lname }) => {
          count++; // Increment count for each row
          if (count > pagenum) {
            count = 1; // Reset count if it exceeds the total number of items
          }
          const productImgArray = element.imageUrl;

          html += `
              <tr>
                  <th scope="row">${count}</th>
                  <td>
                  <p class="text-muted">${fname} ${lname}</p>
              </td>
                  <td>
                      <p class="text-muted">${element.productName}</p>
                  </td>
     
                  <td>
                      <p class="text-muted">${element.price}</p>
                  </td>
                  <td>
                  <img src="${productImgArray}" alt="Product Image" height='80' width='80'>
              </td>
                  <td>
                      <p class="text-muted">${element.quantity}</p>
                  </td>
               
                  <td>
                      <p class="text-muted">${element.created_at}</p>
                  </td>
                  <td>
                      <p class="text-muted">#${element.productId}</p>
                  </td>
                 
                  <td>
                      <p class="text-muted"><button data-category-id="${element.id}" class="btn btn-danger btn-md delete-product">delete cart</button>
              
                      </p>
                  </td>
              </tr>`;
          tablebody.innerHTML = html;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  // Function to render pagination buttons
  function renderPagination(totalPages) {
    let html = "";
    const maxVisiblePages = 4;

    // Previous button
    html += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""} ">
      <a class="page-link prev" href="#" data-page="${currentPage - 1}"  >&laquo;</a>
    </li>
    `;

    // Numbered pagination buttons
    if (totalPages <= maxVisiblePages) {
      // If totalPages is less than or equal to maxVisiblePages, display all pages
      for (let i = 1; i <= totalPages; i++) {
        html += `
        <li class="page-item ${currentPage === i ? "active" : ""}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
        `;
      }
    } else {
      // If totalPages is greater than maxVisiblePages, display first maxVisiblePages pages followed by ellipsis
      for (let i = 1; i <= maxVisiblePages; i++) {
        html += `
        <li class="page-item ${currentPage === i ? "active" : ""}">
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
    <li class="page-item ${currentPage === totalPages ? "disabled" : " next"}">
      <a class="page-link next" href="#" data-page="${currentPage + 1}"  >&raquo;</a>
    </li>
    `;

    pagination.innerHTML = html;
  }

  // Event listener for pagination click
  pagination.addEventListener("click", function (event) {
    event.preventDefault();
    if (
      event.target.tagName === "A" &&
      !event.target.classList.contains("prev") &&
      !event.target.classList.contains("next")
    ) {
      const paginationItems = pagination.querySelectorAll(".page-item");
      paginationItems.forEach((item) => {
        item.classList.remove("active");
      });

      event.target.parentNode.classList.add("active");

      currentPage = parseInt(event.target.dataset.page);
      fetchData();
    } else if (
      event.target.classList.contains("next") &&
      currentPage < totalPages
    ) {
      currentPage++;
      renderPagination(totalPages);
      fetchData();
    } else if (event.target.classList.contains("prev") && currentPage > 1) {
      currentPage--;
      renderPagination(totalPages);
      fetchData();
    }
  });

  // Function to fetch data from server
  function fetchData() {
    axios
      .get(
        `../api/task/viewAdmincatLimit/${currentPage},${itemsPerPage}`
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
          toastr["error"](message);
        } else {
          console.error(error);
        }
      });
  }

  // Add event listener to the table body to handle click events on delete buttons
  tablebody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-product")) {
      const categoryId = event.target.dataset.categoryId;
      axios
        .delete(`../api/task/delProduct/${categoryId}`)
        .then((response) => {
          const result = response.data.message;
          if (response.status === 201) {
            const message = result;
            toastr.success(message);
            event.target.closest("tr").remove();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            toastr["error"](message);
          } else {
            console.error(error);
          }
        });
    }
  });

  // Add event listener to handle click events on the "Edit" buttons
  tablebody.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-product")) {
      const row = event.target.closest("tr");
      const countContent = row.querySelector("th").textContent.trim(); // Get the value of countContent before modification
      const productId = event.target.dataset.productId;

      // Fetch data for the specific product ID
      axios
        .get(`../api/task/viewAdmincat/${productId}`)
        .then(function (response) {
          const result = response.data.message;
          if (response.status === 201) {
            renderEditForm(row, countContent, result); // Pass the row, countContent, and the fetched data to render the edit form
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            toastr["error"](message);
          } else {
            console.error(error);
          }
        });
    }
  });

  // Function to render edit form with fetched data
  function renderEditForm(row, countContent, data) {
    // Extract values from the fetched data
    const productName = data.productName;
    const description = data.description;
    const category = data.category;
    const price = data.price;
    const slashedPrice = data.slashedPrice;
    const rating = data.rating;
    const created_at = data.created_at;
    const productId = data.productId;
    const productImgArray = JSON.parse(data.productimg);
    let imagesHTML = "";
    productImgArray.forEach((imageUrl) => {
      imagesHTML += `
      <div class="col">
          <img src="${imageUrl}" alt="Product Image" height='80' width='80'>
      </div>
    `;
    });

    // Replace the content of the row with the edit form
    row.innerHTML = `
    <th scope="row">${countContent}</th>
    <td><input type="text" class="form-control" value="${productName}"></td>
    <td><input type="text" class="form-control" value="${description}"></td>
    <td><input type="text" class="form-control" value="${category}"></td>
    <td><input type="text" class="form-control" value="${price}"></td>
    <td><input type="text" class="form-control" value="${slashedPrice}"></td>
    <td><input type="text" class="form-control" value="${rating}"> stars</td>
    <td><input type="text" class="form-control" value="${created_at}" disabled></td>
    <td><input type="text" class="form-control" value="${productId}" disabled></td>
    <td> <div class="horizontal-line">${imagesHTML}</div></td>
    <td>
      <button class="btn btn-success btn-sm save-product" data-product-id="${data.id}">Save</button>
      <button class="btn btn-danger btn-sm cancel-edit">Cancel</button>
    </td>
  `;
    // Remove borders from all table cells
    row.querySelectorAll("input").forEach((td) => {
      td.style.border = "none";
      td.style.width = "200px";
    });
    // Remove borders from the table row
    row.style.border = "none";
  }

  // Add event listener to handle click events on the "Save" and "Cancel" buttons within the edit mode
  tablebody.addEventListener("click", function (event) {
    const row = event.target.closest("tr");
    if (event.target.classList.contains("save-product")) {
      const productId = event.target.dataset.productId;
      const countContent = row.querySelector("th").textContent.trim(); // Get the value of countContent before modification

      // Fetch data for the specific product ID
      axios
        .get(`../api/task/viewAdmincat/${productId}`)
        .then(function (response) {
          const editedData = response.data.message;
          if (response.status === 201) {
            renderUpdatedRow(row, countContent, editedData); // Pass the row and the fetched data to update the row
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            toastr["error"](message);
          } else {
            console.error(error);
          }
        });
    } else if (event.target.classList.contains("cancel-edit")) {
      location.reload(); // Reload the page to cancel editing and reset changes
    }
  });

  // Function to update the row with the saved data
  function renderUpdatedRow(row, countContent, editedData) {
    const inputs = row.querySelectorAll("input");
    const productName = inputs[0].value.trim();
    const description = inputs[1].value.trim();
    const category = inputs[2].value.trim();
    const price = inputs[3].value.trim();
    const slashedPrice = inputs[4].value.trim();
    const rating = inputs[5].value.trim();
    const created_at = editedData.created_at;
    const productId = editedData.productId;
    const productImgArray = JSON.parse(editedData.productimg);
    let imagesHTML = "";
    productImgArray.forEach((imageUrl) => {
      imagesHTML += `
      <div class="col">
          <img src="${imageUrl}" alt="Product Image" height='80' width='80'>
      </div>
    `;
    });
    const jsondata = {
      productName: productName,
      description: description,
      category: category,
      price: price,
      slashedPrice: slashedPrice,
      rating: rating,
      id: editedData.id,
    };

    // Send Axios request to save edited data
    axios
      .post("../api/task/editProduct", jsondata)
      .then(function (response) {
        const result = response.data;
        // console.log(response.status);
        if (response.status === 201) {
          const message = result.message;
          toastr["success"](message);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          toastr["error"](message);
        } else {
          console.error(error);
        }
      });

    // Update the row with the saved data
    row.innerHTML = `
    <th scope="row">${countContent}</th>
    <td><p class="text-muted">${productName}</p></td>
    <td><p class="text-muted">${description}</p></td>
    <td><p class="text-muted">${category}</p></td>
    <td><p class="text-muted">${price}</p></td>
    <td><p class="text-muted">${slashedPrice}</p></td>
    <td><p class="text-muted">${rating} stars</p></td>
    <td><p class="text-muted">${created_at}</p></td>
    <td>#<p class="text-muted">${productId}</p></td>
    <td>
      <div class="horizontal-line">
        ${imagesHTML}
      </div>
    </td>
    <td>
      <button data-category-id="${editedData.id}" class="btn btn-danger btn-md delete-product">Delete</button>
      <button data-product-id="${editedData.id}" class="btn btn-primary btn-md edit-product">Edit</button>
    </td>
  `;
  }
});
