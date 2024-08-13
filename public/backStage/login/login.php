<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']} ");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

session_start();

if(isset($_POST['account'])){
    
}

$account = $_POST['account'];
$password = $_POST['password'];
// $account = $input['account'];
// $password = $input['password'];

$mydb = new mysqli('localhost', 'root', '', 'mfeeDB');
$mydb->set_charset('utf8');

$query = "SELECT * FROM userInfo WHERE userAccount = ?";

// 準備並綁定參數
$stmt = $mydb->prepare($query);
$stmt->bind_param('s', $account);

// 執行查詢
$stmt->execute();
$result = $stmt->get_result();

// 獲取結果
$check = false;
while ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['userPassword'])) {
        $check = true;
        break;
    }
}

// 應該從資料庫中檢查用戶
$_SESSION['account'] = $account;
if ($check) {
    $_SESSION['account'] = $account;
    // echo $account;
    // var_dump($account);
    echo json_encode(['success' => true ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}

// 關閉連接
// $stmt->close();
// $mydb->close();

?>
