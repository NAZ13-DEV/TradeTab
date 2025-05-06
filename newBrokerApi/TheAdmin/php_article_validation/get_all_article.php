<?php
require 'articles.php';
$ObjArticles = new Articles();

$articles = $ObjArticles->getAllarticles();
?>