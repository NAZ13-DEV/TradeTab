document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".contents");
  const setHeaderHtml = function () {
    const html = ` <main class="body">
    <div class=" " id="close">
      <!-- Payment details card -->
      <div class="card box1 shadow-sm p-md-5 p-md-5 p-4" id="close">
        <div class="fw-bolder mb-4">
          <span class="ps-1">
            <span class="h1" id="crypt_Fraction"><b>0.00</b>
        
            </span>
          </span>
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between text">
            <span>
              <h2 id="amt"><b>0.0 USD</b></h2>
            </span>
          </div>
          <div class="d-flex align-items-center justify-content-between text mb-4">
            <span>
              <h2><b id="net">Network . </b></h2>
            </span>

          </div>
          <div class="d-flex align-items-center justify-content-between text mb-4">
            <span>
              <P class="pi"><b><i class="bi bi-info-circle"></i> you pay netwok fee</b></P>
            </span>
          </div>
          <div class="border-bottom mb-4"></div>
          <p class="mb-1 four">Copy the recipient's wallet addres or scan the qrcode</p>
         <div class="containerr">
  <div class="d-flex flex-column align-items-center justify-content-center mb-4 scroll" style="height: 30vh;">
    <div class="d-flex align-items-center">
      <img class="qr-code" id="qrcode" src="https://quickchart.io/qr?text=bc1qe6l29egtfs9kum3utygmew5n7quzngfcph4706" />
      <div class="d-flex align-items-center ps-3 truncate-address">
        <span class="add me-2" id="waallet">bc1qe6l29egtfs9kum3utygmew5n7quzngfcph4706</span>
        <i class="bi bi-qr-code me-2" id="qr"></i>
        <i class="bi-clipboard me-2" id="copy"></i>
        <i class="bi bi-check2 me-2" id="check"></i>
      </div>
      </div>
      </div>
      </div>

      <div class="card" id="close">
        <div class="loader-contain" id="close">
          <svg class="loader-svg">
            <circle cx="40" cy="40" r="30" fill="none" stroke="#203d2f4a" stroke-width="5" />
            <!-- Loader circle with stroke dash array -->
            <circle cx="40" cy="40" r="30" fill="none" stroke="#009688" stroke-width="5"
              stroke-dasharray="0, 160" />
          </svg>
          <div class="countdown-container">
            <p class="heavy">Expiration time<br><span id="countdown"></span></p>
          </div>
        </div>

      </div>
      <div class="card" id="close">
        <div class="loader-contain">
          <div class="loader"></div>
          <div class="countdown-container" id="close">
            <p class="heav">Checking transaction transaction<br></p>
          </div>
        </div>
      </div>
    </div>

 <div class="" id="open" >
    <div class="d-flex justify-content-center align-items-center">
    <div class="col-md-12">
      <div class=""></div>
      <div class="">
        <div class="mb-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-success" width="75" height="75" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path>
          </svg>
        </div>
        <div class="text-center">
          <h1>Thank You</h1>
          <p id="success">your deposit of $600, worth 600.00000000 USDT has been confirmed</p>
         
        </div>
      </div>
    </div>
  </div>
  </div>
  </main>`;
    header.insertAdjacentHTML("beforeend", html);
  };
  setHeaderHtml();
});
