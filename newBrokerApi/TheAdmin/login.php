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
  <link rel="stylesheet" href="css/vendor/bootstrap-float-label.min.css" />
  <link rel="stylesheet" href="css/main.css" />
 
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
</head>

<body class="background show-spinner no-footer">
  <div class="fixed-background"></div>
  <main>
    <div class="container">
      <div class="row h-100">
        <div class="col-12 col-md-10 mx-auto my-auto">
          <div class="card auth-card">
            <div class="position-relative image-side ">

              <p class=" text-white h2">MAGIC IS IN THE DETAILS</p>

              <p class="white mb-0">
                Please use your credentials to login.
                <br>If you are not a member, please
                <a href="#" class="white">register</a>.
              </p>
            </div>
            <div class="form-side">
              <a href="Dashboard.Default.html">
                <span class="logo-single"></span>
              </a>
              <h6 class="mb-4">Login</h6>
              <form method="post" action="" id="loginForm">

                <label class="form-group has-float-label mb-4">
                  <input class="form-control" name="email" value="" />
                  <span>E-mail</span>
                </label>

                <label class="form-group has-float-label mb-4">
                  <input class="form-control" name="password" type="password" placeholder="" value="" />
                  <span>Password</span>
                </label>
                <div class="d-flex justify-content-between align-items-center">
                  <!-- <a href="#">Forget password?</a> -->
                  <button class="btn btn-primary btn-lg btn-shadow" id="submit" name="submit"
                    type="submit">LOGIN</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main> 
   <link rel="stylesheet" href="Toasty-master/toasty.css">
    <link rel="stylesheet" href="fontawesomev6/css/all.css">
     <script src="Toasty-master/toasty.js"></script>
  <script src="jsFiles/loaderFunctions.js"></script>
  <script src="jsFiles/validationFunction.js"></script>
  <script src="js/vendor/jquery-3.3.1.min.js"></script>
  <script src="js/vendor/bootstrap.bundle.min.js"></script>
  <script src="js/dore.script.js"></script>
  <script src="js/scripts.js"></script>
  <script src="jsFiles/axios.min.js"></script>
  <script src="jsFiles/adminLogin.js"></script>
</body>

</html>