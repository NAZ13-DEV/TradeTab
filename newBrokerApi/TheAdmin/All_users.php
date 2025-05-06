
<?php 
include '../src/constants.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title><?php echo sitename ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

  <link rel="stylesheet" href="font/iconsmind-s/css/iconsminds.css" />
  <link rel="stylesheet" href="font/simple-line-icons/css/simple-line-icons.css" />

  <link rel="stylesheet" href="css/vendor/bootstrap.min.css" />
  <link rel="stylesheet" href="css/vendor/bootstrap.rtl.only.min.css" />
  <link rel="stylesheet" href="css/vendor/fullcalendar.min.css" />
  <link rel="stylesheet" href="css/vendor/dataTables.bootstrap4.min.css" />
  <link rel="stylesheet" href="css/vendor/datatables.responsive.bootstrap4.min.css" />
  <link rel="stylesheet" href="css/vendor/select2.min.css" />
  <link rel="stylesheet" href="css/vendor/select2-bootstrap.min.css" />
  <link rel="stylesheet" href="css/vendor/perfect-scrollbar.css" />
  <link rel="stylesheet" href="css/vendor/glide.core.min.css" />
  <link rel="stylesheet" href="css/vendor/bootstrap-stars.css" />
  <link rel="stylesheet" href="css/vendor/nouislider.min.css" />
  <link rel="stylesheet" href="css/vendor/bootstrap-datepicker3.min.css" />
  <link rel="stylesheet" href="css/vendor/component-custom-switch.min.css" />
  <link rel="stylesheet" href="css/main.css" />
  <style>
  .horizontal-line {
    display: flex;
    justify-content: space-between;
    /* Adjust this property to align images as needed */
  }

  .col {
    flex: 1;
    /* Ensure each column takes up equal space */
  }
  </style>
</head>

<body id="app-container" class="menu-default show-spinner">
  <?php
include 'header.php';
?>
  <?php
include 'navbar.php';
?>

  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4">
          <div class="card mb-4 progress-banner">
            <div class="card-body justify-content-between d-flex flex-row align-items-center">
              <div>
                <i class="iconsminds-male mr-2 text-white align-text-bottom d-inline-block"></i>
                <div>
                  <!-- <p class="lead text-white"> text of Users</p> -->
                  <p class="text-small text-white">approved </p>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card mb-4 progress-banner">
            <div class="card-body justify-content-between d-flex flex-row align-items-center">
              <div>
                <i class="iconsminds-bell mr-2 text-white align-text-bottom d-inline-block"></i>
                <div>
                  <!-- <p class="lead text-white"> coupon codes created</p> -->
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card mb-4 progress-banner">
            <a href="#" class="card-body justify-content-between d-flex flex-row align-items-center">
              <div>
                <i class="iconsminds-bell mr-2 text-white align-text-bottom d-inline-block"></i>
                <div>
                  <!-- <p class="lead text-white"> referals made</p> -->
                  <p class="text-small text-white">by all users</p>
                </div>
              </div>
              <div>
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>
    </div>

  
    <div class="col-12">
      <div class="card">
        <div class="card-body">
              <h5 class="card-title">Every Action for Each User</h5>
<div class="form-group">
  <input type="text" class="form-control" id="umessageId" name="umessageId" placeholder="search for a user">
</div>
          <div class="table-responsive">
            <table class="table table responsive">
              <thead>
<tr>
<th>ID</th>
<th>First Name</th>
<th>Last Name</th>
<th>Username</th>
<th>Email</th>
<th>Phone</th>
<th>Country</th>
<th>Password</th>
<th>Refer</th>
<th>Encrypted Password</th>
<th>Plan</th>
<th>Created At</th>
<th>User ID</th>
<th>IP</th>
<th>Image</th>
<th>Balance</th>
<th>Total Deposit</th>
<th>Total Profit</th>
<th>Status</th>
<th>Demo Balance</th>
<th>Support</th>
<th>Alert</th>
<th>Number</th>
<th>KYC</th>
<th>IMF Clearance Code</th>
<th>Address</th>
<th>City</th>
<th>State</th>
<th>Verification</th>
<th>Disable</th>
<th>Email Log</th>
<th>Name of Code</th>
<th>Withdrawal</th>
<th>Signal Message</th>
<th>Email Verification</th>
<th>User Login</th>
<th>Currency</th>
</tr>

              </thead>
              <tbody id="tbody">
              </tbody>
              <tfoot>
                <tr>
                  <td>

                  </td>
                </tr>
              </tfoot>
            </table>

          </div>
        </div>
        <ul class="pagination justify-content-center" id="pagination"></ul>
        <!-- <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul> -->
      </div>
    </div>
    </div>
    </div>
    </div>
