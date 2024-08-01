<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");

session_start();
header('Content-Type: application/json');

if (isset($_SESSION['account'])) {
    echo json_encode(['success' => true, 'message' => 'You have accessed a protected route']);
} else {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
}
?>
