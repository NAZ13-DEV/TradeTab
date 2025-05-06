<?php
require 'articles.php';
$ObjArticles = new Articles();

if (isset($_REQUEST['aid'])) {
    $ObjArticles->setId($_REQUEST['aid']);

    $article = $ObjArticles->getArticleById();
}

if (isset($_REQUEST['save'])) {
    if(!empty($_REQUEST['title']) && !empty($_REQUEST['editor1'])) {
    if (isset($_REQUEST['aid'])) {

        $ObjArticles->setTitle($_REQUEST['title']);
        $ObjArticles->setDescription($_REQUEST['editor1']);
        $ObjArticles->setCat($_REQUEST['category']);
        $ObjArticles->setAuthor($_REQUEST['author']);
        Articles::setDateTime();

        if ($ObjArticles->update()) {
        ?>
        <div class="alert alert-success" role='alert' id="result">Article Updated Successfully</div>
        <?php
    }else{
        ?>
        <div class="alert alert-danger" role='alert' id="result">Sorry, could not Update</div>
        <?php
    }
    $article = $ObjArticles->getArticleById();

    }else{

    $des = $_REQUEST['editor1'];

    $ObjArticles->setTitle($_REQUEST['title']);
    $ObjArticles->setDescription($_REQUEST['editor1']);
    // $ObjArticles->setAuthor($_REQUEST['author']);
    $ObjArticles->setFile($_FILES["fileToUpload"]["name"]);
    // $ObjArticles->setCat($_REQUEST['category']);
    Articles::setDateTime();

    $target_dir = "images/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image

  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    $uploadOk = 1;
  } else {
    echo "<div class='alert alert-danger'>File is not an image.</div>";
    $uploadOk = 0;
  }

// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
  echo "<div class='alert alert-danger'>Sorry, your file is too large.</div>";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType !== "jpg" && $imageFileType !== "png" && $imageFileType !== "jpeg"
&& $imageFileType !== "gif" ) {
  echo "<div class='alert alert-danger'>Sorry, only JPG, JPEG, PNG & GIF files are allowed.</div>";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "<div class='alert alert-danger'>Sorry, your file was not uploaded.</div>";
// if everything is ok, try to upload file
} else {

  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "<div class='alert alert-danger'>The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.</div>";

    if ($ObjArticles->save()) {
        ?>
        <div class="alert alert-success" role='alert' id="result">Article Successfully added</div>
        <?php
    }else{
        ?>
        <div class="alert alert-danger" role='alert' id="result">Sorry, somthing went wrong</div>
        <?php
    }
  } else {
    echo "<div class='alert alert-danger'>Sorry, there was an error uploading your file.</div>";
  }
}
}
}else{
?>
    <div class="alert alert-danger" role='alert' id="result">All fileds are required</div>
    <?php
}
}
?>