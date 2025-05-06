document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('#headerBlog');
  
    const setHeaderHtml = function () {
      const html = ` 
             <nav class="navbar center-nav transparent navbar-expand-lg navbar-light">
          <div class="container flex-lg-row flex-nowrap align-items-center">
            <div class="navbar-brand w-100"><a href="/"><img src="../img/logo.png" srcset="../img/logo.png 2x" alt="" /></a>
            </div>
            <div class="navbar-collapse offcanvas-nav">
              <div class="offcanvas-header d-lg-none d-xl-none">
                <a href="/"><img src="../img/logo-light.png" srcset="../img/logo.png 2x" alt="" /></a>
                <button type="button" class="btn-close btn-close-white offcanvas-close offcanvas-nav-close"
                  aria-label="Close"></button>
              </div>
              <ul class="navbar-nav">
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#!">Product</a>
                  <ul class="dropdown-menu">
                    <li class="nav-item"><a class="dropdown-item"
                        href="stocks-and-funds">Stocks and Funds</a></li>
                    <li class="nav-item"><a class="dropdown-item"
                        href="crypto">Crypto</a></li>
                    <li class="nav-item"><a class="dropdown-item" href="gold">Gold</a>
                    </li>
                    <li class="nav-item"><a class="dropdown-item"
                        href="cash-management">Cash Management</a></li>
                    <li class="nav-item"><a class="dropdown-item"
                        href="options">Options</a></li>
                  </ul>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#!">Learn</a>
                  <ul class="dropdown-menu">
                    <li class="nav-item"><a class="dropdown-item"
                        href="how-to-invest">How to invest</a></li>
                  </ul>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#!">Who we Are</a>
                  <ul class="dropdown-menu">
                    <li class="nav-item"><a class="dropdown-item" href="about">About
                        Us</a></li>
                    <li class="nav-item"><a class="dropdown-item"
                        href="our-commitments">Our Commitments</a></li>
                    <li class="nav-item"><a class="dropdown-item"
                        href="investor-relations">Investor Relations</a></li>
                    <li class="nav-item"><a class="dropdown-item" href="blog">Blog</a>
                    </li>
                  </ul>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#!">Features</a>
                  <ul class="dropdown-menu">
                    <li class="nav-item"><a class="dropdown-item"
                        href="trading-bots">Trading Bots</a></li>
                    <li class="nav-item"><a class="dropdown-item" href="pro-tools">Pro
                        Tools</a></li>
                    <li class="nav-item"><a class="dropdown-item"
                        href="trailing-feature">Trailing Features</a></li>
                    <li class="nav-item"><a class="dropdown-item"
                        href="copy-trading">Copy Trading</a></li>
                    <li class="nav-item"><a class="dropdown-item"
                        href="automated-trading">Automated Trading</a></li>
                    <li class="nav-item"><a class="dropdown-item" href="ai-trading">AI
                        Trading</a></li>
                    <li class="nav-item"><a class="dropdown-item" href="get-funded">Get
                        Funded</a></li>
  
                  </ul>
                <li class="nav-item"><a class="nav-link" href="faq">F.A.Q</a>
              </ul>
              <!-- /.navbar-nav -->
            </div>
            <!-- /.navbar-collapse -->
            <div class="navbar-other w-100 d-flex ms-auto">
              <ul class="navbar-nav flex-row align-items-center ms-auto" data-sm-skip="true">
                <li class="nav-item dropdown language-select text-uppercase">
                  <a class="nav-link dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"><i class="uil uil-info-circle"></i></a>
                  <ul class="dropdown-menu">
                    <li class="nav-item"><a class="dropdown-item" href="register">Sign
                        up</a></li>
                    <li class="nav-item"><a class="dropdown-item"
                        href="terms-and-conditions">Terms & Condition</a></li>
                    <li class="nav-item"><a class="dropdown-item" href="privacy">Privacy
                        Policy</a></li>
                  </ul>
                </li>
                <li class="nav-item d-md-block">
                  <a href="dashboard" class="btn btn-sm btn-primary">Dashboard</a>
                </li>
                <li class="nav-item d-lg-none">
                  <div class="navbar-hamburger"><button class="hamburger animate plain"
                      data-toggle="offcanvas-nav"><span></span></button></div>
                </li>
              </ul>
              <!-- /.navbar-nav -->
            </div>
            <!-- /.navbar-other -->
          </div>
          <!-- /.container -->
        </nav>`;
      header.insertAdjacentHTML('beforeend', html);
    };
    setHeaderHtml();
  });
  


// for image directory of logo image 