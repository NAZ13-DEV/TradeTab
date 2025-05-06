<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport"content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />

    <title>CKeditor</title>

    <link rel="stylesheet" type="text/css" href="../../bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="../../bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../../bootstrap/css/bootstrap.css.map">
	<!-- <script type="text/javascript" src="../ckeditor/ckeditor.js"></script> -->
  </head>
<body>
<div class="container">
	<header><h1 class="text-center" style="margin-top: 20px;">This is Ckeditor web page</h1></header>
	<hr>
<div>
<?php
include 'php_http/savefile.php';
?>
</div>
<div class="row">
  <div class="col-md-10 col-md-offset-1">
    <h1>Upload or Select Image</h1>
    <hr>
    <form name="uploadFrm" method="POST" enctype="multipart/form-data">
      <div class="form-group">
        <label for="fileToUpload">Select File</label>
        <input type="file" name="fileToUpload" id="fileToUpload" class="form-control input-lg">
        <p class="help-block">Select your file which you want to upload.</p>
      </div>
      <div class="footer">
        <button type="submit" name="submit" class="btn btn-primary">Upload</button>
      </div>
    </form>
  </div>
</div>

<div class="row">
 <?php
 foreach ($images as $image) {
  ?>
  <div class="col-xs-6 col-md-3" id="imgS">
      <a href="javascript:selectImage('<?php echo $image['name']; ?>')" class="thumbnail">
        <img src="images/<?php echo $image['name']; ?>">
      </a>
    </div>
    <?php
  }
  ?>
</div>
</div>
</div>
<script type="text/javascript" src="../../bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../../bootstrap/js/bootstrap.js"></script>
<script type="text/javascript" src="../../bootstrap/js/bootstrap.js.map"></script>
<script type="text/javascript" src="../../jquery-3.3.1.min.js"></script>
</body>
</html>
<?php
echo '
<script type="text/javascript">
    
    var CKEditorFuncNum = "'.$_REQUEST['CKEditorFuncNum'].'";
    var url = "http://'.$_SERVER['SERVER_NAME'].'/User_ADmin/imageFolder/images/";
    function selectImage(imgName)
    {
      url += imgName;
      window.opener.CKEDITOR.tools.callFunction(CKEditorFuncNum, url);
      window.close();
    }
    
</script>';
?>