<div class="modal fade" id="exampleModalContentProfileLoss" tabindex="-1" role="dialog"
aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
   <form id="addLossForm" >
<div class="modal-header">
<h5 class="modal-title" id="exampleModalContentProfileLabel">Make Loss</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
 <div class="form-group">
  <label for="time">Amount:</label>
  <input type="text" class="form-control" id="AmountForLoss" name="AmountnForLoss" placeholder="Enter Amount you want ">
</div>
<div class="form-group">
  <input type="hidden" class="form-control" id="userIdForLoss" name="userIdForLoss" value="">
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary"
data-dismiss="modal">Close</button>
<button  type="submit" class="btn btn-primary" id="sendMessage">Make Loss</button>
</div>
</form>
</div>
</div>
</div>



    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
   <form id="message" >
<div class="modal-header">
<h5 class="modal-title" id="exampleModalLabel">Signal Message</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
 <div class="form-group">
  <label for="time">Message:</label>
  <textarea name="umessage" class="form-control" placeholder="Enter Amount you want to deposit" id="umessage"></textarea>

</div>
<div class="form-group">
  <input type="hidden" class="form-control" id="umessageIdd" name="umessageIdd" value="">
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary"
data-dismiss="modal">Close</button>
<button  type="submit" class="btn btn-primary" id="sendMessage">Send message</button>
</div>
</form>
</div>
</div>
</div>


<div class="modal fade" id="exampleModalContentShare" tabindex="-1" role="dialog"
aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
   <form id="addsharesform" >
<div class="modal-header">
<h5 class="modal-title" id="exampleModalContentProfileLabel">Add Shares</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
 <div class="form-group">
  <label for="time">Amount of Shares:</label>
  <input type="text" class="form-control" id="Amountnll" name="Amountnll" placeholder="Enter Amount you want to deposit">
</div>
 
 <div class="form-group">
  <label for="time">text percentage (%) of Shares:</label>
  <input type="text" class="form-control" id="AmountPer" name="AmountPer" placeholder="Enter Amount you want to deposit">
</div>
 
<div class="form-group">
  <input type="hidden" class="form-control" id="userproIdll" name="userproIdll" value="">
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary"
data-dismiss="modal">Close</button>
<button  type="submit" class="btn btn-primary" id="sendMessage">Send message</button>
</div>
</form>
</div>
</div>
</div>



<div class="modal fade" id="exampleModalContentRot" tabindex="-1" role="dialog"
aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
   <form id="addsharesRoi" >
<div class="modal-header">
<h5 class="modal-title" id="exampleModalContentProfileLabel">Add ROI Shares</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
 <div class="form-group">
  <label for="time">Amount of Roi Shares:</label>
  <input type="text" class="form-control" id="AmountRoi" name="AmountRoi" placeholder="Enter Amount you want to deposit">
</div>
<div class="form-group">
  <input type="hidden" class="form-control" id="userRoi" name="userRoi" value="">
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary"
data-dismiss="modal">Close</button>
<button  type="submit" class="btn btn-primary" id="sendMessage">Send message</button>
</div>
</form>
</div>
</div>
</div>


<div class="modal fade" id="exampleModalContentProfile" tabindex="-1" role="dialog"
aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
   <form id="addprofitform" >
<div class="modal-header">
<h5 class="modal-title" id="exampleModalContentProfileLabel">Make profit</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
 <div class="form-group">
  <label for="time">Amount:</label>
  <input type="text" class="form-control" id="Amountn" name="Amountn" placeholder="Enter Amount you want to deposit">
</div>
 
<div class="form-group">
  <input type="hidden" class="form-control" id="userproId" name="userproId" value="">
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary"
data-dismiss="modal">Close</button>
<button  type="submit" class="btn btn-primary" id="sendMessage">Send message</button>
</div>
</form>
</div>
</div>
</div>


