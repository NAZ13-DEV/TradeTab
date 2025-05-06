<?php
// Database credentials
$host = 'localhost';    // Your DB Host
$db   = 'newkik';       // Your DB Name
$user = 'root';         // Your DB Username
$pass = '12345';             // Your DB Password (empty if using local XAMPP or Herd)

// Try connecting to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Database connection successful!";
} catch (PDOException $e) {
    echo "❌ Database connection failed: " . $e->getMessage();
}
?>
