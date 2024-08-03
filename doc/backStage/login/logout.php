<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header('Content-Type: application/json');

session_start();
session_destroy();
echo json_encode('out');

?>
