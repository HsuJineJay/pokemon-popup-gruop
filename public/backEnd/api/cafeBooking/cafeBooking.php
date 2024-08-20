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

        $cafeBookingID = isset($_GET['cafeBookingID']) ? $_GET['cafeBookingID'] : null;
        $bookingExist = isset($_GET['bookingExist']) ? $_GET['bookingExist'] : null;
        $bookingDate = isset($_GET['bookingDate']) ? $_GET['bookingDate'] : null;
        $bookingTimePeriod = isset($_GET['bookingTimePeriod']) ? $_GET['bookingTimePeriod'] : null;
        $bookingNumber = isset($_GET['bookingNumber']) ? $_GET['bookingNumber'] : null;
        $bookingName = isset($_GET['bookingName']) ? $_GET['bookingName'] : null;
        $bookingEmail = isset($_GET['bookingEmail']) ? $_GET['bookingEmail'] : null;
        $bookingTel = isset($_GET['bookingTel']) ? $_GET['bookingTel'] : null;

        // 構建基本 SQL 查詢
        $query = "SELECT * FROM cafeBooking  WHERE 1 = 1 ";

        // 構建條件陣列
        $conditions = [];
        $params = [];
        $types = "";

        // 添加篩選條件
        if ($cafeBookingID!=null) {
            $conditions[] = "cafeBookingID = ?";
            $params[] = $cafeBookingID;
            $types .= "i";
        }
        if ($bookingExist!=null) {
            $conditions[] = "bookingExist = ?";
            $params[] = $bookingExist;
            $types .= "i";
        }
        if ($bookingDate!=null) {
            $conditions[] = "bookingDate LIKE ?";
            $params[] = "%" . $bookingDate . "%";
            $types .= "s";
        }
        if ($bookingTimePeriod!=null) {
            $conditions[] = "bookingTimePeriod LIKE ?";
            $params[] = "%" . $bookingTimePeriod . "%";
            $types .= "s";
        }
        if ($bookingNumber!=null) {
            $conditions[] = "bookingNumber = ?";
            $params[] = $bookingNumber;
            $types .= "i";
        }
        if ($bookingName!=null) {
            $conditions[] = "bookingName LIKE ?";
            $params[] = "%" . $bookingName. "%";
            $types .= "s";
        }
        if ($bookingEmail!=null) {
            $conditions[] = "bookingEmail LIKE ?";
            $params[] = "%" . $bookingEmail. "%";
            $types .= "s";
        }
        if ($bookingTel!=null) {
            $conditions[] = "bookingTel LIKE ?";
            $params[] = "%" . $bookingTel. "%";
            $types .= "s";
        }


        // 將條件附加到查詢
        if (count($conditions) > 0) {
            $query .= " AND " . implode(" AND ", $conditions);
        }
        // echo $query;
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
        // $cafeBookingID = $_POST['cafeBookingID'];
        $bookingExist = $_POST['bookingExist'];
        // $bookingDate = $_POST['bookingDate'];
        date_default_timezone_set('Asia/Taipei');
        $bookingDate = date("Y/m/d H:i:s",time());
        $bookingTimePeriod = $_POST['bookingTimePeriod'];
        $bookingNumber = $_POST['bookingNumber'];
        $bookingName = $_POST['bookingName'];
        $bookingEmail = $_POST['bookingEmail'];
        $bookingTel = $_POST['bookingTel'];




        $sql = 'INSERT INTO cafeBooking (bookingExist,bookingDate,bookingTimePeriod,bookingNumber,bookingName,bookingEmail,bookingTel) VALUES (?,?,?,?,?,?,?)';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('ississs', $bookingExist,$bookingDate, $bookingTimePeriod, $bookingNumber, $bookingName, $bookingEmail,$bookingTel);
        $stmt->execute();

        $storeBookingID = $mydb->insert_id;



        echo json_encode(["message" => "insert: " . $storeBookingID . "---OK"]);

        break;

    case "DELETE":
        $output = json_decode(file_get_contents('php://input'), true);
        $cafeBookingID = $output['cafeBookingID'];


        $sql = 'DELETE FROM cafeBooking WHERE cafeBookingID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('i', $cafeBookingID);
        $stmt->execute();


        echo json_encode(["message" => "delete: " . $cafeBookingID . " --- OK"]);
        break;

    case "PUT":
        $output = json_decode(file_get_contents('php://input'), true);
        $cafeBookingID = $output['cafeBookingID'];
        $bookingExist = $output['bookingExist'];
        $bookingDate = $output['bookingDate'];
        $bookingTimePeriod = $output['bookingTimePeriod'];
        $bookingNumber = $output['bookingNumber'];
        $bookingName = $output['bookingName'];
        $bookingEmail = $output['bookingEmail'];
        $bookingTel = $output['bookingTel'];


        $sql = 'UPDATE cafeBooking SET bookingExist = ?, bookingDate = ? ,bookingTimePeriod = ?, bookingNumber = ? , bookingName = ? , bookingEmail = ?, bookingTel = ? WHERE cafeBookingID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('ississsi', $bookingExist, $bookingDate, $bookingTimePeriod, $bookingNumber, $bookingName, $bookingEmail, $bookingTel, $cafeBookingID);
        $stmt->execute();



        echo json_encode(["message" => "update: " . $cafeBookingID . " --- OK"]);
        break;
    // {"cafeBookingID":2,"bookingExist":0,"bookingDate":"2024-07-18 00:10:00","bookingTimePeriod":"2024-07-20 11:00:00","bookingNumber":"5","bookingName":"Bitch","bookingEmail":"b@email","bookingTel":"091"}

    case "PATCH":
        $output = json_decode(file_get_contents('php://input'), true);

        $cafeBookingID = $output['cafeBookingID'];
        $bookingExist = $output['bookingExist'];

        $sql = "UPDATE cafeBooking SET bookingExist = ? WHERE cafeBookingID = ?";
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param("ii", $bookingExist,$cafeBookingID);
        $stmt->execute();

        echo json_encode(["message" => "更改職員狀態" . $cafeBookingID . " --- OK"]);
        //    {"cafeBookingID":2,"bookingExist":1}

        break;

}
?>