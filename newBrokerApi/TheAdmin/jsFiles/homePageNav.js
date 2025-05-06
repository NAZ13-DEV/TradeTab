document.addEventListener('DOMContentLoaded', function () {
  const aside = document.querySelector('#aside');

  const setNavPage = function () {
    const html = `
            <div class="container-fluid">
              <div class="nk-header-wrap">
                <div class="nk-menu-trigger d-xl-none ms-n1">
                  <a
                    href="#"
                    class="nk-nav-toggle nk-quick-nav-icon"
                    data-target="sidebarMenu"
                  >
                    <em class="icon ni ni-menu"></em>
                  </a>
                </div>
                <div class="nk-header-brand d-xl-none">
                  <a
                    href="index"
                    class="logo-link"
                    style="border-radius: 5px; padding: 5px"
                  >
            <img style="height: 55px;width: 110px;"
                     class="logo-light logo-img"
                     src="../assets/1.png"
                     srcset="../assets/1.png 2x"
                     alt="logo"
                   />
                   <img style="height: 55px;width: 110px;"
                     class="logo-dark logo-img"
                     src="../assets/1.png"
                     srcset="../assets/1.png 2x"
                     alt="logo-dark"
                   />

                  </a>
                </div>
                <div class="nk-header-news d-none d-xl-block">
                  <div class="nk-news-list">
                    <a class="nk-news-item" href="#">
                      <div class="nk-news-icon">
                        <em class="icon ni ni-card-view"></em>
                      </div>
                      <div class="nk-news-text">
                        <p>
                          Do you know the latest update of 2022?
                          <span>
                            A overview of our is now available on YouTube
                          </span>
                        </p>
                        <em class="icon ni ni-external"></em>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="nk-header-tools">
                  <ul class="nk-quick-nav">
                    <li
                      class="dropdown language-dropdown d-none d-sm-block me-n1"
                    >
                      <a
                        href="#"
                        class="dropdown-toggle nk-quick-nav-icon"
                        data-bs-toggle="dropdown"
                      >
                        <div class="quick-icon border border-light">
                          <img class="icon" src="images/english-sq.png" alt />
                        </div>
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-end dropdown-menu-s1"
                      >
                        <ul class="language-list">
                          <li>
                            <a href="#" class="language-item">
                              <img
                                src="images/english.png"
                                alt
                                class="language-flag"
                              />
                              <span class="language-name">English</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="language-item">
                              <img
                                src="images/spanish.png"
                                alt
                                class="language-flag"
                              />
                              <span class="language-name">Español</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="language-item">
                              <img
                                src="images/french.png"
                                alt
                                class="language-flag"
                              />
                              <span class="language-name">Français</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" class="language-item">
                              <img
                                src="images/turkey.png"
                                alt
                                class="language-flag"
                              />
                              <span class="language-name">Türkçe</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li class="dropdown user-dropdown">
                      <a
                        href="#"
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <div class="user-toggle">
                          <div class="user-avatar sm">
                            <em class="icon ni ni-user-alt"></em>
                          </div>
                          <div class="user-info d-none d-md-block">
                            <div class="user-status user-status-verified">
                              Verified
                            </div>
                            <div class="user-name dropdown-indicator" id="username">
                         
                            </div>
                          </div>
                        </div>
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1"
                      >
                        <div
                          class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block"
                        >
                          <div class="user-card">
                            <div
                              class="user-avatar"
                              style="background-color: #3a25a7"
                            >
                              <span id="abbrName"></span>
                            </div>
                            <div class="user-info">
                              <span class="lead-text" id="username"> </span>
                              <span class="sub-text" id="userEmail"> 
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="dropdown-inner user-account-info">
                          <h6 class="overline-title-alt">Trading Account</h6>
                          <div class="user-balance" id="userBalance"> </div>
                          <a
                            href="deposit"
                            class="link"
                            style="color: white"
                          >
                            <span>Deposit Funds</span>
                            <em class="icon ni ni-wallet-out"></em>
                          </a>
                        </div>
                        <div class="dropdown-inner">
                          <ul class="link-list">
                            <li>
                              <a href="account">
                                <em class="icon ni ni-user-alt"></em>
                                <span>View Profile</span>
                              </a>
                            </li>
                            <li>
                              <a href="account">
                                <em class="icon ni ni-setting-alt"></em>
                                <span>Account Setting</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="dropdown-inner">
                          <ul class="link-list">
                            <li>
                              <a id="logout">
                                <em class="icon ni ni-signout"></em>
                                <span>Sign out</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          `;
    aside.innerHTML=html;
     
  };

  setNavPage();
});
