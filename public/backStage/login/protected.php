<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");


// 处理预检请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // 预检请求成功，返回空响应
}
session_start();

if (isset($_SESSION['account'])) {
    echo json_encode(['success' => true, 'message' => 'You have accessed a protected route']);
    // echo '有sessuon';
    
    // echo $_SESSION['account'];
} else {
    // echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    $sess=implode(",",$_SESSION);
    echo json_encode(['success' => false, 'message' => "$sess"]);
    // echo $_SESSION['account'];
}












// header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']} ");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
// header("Access-Control-Allow-Credentials: true");
// header("Content-Type: application/json; charset=UTF-8");

// session_start();
// // header('Content-Type: application/json');
// if (isset($_SESSION['account'])) {
//     echo '有session';
//     var_dump($_SESSION);
//     echo json_encode(['success' => true, 'message' => 'You have accessed a protected route']);
// } else {

//     // echo json_encode(['success' => false, 'message' => $account]);
//     echo '沒有session';
//     var_dump($_SESSION);


//     echo json_encode(['success' => false, 'message' => 'Unauthorized']);
// }
?>
