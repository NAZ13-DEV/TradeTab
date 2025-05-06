document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('#footer');

  const setHeaderHtml = function () {
    const html = ` <div class="container pt-14 pt-md-17 pb-7">
      <div class="row gy-6 gy-lg-0">
        <div class="col-lg-4">
          <div class="widget">
            <h3 class="h2 mb-3">Join the Community</h3>
            <p class="lead mb-5">We aim to give everyone access to the financial system, regardless of their background
              or bank account balance. That’s why we have uniform interest rates, no account minimums, and a product
              that was designed from the ground up for small accounts.</p>
          </div>
          <!-- /.widget -->
        </div>
        <!-- /column -->
        <div class="col-md-4 col-lg-2 offset-lg-2">
          <div class="widget">
            <h4 class="widget-title mb-3">Need Help?</h4>
            <ul class="list-unstyled text-reset mb-0">
              <!-- <li><a href="contact">Contact</a></li> -->
              <li><a href="how-to-invest">How to Invest</a></li>
              <li><a href="faq">F.A.Q</a></li>
              <li><a href="terms-and-conditions">Terms of Use</a></li>
              <li><a href="privacy">Privacy Policy</a></li> 
            </ul>
          </div>
          <!-- /.widget -->
        </div>
        <!-- /column -->
        <div class="col-md-4 col-lg-2">
          <div class="widget">
            <h4 class="widget-title mb-3">Learn More</h4>
            <ul class="list-unstyled text-reset mb-0">
              <li><a href="/login">Login</a></li>
              <li><a href="about">About Us</a></li>
              <li><a href="investor-relations">Investor Relations</a></li>
              <li><a href="our-commitments">Our Commitments</a></li>
              <li><a href="blog">Our Blog</a></li>
            </ul>
          </div>
          <!-- /.widget -->
        </div>
        <!-- /column -->
        <div class="col-md-4 col-lg-2">
          <div class="widget">
            <h4 class="widget-title mb-3">Get in Touch</h4>
            <address> <span id="siteAddress"></span></address>
            <a copmemail><span id="siteMail"></span></a>
            <br><a><span id="siteNumber"></span></a>
          </div>
          <!-- /.widget -->
        </div>
        <!-- /column -->
      </div>
    
      <hr class="mt-13 mt-md-15 mb-7" />
      <div class="d-md-flex align-items-center justify-content-between">
        <p class="mb-2 mb-lg-0">© ${new Date().getFullYear()} <span id="siteName"></span> . All rights reserved.
          <span id="siteName"></span> means <span id="siteName"></span> Markets and web experiences with its family of wholly owned subsidiaries which includes
          <span id="siteName"></span> , <span id="siteName"></span> Securities, and <span id="siteName"></span> Crypto.
          All investments involve risk and loss of capital.
          Securities trading is offered to self-directed customers by <span id="siteName"></span> . <span id="siteName"></span>  operates as a
          subsidiary of <span id="siteName"></span> Asset Management a member of the Financial Industry Regulatory Authority (FINRA). With
          FINRA number is 164193, and the SEC number is 801-115048.
        <nav class="nav social text-md-end">
    
        </nav>
 
      </div>
    
    </div>`;
    header.insertAdjacentHTML('beforeend', html);
  };
  setHeaderHtml();
});
