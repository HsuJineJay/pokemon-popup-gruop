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
        $orderID = isset($_GET['orderID']) ? $_GET['orderID'] : null;
        $orderExist = isset($_GET['orderExist']) ? $_GET['orderExist'] : null;
        $orderProductID = isset($_GET['orderProductID']) ? $_GET['orderProductID'] : null;
        $productQ = isset($_GET['productQ']) ? $_GET['productQ'] : null;
        $buyerName = isset($_GET['buyerName']) ? $_GET['buyerName'] : null;
        $buyerEmail = isset($_GET['buyerEmail']) ? $_GET['buyerEmail'] : null;
        $buyerTel = isset($_GET['buyerTel']) ? $_GET['buyerTel'] : null;
        $buyerAddr = isset($_GET['buyerAddr']) ? $_GET['buyerAddr'] : null;
        $transportNote = isset($_GET['transportNote']) ? $_GET['transportNote'] : null;
        $orderDate = isset($_GET['orderDate']) ? $_GET['orderDate'] : null;
        $payment = isset($_GET['payment']) ? $_GET['payment'] : null;
        $receiptType = isset($_GET['receiptType']) ? $_GET['receiptType'] : null;
        $companyTitle = isset($_GET['companyTitle']) ? $_GET['companyTitle'] : null;
        $taxIDNumber = isset($_GET['taxIDNumber']) ? $_GET['taxIDNumber'] : null;
        $orderStatus = isset($_GET['orderStatus']) ? $_GET['orderStatus'] : null;
        
        $productName = isset($_GET['productName']) ? $_GET['productName'] : null;

        // 構建基本 SQL 查詢
        $query = "SELECT * FROM orderlist LEFT JOIN product on orderlist.orderProductID = product.productID  WHERE 1 = 1";

        // 構建條件陣列
        $conditions = [];
        $params = [];
        $types = "";

        // 添加篩選條件
        if ($orderID!=null) {
            $conditions[] = "orderID = ?";
            $params[] = $orderID;
            $types .= "i";
        }
        if ($orderExist!=null) {
            $conditions[] = "orderExist = ?";
            $params[] = $orderExist;
            $types .= "i";
        }
        if ($orderProductID!=null) {
            $conditions[] = "orderProductID = ?";
            $params[] = $orderProductID ;
            $types .= "i";
        }
        if ($productQ!=null) {
            $conditions[] = "productQ = ?";
            $params[] = $productQ;
            $types .= "i";
        }
        if ($buyerName!=null) {
            $conditions[] = "buyerName LIKE ?";
            $params[] = "%" . $buyerName. "%";
            $types .= "s";
        }
        if ($buyerEmail!=null) {
            $conditions[] = "buyerEmail LIKE ?";
            $params[] = "%" . $buyerEmail. "%";
            $types .= "s";
        }
        if ($buyerTel!=null) {
            $conditions[] = "buyerTel LIKE ?";
            $params[] = "%" . $buyerTel. "%";
            $types .= "s";
        }
        if ($buyerAddr!=null) {
            $conditions[] = "buyerAddr LIKE ?";
            $params[] = "%" . $buyerAddr. "%";
            $types .= "s";
        }
        if ($transportNote!=null) {
            $conditions[] = "transportNote LIKE ?";
            $params[] = "%" . $transportNote. "%";
            $types .= "s";
        }
        if ($orderDate!=null) {
            $conditions[] = "orderDate LIKE ?";
            $params[] = "%" . $orderDate. "%";
            $types .= "s";
        }
        if ($payment!=null) {
            $conditions[] = "payment LIKE ?";
            $params[] = "%" . $payment. "%";
            $types .= "s";
        }
        if ($receiptType!=null) {
            $conditions[] = "receiptType LIKE ?";
            $params[] =  "%" . $receiptType. "%";
            $types .= "s";
        }
        if ($companyTitle!=null) {
            $conditions[] = "companyTitle LIKE ?";
            $params[] = "%" . $companyTitle. "%";
            $types .= "s";
        }
        if ($taxIDNumber!=null) {
            $conditions[] = "taxIDNumber LIKE ?";
            $params[] = "%" .$taxIDNumber. "%";
            $types .= "s";
        }
        if ($orderStatus!=null) {
            $conditions[] = "orderStatus = ?";
            $params[] = $orderStatus;
            $types .= "i";
        }

        if ($productName!=null) {
            $conditions[] = "productName LIKE ?";
            $params[] = "%" . $productName . "%";
            $types .= "s";
        }



        // 將條件附加到查詢
        if (count($conditions) > 0) {
            $query .= " AND " . implode(" AND ", $conditions);
        }
        // error_log("Generated SQL Query: " . $query);
        // error_log("Parameters: " . implode(", ", $params));

        // 準備並綁定參數
        $stmt = $mydb->prepare($query);

        // if ($stmt === false) {
        //     die("Prepare failed: " . $mydb->error);
        // }

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
        // $orderID = $_POST['orderID'];
        $orderExist = $_POST['orderExist'];
        $orderProductID = $_POST['orderProductID'];
        $productQ = $_POST['productQ'];
        $buyerName = $_POST['buyerName'];
        $buyerEmail = $_POST['buyerEmail'];
        $buyerTel = $_POST['buyerTel'];
        $buyerAddr = $_POST['buyerAddr'];
        $transportNote = $_POST['transportNote'];
        // $orderDate = $_POST['orderDate'];
        date_default_timezone_set('Asia/Taipei');
        $orderDate = date("Y/m/d H:i:s",time());
        $payment = $_POST['payment'];
        $receiptType = $_POST['receiptType'];
        $companyTitle = $_POST['companyTitle'];
        $taxIDNumber = $_POST['taxIDNumber'];
        $orderStatus = $_POST['orderStatus'];


        $sql = 'INSERT INTO orderlist (orderExist,orderProductID,productQ,buyerName,buyerEmail,buyerTel,buyerAddr,transportNote,orderDate,payment,receiptType,companyTitle,taxIDNumber,orderStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('iiissssssssssi', $orderExist,$orderProductID, $productQ, $buyerName, $buyerEmail, $buyerTel,$buyerAddr,$transportNote,$orderDate,$payment,$receiptType,$companyTitle,$taxIDNumber,$orderStatus);
        $stmt->execute();

        $orderID = $mydb->insert_id;



        echo json_encode(["message" => "insert: " . $orderID . "---OK"]);

        break;

    case "DELETE":
        $output = json_decode(file_get_contents('php://input'), true);
        $orderID = $output['orderID'];


        $sql = 'DELETE FROM orderlist WHERE orderID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('i', $orderID);
        $stmt->execute();


        echo json_encode(["message" => "delete: " . $orderID . " --- OK"]);
        break;

    case "PUT":
        $output = json_decode(file_get_contents('php://input'), true);
        $orderID = $output['orderID'];
        $orderExist = $output['orderExist'];
        $orderProductID = $output['orderProductID'];
        $productQ = $output['productQ'];
        $buyerName = $output['buyerName'];
        $buyerEmail = $output['buyerEmail'];
        $buyerTel = $output['buyerTel'];
        $buyerAddr = $output['buyerAddr'];
        $transportNote = $output['transportNote'];
        $orderDate = $output['orderDate'];
        $payment = $output['payment'];
        $receiptType = $output['receiptType'];
        $companyTitle = $output['companyTitle'];
        $taxIDNumber = $output['taxIDNumber'];
        $orderStatus = $output['orderStatus'];


        $sql = 'UPDATE orderlist SET orderExist = ?, orderProductID = ? ,productQ = ?, buyerName = ? , buyerEmail = ? , buyerTel = ?, buyerAddr = ?, transportNote = ?, orderDate = ?, payment = ?, receiptType = ?, companyTitle = ?, taxIDNumber = ?, orderStatus = ? WHERE  orderID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('iiissssssssssii', $orderExist,$orderProductID, $productQ, $buyerName, $buyerEmail, $buyerTel,$buyerAddr,$transportNote,$orderDate,$payment,$receiptType,$companyTitle,$taxIDNumber,$orderStatus,$orderID);
        $stmt->execute();



        echo json_encode(["message" => "update: " . $orderID . " --- OK"]);
        break;
    // {"orderID":4,"orderExist":0,"orderProductID":"2","productQ":"3","buyerName":"bitch","buyerEmail":"Bitch@","buyerTel":"09123123","buyerAddr":"台中市康橋下","transportNote":"d","orderDate":"2024-07-18 00:10:00","payment":"shit","receiptType":"d","companyTitle":"f","taxIDNumber":"091232","orderStatus":"1"}

    case "PATCH":
        $output = json_decode(file_get_contents('php://input'), true);

        $orderID = $output['orderID'];
        $orderExist = $output['orderExist'];

        $sql = "UPDATE orderlist SET orderExist = ? WHERE orderID = ?";
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param("ii", $orderExist,$orderID);
        $stmt->execute();

        echo json_encode(["message" => "更改訂單狀態" . $orderID . " --- OK"]);
        //    {"orderID":4,"orderExist":1}

        break;

}
?>