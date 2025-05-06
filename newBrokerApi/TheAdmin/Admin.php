<?php 
include '../src/constants.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Dore jQuery</title>
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
                  <!-- <p class="lead text-white"> number of Users</p> -->
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
    <form method="POST" id="createCat" role="form" class="form-horizontal" action="" enctype="multipart/form-data">
          
        <div class="form-group">
  <label for="bitcoin" class="col-sm-2 control-label">Admin Mail</label>
  <div class="col-sm-10">
    <input type="text" name="adminMail" class="form-control" id="adminMail" fdprocessedid="dj1eav">
  </div>
</div>
<div class="form-group">
  <label for="ethereum" class="col-sm-2 control-label">Admin password</label>
  <div class="col-sm-10">
    <input type="text" name="adminpassword" class="form-control" id="adminpassword"  fdprocessedid="dj1eav">
  </div>
</div>
<div class="form-group">
 
  <div class="col-sm-10">
    <input type="hidden" name="userid" class="form-control" id="userid" value="" placeholder="" fdprocessedid="dj1eav">
  </div>
</div>
 
            <div class="form-group">
              <button class="btn btn-primary btn-lg btn-shadow" id="submit" name="submit" type="submit" fdprocessedid="jjmrk">submit</button>
            </div>
          </form>
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


  <script src="jsFiles/Admin.js"></script>



</body>

</html>