
 
<style>
::-webkit-scrollbar {
  display: none;
}

.errorMessage {
  color: red;
}

#errorOccurred {
  border: 1px solid red;
  box-shadow: 0 0 1rem 0 rgba(237, 76, 120, 0.25);
}

#successOccurred {
  border: 1px solid #064acb;
  box-shadow: 0 0 1rem 0 #064acb;
}
</style>
<nav class="navbar fixed-top">
  <div class="d-flex align-items-center navbar-left">
    <a href="#" class="menu-button d-none d-md-block">
      <svg class="main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 17">
        <rect x="0.48" y="0.5" width="7" height="1" />
        <rect x="0.48" y="7.5" width="7" height="1" />
        <rect x="0.48" y="15.5" width="7" height="1" />
      </svg>
      <svg class="sub" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17">
        <rect x="1.56" y="0.5" width="16" height="1" />
        <rect x="1.56" y="7.5" width="16" height="1" />
        <rect x="1.56" y="15.5" width="16" height="1" />
      </svg>
    </a>

    <a href="#" class="menu-button-mobile d-xs-block d-sm-block d-md-none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
        <rect x="0.5" y="0.5" width="25" height="1" />
        <rect x="0.5" y="7.5" width="25" height="1" />
        <rect x="0.5" y="15.5" width="25" height="1" />
      </svg>
    </a>

 
  </div>


  <a class="navbar-logo" href="index" style="background:#1e2022;">
    <img src="<?php echo sitelink ?>assets/1.png" alt="" height="40px">
  </a>

  <div class="navbar-right">
    <div class="header-icons d-inline-block align-middle">
      <div class="d-none d-md-inline-block align-text-bottom mr-3">
        <div class="custom-switch custom-switch-primary-inverse custom-switch-small pl-1" data-toggle="tooltip"
          data-placement="left" title="Dark Mode">
          <input class="custom-switch-input" id="switchDark" type="checkbox" checked>
          <label class="custom-switch-btn" for="switchDark"></label>
        </div>
      </div>

 
     
      <button class="header-icon btn btn-empty d-none d-sm-inline-block" type="button" id="fullScreenButton">
        <i class="simple-icon-size-fullscreen"></i>
        <i class="simple-icon-size-actual"></i>
      </button>

    </div>

    <div class="user d-inline-block">
      <button class="btn btn-empty p-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="name">Admin</span>
        <span>
          AD
        </span>
      </button>

 
    </div>
  </div>
</nav>