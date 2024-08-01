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


switch ($method) {
    case "GET":
        $itemID = isset($_GET['itemID']) ? $_GET['itemID'] : null;
        $menuExist = isset($_GET['menuExist']) ? $_GET['menuExist'] : null;
        $itemName = isset($_GET['itemName']) ? $_GET['itemName'] : null;
        $itemType = isset($_GET['itemType']) ? $_GET['itemType'] : null;
        $itemDescribe = isset($_GET['itemDescribe']) ? $_GET['itemDescribe'] : null;
        $itemMain = isset($_GET['itemMain']) ? $_GET['itemMain'] : null;
        $itemPrice = isset($_GET['itemPrice']) ? $_GET['itemPrice'] : null;
        $itemImg = isset($_GET['itemImg']) ? $_GET['itemImg'] : null;

        // 構建基本 SQL 查詢
        $query = "SELECT * FROM menuItem  WHERE 1 = 1 ";

        // 構建條件陣列
        $conditions = [];
        $params = [];
        $types = "";

        // 添加篩選條件
        if ($itemID) {
            $conditions[] = "itemID = ?";
            $params[] = $itemID;
            $types .= "i";
        }
        if ($menuExist) {
            $conditions[] = "menuExist = ?";
            $params[] = $menuExist;
            $types .= "i";
        }
        if ($itemName) {
            $conditions[] = "itemName LIKE ?";
            $params[] = "%" . $itemName . "%";
            $types .= "s";
        }
        if ($itemType) {
            $conditions[] = "itemType LIKE ?";
            $params[] = "%" . $itemType . "%";
            $types .= "s";
        }
        if ($itemDescribe) {
            $conditions[] = "itemDescribe LIKE ?";
            $params[] = "%" . $itemDescribe. "%";
            $types .= "s";
        }
        if ($itemMain) {
            $conditions[] = "itemMain = ?";
            $params[] = $itemMain;
            $types .= "i";
        }
        if ($itemPrice) {
            $conditions[] = "itemPrice = ?";
            $params[] = $itemPrice;
            $types .= "i";
        }
        if ($itemImg) {
            $conditions[] = "itemImg = ?";
            $params[] = "%" .$itemImg. "%";
            $types .= "s";
        }



        // 將條件附加到查詢
        if (count($conditions) > 0) {
            $query .= " AND " . implode(" AND ", $conditions);
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
        // $itemID = $_POST['itemID'];
        $menuExist = $_POST['menuExist'];
        $itemName = $_POST['itemName'];
        $itemType = $_POST['itemType'];
        $itemDescribe = $_POST['itemDescribe'];
        $itemMain = $_POST['itemMain'];
        $itemPrice = $_POST['itemPrice'];
        $itemImg = $_POST['itemImg'];
        // $itemDiscount = $_POST['itemDiscount'];
        // $itemPrice = $_POST['itemDiscountPersent'];
        // $itemDiscountStart = $_POST['itemDiscountStart'];
        // $itemDiscountEnd = $_POST['itemDiscountEnd'];


        $sql = 'INSERT INTO menuItem (menuExist,itemName,itemType,itemDescribe,itemMain,itemPrice,itemImg) VALUES (?,?,?,?,?,?,?)';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('isssiis', $menuExist,$itemName, $itemType, $itemDescribe, $itemMain, $itemPrice, $itemImg);
        $stmt->execute();

        $itemID = $mydb->insert_id;



        echo json_encode(["message" => "insert: " . $itemID . "---OK"]);

        break;

    case "DELETE":
        $output = json_decode(file_get_contents('php://input'), true);
        $itemID = $output['itemID'];


        $sql = 'DELETE FROM menuItem WHERE itemID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('i', $itemID);
        $stmt->execute();


        echo json_encode(["message" => "delete: " . $itemID . " --- OK"]);
        break;

    case "PUT":
        $output = json_decode(file_get_contents('php://input'), true);
        $itemID = $output['itemID'];
        $menuExist = $output['menuExist'];
        $itemName = $output['itemName'];
        $itemType = $output['itemType'];
        $itemDescribe = $output['itemDescribe'];
        $itemMain = $output['itemMain'];
        $itemPrice = $output['itemPrice'];
        $itemImg = $output['itemImg'];


        $sql = 'UPDATE menuItem SET menuExist = ?, itemName = ? ,itemType = ?, itemDescribe = ? , itemMain = ? , itemPrice = ?, itemImg = ? WHERE  itemID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('isssiisi', $menuExist, $itemName, $itemType, $itemDescribe, $itemMain, $itemPrice, $itemImg, $itemID);
        $stmt->execute();



        echo json_encode(["message" => "update: " . $itemID . " --- OK"]);
        break;
    // {"itemID":2,"menuExist":0,"itemName":"2024-07-18 00:10:00","itemType":"2024-07-20 11:00:00","itemDescribe":"5","itemMain":"Bitch","itemPrice":"b@email"}

    case "PATCH":
        $output = json_decode(file_get_contents('php://input'), true);

        $itemID = $output['itemID'];
        $menuExist = $output['menuExist'];

        $sql = "UPDATE menuItem SET menuExist = ? WHERE itemID = ?";
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param("ii", $menuExist,$itemID);
        $stmt->execute();

        echo json_encode(["message" => "更改菜單狀態" . $itemID . " --- OK"]);
        //    {"itemID":2,"menuExist":1}

        break;

}
?>