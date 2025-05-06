document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.headers');

    const setHeaderHtml = function () {
        const html = `
        <div class="navbar-header">
            <div class="d-flex align-items-center">
                <!-- LOGO -->
                <div class="navbar-brand-box">
                    <a href="index" class="logo logo-dark">
                        <span class="logo-sm">
                            <img src="assets/images/logo-sm.png" alt="" height="24">
                        </span>
                        <span class="logo-lg">
                            <img src="assets/images/logo-sm.png" alt="" height="24"> <span class="logo-txt"></span>
                        </span>
                    </a>
                    <a href="dashboard" class="logo logo-light">
                        <span class="logo-sm">
                            <img src="assets/images/logo-sm.png" alt="" height="24">
                        </span>
                        <span class="logo-lg">
                            <img src="assets/images/logo-sm.png" alt="" height="24"> <span class="logo-txt"></span>
                        </span>
                    </a>
                </div>
                <button type="button" class="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            <div class="d-flex">

            

                <div class="dropdown d-inline-block">
                    <a href="./settings" type="button" class="btn header-item me-2" >
                        <i class="fas fa-cog"></i>
                    </a>
                </div>
                <div class="dropdown d-inline-block" id="el">
                    <div class="dropdown-menu dropdown-menu-end">
                        <!-- item-->
                        <a class="dropdown-item" href="settings"><i class="fas fa-clipboard-list me-1"></i> Application Status</a>
                        <a class="dropdown-item" href="../contact"><i class="fas fa-comment-dots me-1"></i> Contact Us</a>
                        <a class="dropdown-item" href="./profile"><i class="fas fa-user me-1"></i> Profile</a>
                        
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" id="logout">
                            <i class="fas fa-sign-out-alt me-1"></i> Logout</a>
                    </div>
                </div>
            </div>
        </div>`;
        header.insertAdjacentHTML('beforeend', html);
    };
    setHeaderHtml();
});
{/* <div class="dropdown d-inline-block">
<button type="button" class="btn header-item noti-icon position-relative" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="fas fa-bell"></i>
</button>
<div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
    <div class="p-3">
        <div class="row align-items-center">
            <div class="col">
                <h6 class="m-0">Notifications</h6>
            </div>
            <div class="col-auto">
                <a href="#!" class="small text-reset text-decoration-underline">Unread (0)</a>
            </div>
        </div>
    </div>
    <div data-simplebar style="max-height: 250px;">
        <a href="notifications/8ed8903d-d5f5-4f88-b577-a8b44ede6d9f#8ed8903d-d5f5-4f88-b577-a8b44ede6d9f" class="text-reset notification-item">
            <div class="d-flex">
                <div class="flex-shrink-0 me-3">
                    <img src="img/avatar.png" class="rounded-circle avatar-sm" alt="user-pic">
                </div>
                <div class="flex-grow-1">
                    <h6 class="mb-1">Welcome To</h6>
                    <div class="font-size-13 text-muted">
                        <p class="mb-0">Your path to automated trad...
                            <br> <span><i class="fas fa-clock"></i> 5 days ago</span></p>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>
</div> */}