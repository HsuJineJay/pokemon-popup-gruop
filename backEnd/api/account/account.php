<?php
// echo 'v';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");

$parts = explode("/", $_SERVER["REQUEST_URI"]);

$method = $_SERVER["REQUEST_METHOD"];

$mydb = new mysqli('localhost', 'root', '', 'mfeeDB');
$mydb->set_charset('utf8');

$parts = explode("/", $_SERVER["REQUEST_URI"]);
$method = $_SERVER["REQUEST_METHOD"];

// var_dump($method) ;
// echo $method;
switch ($method) {
    case "GET":

        $userID = isset($_GET['userID']) ? $_GET['userID'] : null;
        $userExist = isset($_GET['userExist']) ? $_GET['userExist'] : null;
        $userName = isset($_GET['userName']) ? $_GET['userName'] : null;
        $userAccount = isset($_GET['userAccount']) ? $_GET['userAccount'] : null;
        $userPassword = isset($_GET['userPassword']) ? $_GET['userPassword'] : null;
        $userTitle = isset($_GET['userTitle']) ? $_GET['userTitle'] : null;
        $userEmail = isset($_GET['userEmail']) ? $_GET['userEmail'] : null;

        // 構建基本 SQL 查詢
        $query = "SELECT * FROM userInfo  WHERE 1 = 1 ";

        // 構建條件陣列
        $conditions = [];
        $params = [];
        $types = "";

        // 添加篩選條件
        if ($userID!=null) {
            $conditions[] = "userID = ?";
            $params[] = $userID;
            $types .= "i";
        }
        if ($userExist!=null) {
            $conditions[] = "userExist = ?";
            $params[] = $userExist;
            $types .= "i";
        }
        if ($userName!=null) {
            $conditions[] = "userName LIKE ?";
            $params[] = "%" . $userName . "%";
            $types .= "s";
        }
        if ($userAccount!=null) {
            $conditions[] = "userAccount LIKE ?";
            $params[] = "%" . $userAccount . "%";
            $types .= "s";
        }
        if ($userPassword!=null) {
            $conditions[] = "userPassword LIKE ?";
            $params[] = "%" . $userPassword . "%";
            $types .= "s";
        }
        if ($userTitle!=null) {
            $conditions[] = "userTitle LIKE ?";
            $params[] = $userTitle;
            $types .= "s";
        }
        if ($userEmail!=null) {
            $conditions[] = "userEmail LIKE ?";
            $params[] = $userEmail;
            $types .= "s";
        }


        // 將條件附加到查詢
        if (count($conditions) > 0) {
            $query .= " AND " . implode(" AND ", $conditions);
            // echo $query;
        }
        error_log("Generated SQL Query: " . $query);
        error_log("Parameters: " . implode(", ", $params));

        // 準備並綁定參數
        $stmt = $mydb->prepare($query);

        if ($stmt === false) {
            die("Prepare failed: " . $mydb->error);
        }

        if (count($params) > 0) {
            $stmt->bind_param($types, ...$params);
        }

        // 執行查詢
        $stmt->execute();
        $result = $stmt->get_result();
        $data = [];

        // 獲取結果
        while ($row = $result->fetch_object()) {
            $data[] = $row;
        }




        // 將結果轉換為索引數組
        $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);

        echo $myJSON_data;
        break;


    case "POST":
        $userExist = $_POST['userExist'];
        $userName = $_POST['userName'];
        $userAccount = $_POST['userAccount'];

        $originPassword = $_POST['userPassword'];
        $userPassword = password_hash($originPassword, PASSWORD_DEFAULT);
        $userTitle = $_POST['userTitle'];
        $userEmail = $_POST['userEmail'];


        $sql = 'INSERT INTO userInfo (userExist,userName,userAccount,userPassword,userTitle,userEmail) VALUES (?,?,?,?,?,?)';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('isssss', $userExist, $userName, $userAccount, $userPassword, $userTitle, $userEmail);
        $stmt->execute();

        $productID = $mydb->insert_id;



        echo json_encode(["message" => "insert: " . $productID . "---OK"]);

        break;

    case "DELETE":
        $output = json_decode(file_get_contents('php://input'), true);
        $userID = $output['userID'];


        $sql = 'DELETE FROM userInfo WHERE userID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('i', $userID);
        $stmt->execute();


        echo json_encode(["message" => "delete: " . $userID . " --- OK"]);
        break;

    case "PUT":


        $output = json_decode(file_get_contents('php://input'), true);
        $userID = $output['userID'];
        $userExist = $output['userExist'];
        $userName = $output['userName'];
        $userAccount = $output['userAccount'];
        $userPassword = $output['userPassword'];
        $userOriginPassword = $output['userOriginPassword'];
        $userNewPassword = password_hash($userPassword, PASSWORD_DEFAULT);
        $userTitle = $output['userTitle'];
        $userEmail = $output['userEmail'];



        $sql = 'UPDATE userInfo SET userExist = ?, userName = ? ,userAccount = ?, userPassword = ? , userTitle = ? , userEmail = ? WHERE userID = ?';
        $stmt = $mydb->prepare($sql);
        if($userOriginPassword !== $userPassword){
            $stmt->bind_param('isssssi', $userExist, $userName, $userAccount, $userNewPassword, $userTitle, $userEmail, $userID);
        }else{
            $stmt->bind_param('isssssi', $userExist, $userName, $userAccount, $userPassword, $userTitle, $userEmail, $userID);
        }
        $stmt->execute();



        echo json_encode(["message" => "update: " . $userID . " --- OK"]);
        break;
    // {"userID":3,"userExist":0,"userName":"a","userAccount":"food","userPassword":"Good","userTitle":"掃地","userEmail":"email"}

    case "PATCH":
        $output = json_decode(file_get_contents('php://input'), true);

        $userID = $output['userID'];
        $userExist = $output['userExist'];

        $sql = "UPDATE userInfo SET userExist = ? WHERE userID = ?";
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param("ii", $userExist,$userID);
        $stmt->execute();

        echo json_encode(["message" => "更改職員狀態" . $userID . " --- OK"]);
        //    {"userID":3,"userExist":1}

        break;

}
?>