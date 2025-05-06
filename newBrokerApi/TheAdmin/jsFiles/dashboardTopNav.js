document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('#topNav');

    const setHeaderHtml = function () {
        const html = `
            <div class="container-fluid">
                <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
                    <div class="collapse navbar-collapse" id="topnav-menu-content">
                        <ul class="navbar-nav">

                            <li class="nav-item dropdown mm-active">
                                <a class="nav-link arrow-none" href="index" id="topnav-dashboard" role="button">
                                    <i class="fas fa-home"></i><span>Account</span>
                                </a>
                            </li>

                            <li class="nav-item dropdown ">
                                <a class="nav-link arrow-none" href="portfolio" id="topnav-portfolio" role="button">
                                    <i class="fas fa-briefcase"></i><span>Portfolio</span>
                                </a>
                            </li>

                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle arrow-none" href="#" id="topnav-history" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-save"></i><span>History</span> <div class="arrow-down"></div>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="topnav-history">
                                <a href="statements" class="dropdown-item" data-key="t-calendar">Trading History</a>
                                <a href="transactions" class="dropdown-item" data-key="t-chat">Deposit History</a>
                                <a href="EarnedHistory" class="dropdown-item" data-key="t-chat">Earned History</a>
                            </div>
                        </li>
                        

                            <style>
                                @media (max-width: 768px) {
                                    .cash-nav-item {
                                        display: none;
                                    }
                                    .cash-mobile-menu {
                                        display: block;
                                    }
                                }
                                @media (min-width: 768px) {
                                    .cash-nav-item {
                                        display: block;
                                    }
                                    .cash-mobile-menu {
                                        display: none;
                                    }
                                }
                            </style>

                            <li class="nav-item dropdown ">
                                <a class="nav-link arrow-none" href="live-trading" id="topnav-documents" role="button">
                                    <i class="fas fa-dollar-sign"></i><span>Live Trading</span>
                                </a>
                            </li>

                            <li class="nav-item dropdown ">
                                <a class="nav-link arrow-none" href="deposit" id="topnav-documents" role="button">
                                    <i class="fas fa-dollar-sign"></i><span>Deposit</span>
                                </a>
                            </li>

                            <li class="nav-item dropdown ">
                                <a class="nav-link arrow-none" href="withdraw" id="topnav-documents" role="button">
                                    <i class="fas fa-dollar-sign"></i><span>Withdrawal</span>
                                </a>
                            </li>

                       

                            <li class="nav-item dropdown ">
                                <a class="nav-link arrow-none" href="rewards" id="topnav-rewards" role="button">
                                    <i class="fas fa-gift"></i><span>Rewards</span>
                                </a>
                            </li>

                            <li class="nav-item dropdown ">
                                <a class="nav-link arrow-none" href="./settings" id="topnav-settings" role="button">
                                    <i class="fas fa-cogs"></i><span>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        `;
        header.insertAdjacentHTML('beforeend', html);
    };
    setHeaderHtml();
});
{/* <li class="nav-item dropdown ">
<a class="nav-link arrow-none" href="documents" id="topnav-documents" role="button">
    <i class="fas fa-file-alt"></i><span>Documents</span>
</a>
</li> */}