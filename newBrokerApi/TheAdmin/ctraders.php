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
                  <!-- <p class="lead text-white">text of Users</p> -->
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

 <div class="card-body">
                <h5 class="mb-4">Copy Trades</h5>
                <p class="mb-0">
                  <a class="btn btn-primary mb-1 collapsed" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                    view/delete traders
                  </a>
                  <button class="btn btn-primary mb-1 collapsed" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2" fdprocessedid="c2p46">
                    input traders
                  </button>
               
                </p>
                <div class="row">
                  <div class="col-12 col-sm-12">
                    <div class="multi-collapse collapse" id="multiCollapseExample1" style="">
                      <div class="p-4 border mt-4">
                            <div class="table-responsive">
<table class="table table responsive">
              <thead>
                <tr>
           <th>#</th>
<th>Traders Name</th>
<th>Traders Name Abbreviated</th>
<th>Win Rate</th>  
                  <th>Action</th>

                </tr>
              </thead>
              <tbody id="tbody">

              </tbody>
            </table>
        
                      </div>
                      <ul class="pagination justify-content-center" id="pagination"></ul>

                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <div class="multi-collapse collapse" id="multiCollapseExample2" style="">
                      <div class="p-4 border mt-4">
                     <form method="POST" id="createCat" role="form" class="form-horizontal" action="" enctype="multipart/form-data">
          
        <div class="form-group">
  <label for="bitcoin" class="col-sm-2 control-label">Traders Name</label>
  <div class="col-sm-10">
    <input type="text" name="bitcoin" class="form-control" id="bitcoin" placeholder="Enter Traders Name" fdprocessedid="dj1eav">
  </div>
</div>
<div class="form-group">
  <label for="ethereum" class="col-sm-2 control-label">Traders Name Abbreviated</label>
  <div class="col-sm-10">
    <input type="text" name="ethereum" class="form-control" id="ethereum" placeholder="Enter Traders Name Abbreviated" fdprocessedid="dj1eav">
  </div>
</div>

<div class="form-group">
  <label for="tether" class="col-sm-2 control-label">Win Rate <br><span>note just put the text no % sign</span></label>

  <div class="col-sm-10">
    <input type="text" name="tether" class="form-control" id="tether" placeholder="Enter Win Rate" fdprocessedid="dj1eav">
  </div>
</div>
            <div class="form-group">
              <button class="btn btn-primary btn-lg btn-shadow" id="submit" name="submit" type="submit" fdprocessedid="jjmrk">add Trader</button>
            </div>
          </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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


  <script src="jsFiles/ctraders.js"></script>
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