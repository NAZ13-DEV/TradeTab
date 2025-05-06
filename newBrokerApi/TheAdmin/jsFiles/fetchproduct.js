document.addEventListener("DOMContentLoaded", function () {
  const param = getParamDetailsFromLinks();

  category = param.cat;
  const pagination = document.querySelectorAll(".pg-pagination");
  const metisMenu = document.querySelector("#metis-menu");
  let html, select;

  axios
    .get("newApi/api/task/viewcat")
    .then(function (response) {
      const result = response.data.message;
      if (response.status === 201) {
        result.forEach((element, index) => {
          html = ` 
            <li><a href="shop?cat=${element.category.trim()}">${element.category}</a></li><li>
          `;
          metisMenu.insertAdjacentHTML("beforeend", html);
        });
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        toastr["error"](message);
      } else {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          toastr["error"](message);
        } else {
          console.error(error);
        }
      }
    });
  pagination.forEach((pagination) => {
    let currentPage = 1; // Current page number
    const itemsPerPage = 15; // Number of items per page
    let totalPages;

    fetchDataAndRender();
    function fetchDataAndRender() {
      let apiEndpoint = "newApi/api/task/viewProduct";
      if (category) {
        // If category parameter exists, fetch posts based on the category
        apiEndpoint = `newApi/api/task/viewcatProduct/${category}`;
      }

      axios
        .get(apiEndpoint)
        .then(function (response) {
          const result = response.data.message;

          if (response.status === 201) {
            totalPages = Math.ceil(result.length / itemsPerPage);
            renderPagination(totalPages, result.length);
            renderProductItems(getCurrentPageItems(result));
            renderProductsItems(getCurrentPageItems(result));
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

    function renderProductsItems(data) {
      const producttContainer = document.querySelector("#seconditem");
      let productHTML = "";
      data.forEach((element) => {
        const productName = element.productName;
        const price = element.price;
        const slashedPrice = element.slashedPrice;
        const rating = element.rating;
        const productImgArray = JSON.parse(element.productimg);
        const imageUrl = productImgArray[0]; // Assuming first image is used
        const productId = element.id; // Assuming productId is available

        productHTML += `
      <div class="col-xl-4 col-lg-6 col-md-6 col-12">
      <div class="horizontal-product-item">
        <div class="product-image">
          <img src="${imageUrl}" alt="">
        </div>
        <div class="product-info">
          <h2><a href="product-single">${productName}</a></h2>
          <div class="rating-product">
          ${renderStars(rating)} 
        </div>
          <div class="price">
          <span class="present-price">$${price}</span>
          <del class="old-price">$${slashedPrice}</del>
         
          </div>
        </div>
      </div>
    </div>
`;
      });
      producttContainer.innerHTML = productHTML;
    }
    function renderProductItems(data) {
      const productContainer = document.querySelector("#con");
      let productHTML = "";
      data.forEach((element) => {
        const productName = element.productName;
        const price = element.price;
        const slashedPrice = element.slashedPrice;
        const rating = element.rating;
        const productImgArray = JSON.parse(element.productimg);
        const imageUrl = productImgArray[0]; // Assuming first image is used
        const productId = element.id; // Assuming productId is available

        productHTML += `
      <div class="col-lg-3 col-md-6 col-sm-6 col-12">
    
        <div class="product-item wow fadeInUp" data-wow-duration="1200ms">
          <div class="product-image">
            <img src="${imageUrl}" alt="Product Image">
            <!-- Add your tag and info wrap here -->
            <ul class="tag-wrap">
            <li class="tag new">sale</li>
          </ul>
            ${element.tags ? `<ul class="tag-wrap">${renderTags(element.tags)}</ul>` : ""}
            <ul class="info-wrap">
              <li>
                <a data-bs-toggle="tooltip" data-bs-html="true" title="Add to Wishlist" data-bs-placement="left"><i class="icon-heart" aria-hidden="true"></i></a>
              </li>
              
              <li data-bs-toggle="modal" data-bs-target="#modal-cart-view">
                <button class="btn-quick-view" data-bs-toggle="modal" data-bs-target="#modal-cart-view" data-product-id="${productId}">
                  <i class="icon-open-eye-1"></i>
                </button>
              </li>
            </ul>
          </div>
          <div class="product-info">
            <h2>  
              <a href="product-single?pI=${element.productId}">${productName}</a>
            </h2>
            <div class="rating-product">
              ${renderStars(rating)} 
            </div>
            <div class="price">
              <span class="present-price">$${price}</span>
              <del class="old-price">$${slashedPrice}</del>
             
            </div>
          </div>
        </div> 
      </div>`;
      });
      productContainer.innerHTML = productHTML;

      // Add event listener to eye buttons
      const eyeButtons = document.querySelectorAll(".btn-quick-view");
      eyeButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-product-id");
          // console.log(productId);
          displayProductModal(productId);
        });
      });
    }

    // Function to display the modal with the product image
    function displayProductModal(productId) {
      axios
        .get(`newApi/api/task/viewProduct/${productId}`)
        .then(function (response) {
          // console.log(response);
          const result = response.data.message;
          if (response.status === 201) {
            let productHTML = "";
            const modal = document.getElementById("modal-cart-view");
            const productName = result.productName;
            const price = result.price;
            const slashedPrice = result.slashedPrice;
            const rating = result.rating;
            const productImgArray = JSON.parse(result.productimg);
            const imageUrl = productImgArray[0]; // Assuming first image is used
            const productId = result.id; // Assuming productId is available

            productHTML += `<a href="product-single?pI=${result.productId}"> 
            <div class="modal-dialog cart-quickview" id="clickable">
            <div class="modal-content">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <i class="icon-icon_close"></i></button>
              <div class="modal-body d-flex">
                <div class="product-details">
                  <div class="row align-items-center">
                    <div class="col-lg-5">
                      <div class="product-single-img">
                        <div class="item">
                          <img src="${imageUrl}" alt="">
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-7">
                      <div class="product-single-content">
                        <h5>${productName}</h5>
                        <div class="rating-product">
                        ${renderStars(rating)} 
                      </div>
                        <h6> <span class="present-price">$${price}</span>
                        <del class="old-price">$${slashedPrice}</del></h6>
                        <p>${result.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               </div>
              </div>
              </a>`;
            modal.innerHTML = productHTML;
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

    // Helper function to render star icons
    function renderStars(rating) {
      const filledStars = '<i class="icon-star"></i>'.repeat(rating);
      const grayStars = '<i class="icon-star gray"></i>'.repeat(5 - rating);
      return filledStars + grayStars;
    }

    // Function to get items for the current page
    function getCurrentPageItems(data) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    }

    function renderPagination(totalPages, totalResults) {
      let html = "";
      const maxVisiblePages = 4;

      // Previous button
      html += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link prev ${currentPage === 1 ? "disabled" : ""}" href="#" data-page="${currentPage - 1}">
        <i class="icon-angale-right"></i>
      </a>
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
        // Add ellipsis and last page
        html += `
        <li class="page-item ">
          <span class="page-link">...</span>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
        </li>
      `;
      }

      // Next button

      html += `
  <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
    <a class="page-link next ${currentPage === totalPages ? "disabled" : ""}" href="#" data-page="${currentPage + 1}">
      <i class="icon-angale-right2"></i>
    </a>
  </li>
`;

      pagination.innerHTML = html;
      const resultsMessage = document.querySelector("#results-message");
      const startResult = (currentPage - 1) * itemsPerPage + 1;
      const endResult = Math.min(currentPage * itemsPerPage, totalResults);
      resultsMessage.textContent = `Showing ${startResult}–${endResult} of ${totalResults} results`;

      // Add event listeners to pagination buttons
      const pageLinks = pagination.querySelectorAll(".page-link");
      pageLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const page = parseInt(this.dataset.page);
          if (!isNaN(page) && page !== currentPage) {
            currentPage = page;
            fetchDataAndRender();
          }
        });
      });
    }
    const addToCartButtons = document.querySelectorAll("a.btn-style-1");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (eee) {});
      // console.log(button);
    });
  });
});
