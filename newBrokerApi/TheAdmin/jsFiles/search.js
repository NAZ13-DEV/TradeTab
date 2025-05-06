document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".search-btn");
  const searchTerm = document.querySelector("#searchInput");
  const section = document.querySelectorAll("section");
  const productContainer = document.getElementById("searchResults");

  let sec;

  searchTerm.addEventListener("input", function (event) {
    event.preventDefault();
    let productHTML = "";
    if (this.value !== "") {
      axios
        .get(`newApi/api/task/searchProducts/${searchTerm.value}`)
        .then(function (response) {
          const result = response.data.message;

          if (response.status === 201) {
            section.forEach((e) => {
              e.style.display = "none";
            });

            result.forEach((el) => {
              const productName = el.productName;
              const price = el.price;
              const slashedPrice = el.slashedPrice;
              const rating = el.rating;
              const productImgArray = JSON.parse(el.productimg);
              const imageUrl = productImgArray[0]; // Assuming first image is used
              const productId = el.id; // Assuming productId is available
              productHTML += `
              <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                  <div class="product-item wow fadeInUp" data-wow-duration="1200ms" style="visibility: visible; animation-duration: 1200ms; animation-name: fadeInUp;">
                                      <div class="product-image">
                                          <img src="${imageUrl}" alt="">
                                          <ul class="tag-wrap">
                                              <li class="tag new">sale</li>
                                          </ul>
                                          ${el.tags ? `<ul class="tag-wrap">${renderTags(el.tags)}</ul>` : ""}
                                          <ul class="info-wrap">
                                              <li data-bs-toggle="modal" data-bs-target="#modal-cart-view">
                                                  <button data-bs-toggle="tooltip" class="btn-quick-view" data-bs-html="true" title="" data-product-id="${productId}" data-bs-placement="left" data-bs-original-title="QuickView" fdprocessedid="by4vz">
                                                      <i class="icon-open-eye-1"></i>
                                                  </button>
                                              </li>
                                          </ul>
                                      </div>
                                      <div class="product-info">
                                          <h2>
                                              <a href="product-single?pI=${el.productId}">${productName}</a>
                                          </h2>
                                          <div class="rating-product">
                                              ${renderStars(rating)} 
                                          </div>
                                          <div class="price">
                                              <span class="present-price">$${price}</span>
                                              <del class="old-price">$${slashedPrice}</del>
                                              <a class="cart-btn" href="shop" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="left" title="" data-bs-original-title="Add to Cart" aria-label="Add to Cart">
                                                  <i class="icon-cart"></i>
                                              </a>
                                          </div>
                                          <div class="available-info">
                                              <ul>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                              </div>`;
            });
            productContainer.innerHTML = productHTML;
            addQuickViewEventListeners();
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];

            if (message === null) {
              toastr["error"](
                "your search for this product is not found contact support"
              );
            }
          } else {
            console.error(error);
          }
        });
    } else {
      section.forEach((e) => {
        e.style.display = "block";
      });
      productContainer.innerHTML = "";
    }
  });

  function renderProductItems(data) {}

  // Helper function to render star icons
  function renderStars(rating) {
    const filledStars = '<i class="icon-star"></i>'.repeat(rating);
    const grayStars = '<i class="icon-star gray"></i>'.repeat(5 - rating);
    return filledStars + grayStars;
  }
  function addQuickViewEventListeners() {
    const eyeButtons = document.querySelectorAll(".btn-quick-view");
    eyeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-product-id");
        displayProductModal(productId);
      });
    });
  }
  function handleError(error) {
    if (error.response && error.response.status === 422) {
      const message = error.response.data.errors[0];
      toastr["error"](message);
    } else {
      console.error(error);
    }
  }
  function displayProductModal(productId) {
    axios
      .get(`newApi/api/task/viewProduct/${productId}`)
      .then(function (response) {
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
      .catch(handleError);
  }
});
