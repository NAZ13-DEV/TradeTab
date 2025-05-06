<?php
declare(strict_types=1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
require __DIR__ . "/bootstrap.php";
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$parts = explode("/", $path);
// var_dump($parts);
$resource = $parts[2];
$type = $parts[3];
$id = $parts[4] ?? null;
if ($resource != "task") {
    http_response_code(404);
    exit;
}
$user_conn = new Database();
$connect = $user_conn->check_Database($_ENV["DB_NAME"]);
$task_gateway = new TaskGatewayFunction($user_conn);
$controller = new TaskController();
$controller->processRequest($_SERVER['REQUEST_METHOD'], $type, $id);
// var_dump($_SERVER['REQUEST_METHOD'], $type, $id);