<div class="modal fade" id="exampleModalContent" tabindex="-1" role="dialog"
aria-hidden="true">
<div class="modal-dialog" role="document">
<div class="modal-content">
   <form id="addform" >
<div class="modal-header">
<h5 class="modal-title" id="exampleModalContentLabel">Make deposit for ${first_name} ${last_name}</h5>
<button type="button" class="close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">

 <div class="form-group">
  <label for="time">Amount:</label>
  <input type="text" class="form-control" id="Amount" name="Amount" placeholder="Enter Amount you want to deposit">
</div>
 
<div class="form-group">
<label for="text">select deposit coin</label>
<select id="shipmentStatus" class="form-control col-10" name="shipmentStatus">
<option value="" disabled selected>Choose an option</option>
<option value="Tether">Tether</option>
<option value="Bitcoin">Bitcoin</option>
<option value="Ethereum">Ethereum</option>
<option value="Litecoin">Litecoin</option>
</select>
</div>
<div class="form-group">
  <input type="hidden" class="form-control" id="userId" name="userId" value="">
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary"
data-dismiss="modal">Close</button>
<button  type="submit" class="btn btn-primary" id="sendMessage">Send message</button>
</div>
</form>
</div>
</div>
</div>
  </main>

  <?php include 'footer.php'; ?>

  <script src="js/vendor/jquery-3.3.1.min.js"></script>
  <script src="js/vendor/bootstrap.bundle.min.js"></script>
  <script src="js/vendor/Chart.bundle.min.js"></script>
  <script src="js/vendor/chartjs-plugin-datalabels.js"></script>
  <script src="js/vendor/moment.min.js"></script>
  <script src="js/vendor/fullcalendar.min.js"></script>
  <script src="js/vendor/datatables.min.js"></script>
  <script src="js/vendor/perfect-scrollbar.min.js"></script>
  <script src="js/vendor/glide.min.js"></script>
  <script src="js/vendor/progressbar.min.js"></script>
  <script src="js/vendor/jquery.barrating.min.js"></script>
  <script src="js/vendor/select2.full.js"></script>
  <script src="js/vendor/nouislider.min.js"></script>
  <script src="js/vendor/bootstrap-datepicker.js"></script>
  <script src="js/vendor/Sortable.js"></script>
  <script src="js/vendor/mousetrap.min.js"></script>
  <script src="js/dore.script.js"></script>
  <script src="js/scripts.js"></script>
  <script>
  function randomNumber(len) {
    var randomNumber;
    var n = '';

    for (var count = 0; count < len; count++) {
      randomNumber = Math.floor(Math.random() * 10);
      n += randomNumber.toString();
    }
    return n;
  }
  </script>


  <script src="jsFiles/viewuser.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Function to filter table rows based on search input
  function filterRows(searchValue) {
    const rows = document.querySelectorAll('#tbody tr');
    let hasVisibleRows = false;

    rows.forEach(row => {
      const rowText = row.textContent.toLowerCase();
      if (rowText.includes(searchValue.toLowerCase())) {
        row.style.display = '';
        hasVisibleRows = true;
      } else {
        row.style.display = 'none';
      }
    });

    const noResultMessage = document.getElementById('noResultMessage');
    if (hasVisibleRows) {
      if (noResultMessage) {
        noResultMessage.textContent = '';
      }
    } else {
      if (!noResultMessage) {
        const message = document.createElement('div');
        message.id = 'noResultMessage';
        message.textContent = 'No matching results found.';
        document.querySelector('.table-responsive').insertAdjacentElement('beforebegin', message);
      }
    }
  }

  // Event listener for search input
  const searchInput = document.getElementById('umessageId');
  searchInput.addEventListener('input', function() {
    const searchValue = searchInput.value.trim();
    if (searchValue === '') {
      const rows = document.querySelectorAll('#tbody tr');
      rows.forEach(row => row.style.display = '');
      const noResultMessage = document.getElementById('noResultMessage');
      if (noResultMessage) {
        noResultMessage.textContent = '';
      }
    } else {
      filterRows(searchValue);
    }
  });
});
</script>

</body>

</html>