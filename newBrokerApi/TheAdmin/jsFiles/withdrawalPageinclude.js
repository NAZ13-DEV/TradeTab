document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".contents");
  const setHeaderHtml = function () {
    const html = ` <main class="body">
    <div class="" id="close">
      <!-- Payment details card -->
      <div class=" p-md-5 p-md-5 p-4" id="close">
        <div class="fw-bolder mb-4">
          <span class="ps-1">
          <h3 id="sp">Your withdrawal is halfway processed input the required details to complete your withdrawal </h3>
            </span>
          </span>
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between text">
          <div class="container" >
          <div class="row"id="hiddenwallet">
              <div class="col-md-12" id="walletinput">
                  <span id="walletHeadd" style="text-transform: uppercase; font-weight:600"><i class="fas fa-wallet"></i> Input Your Wallet</span>
                  <div class="input-group mb-3">
                  <input type="text" class="js-toggle-password form-control form-control-lg" name="text" id="walletInput" placeholder="Input your wallet">
                   
                </div>
                              <div class="row">
  <div class="col-md-12 text-center mt-4">
    <button class="btn btn-outline-primary" type="button" id="wallet_submit" style="border:1.5px solid #193d2f">Click to continue</button>
  </div>
</div>
              </div>

      </div>
      
      <div id="toBeHidden">
      <div class="row">
      <div class="col-md-12">
          <span id="" style="text-transform: uppercase; font-weight:600"><i class="fas fa-university" id="smallers"></i> Bank Name</span>
          <input type="text" class=" form-control form-control-lg" name="bankName" id="" placeholder="Input your bank name">
      </div>
</div>
<div class="row">
<div class="col-md-12">
<span id="" style="text-transform: uppercase; font-weight: 600; display: inline-block;">
<i class="fas fa-user-cog" id="smallers"></i>
Account Number
</span>

    <input type="number" class=" form-control form-control-lg" name="accNum" id="" placeholder="Input your account number"  maxlength="11" max="11">
</div>
</div>
<div class="row">
<div class="col-md-12">
    <span id="" style="text-transform: uppercase; font-weight:600"><i class="fab fa-audible" id="smallers"></i> Account Name</span>
    <input type="text" class=" form-control form-control-lg" name="accName" id="" placeholder="Input your account name">
</div>
</div>

<div class="row">
<div class="col-md-12">
    <span id="" style="text-transform: uppercase; font-weight:600"><i class="fas fa-globe" id="smallers"></i> Country</span>
    <input type="text" class="form-control form-control-lg" name="country" id="" placeholder="Input the name of your country">
</div>
</div>
<div class="row">
<div class="col-md-12">
    <span id="" style="text-transform: uppercase; font-weight:600"><i class="fal fa-globe-americas" id="smallers"></i> Swift Code</span>
    <input type="text" class=" form-control form-control-lg" name="swiftcode" id="" placeholder="Input your swift code">
</div>
</div>
<div class="row">
<div class="col-md-12">
    <span id="" style="text-transform: uppercase; font-weight:600"><i class="fal fa-comment-alt-edit" id="smallers"></i> narration</span>
    <input type="text" class=" form-control form-control-lg" name="narration" id="" placeholder="Input your narration">
</div>
</div>
<div class="row">
  <div class="col-md-12 text-center mt-4">
    <button class="btn btn-outline-primary" type="button" id="bnk_submit" style="border:1.5px solid #193d2f">Click to continue</button>
  </div>
</div>

      </div>
          </div>
          <div class="d-flex align-items-center justify-content-between text mb-4">
          </div>
          <div class="d-flex align-items-center justify-content-between text mb-4">
          </div>
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
          <p id="success"></p>
         
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
