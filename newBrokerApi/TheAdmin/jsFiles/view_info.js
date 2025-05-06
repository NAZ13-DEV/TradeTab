document.addEventListener("DOMContentLoaded", function () {
  const tablebody = document.querySelector("#tbody");
  let count = 0;
  let html;

  axios
    .get("../api/task/viewinfo")
    .then(function (response) {
      const result = response.data.message;
      if (response.status === 201) {
        result.forEach((element, index) => {
          count++;
          html = `
                      <tr>
                          <th scope="row">${count}</th>
                          <td>
                              <p class="text-muted">${element.meth}</p>
                          </td>
                          <td>
                              <p class="text-muted">${element.per}%</p>
                          </td>
                          <td>
                              <p class="text-muted">$${element.ecotax}</p>
                          </td>
                          <td>
                          <p class="text-muted">$${element.delivery}</p>
                      </td>
                          <td>
                              <p class="text-muted"><button data-category-id="${element.id}" class="btn btn-danger btn-md delete-category">delete category</button></p>
                          </td>
                      </tr>`;
          tablebody.insertAdjacentHTML("beforeend", html);
        });
      }
      // Add event listener to the table body to handle click events on delete buttons
      tablebody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-category")) {
          const categoryId = event.target.dataset.categoryId;
          axios
            .delete(`../api/task/delinfo/${categoryId}`)
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
    })
    .catch(function (error) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        toastr["error"](message);
      } else {
        console.error(error);
      }
    });
});
