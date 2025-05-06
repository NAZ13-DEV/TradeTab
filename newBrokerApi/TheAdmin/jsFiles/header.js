document.addEventListener("DOMContentLoaded", function () {
  const headerContent = document.querySelector(".generalHeader");
  console.log(headerContent);
  const headerConentFunction = function () {
    const html = `
    <!--  start header-middle -->
    <div class="header-middle">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-3">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="index.html"><img src="assets/images/logo.png"
                                alt="logo"></a>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <form action="#" class="middle-box">
                        <div class="category">
                            <select name="service" class="form-control select">
                                <option disabled="disabled" selected="">categorys</option>
                                <option>Medicine</option>
                                <option>Medical</option>
                                <option>Equipment</option>
                                <option>Doctor</option>
                            </select>
                        </div>
                        <div class="search-box">
                            <div class="input-group">
                                <input type="search" class="form-control" placeholder="Search Products">
                                <button class="search-btn" type="submit"> <i><img
                                            src="assets/images/icon/search.png" alt=""></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-lg-3 col-12">
                    <div class="middle-right">
                        <ul>
                            <li><a href="wishlist.html"><i class="icon-heart"><span
                                            class="cart-count">2</span></i></a></li>
                            <li><a href="compare.html"><i class="icon-left-and-right-arrows-1"></i></a></li>
                            <li><a href="cart.html">
                                    <i class="icon-cart"><span class="cart-count">2</span></i>
                                    <p>
                                        <small>0 items</small>
                                        $99.00
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  end header-middle -->
    <!-- end topbar -->
   `;
    headerContent.insertAdjacentHTML("beforeend", html);
  };
  headerConentFunction();
});
