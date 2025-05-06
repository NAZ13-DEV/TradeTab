<?php
require 'files.php';

$Objfile = new files();

$images = $Objfile->getFiles();

if (isset($_POST['submit'])) {
if (!empty($_FILES['fileToUpload']['name'])) {

	$Objfile->setFileName($_FILES['fileToUpload']['name']);
	$Objfile->setFileSize($_FILES['fileToUpload']['size']);
	$Objfile->setFileType($_FILES['fileToUpload']['name']);
	files::setDateTime();
	$newName = "images/".$Objfile->getFileName();

	if ($Objfile->insert()) {
		$move = move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $newName);
		if ($move) {
			echo "<div class='alert alert-success'>Photo Saved</div>";
			$images = $Objfile->getFiles();
		}else{
			echo "<div class='alert alert-danger'>Upload Failed</div>";
		}
	}else{
		echo "<div class='alert alert-danger'>Sorry, could not upload the file</div>";
	}
	}else{
		echo "<div class='alert alert-danger'>Please Select a file to upload</div>";
	}
}

?>