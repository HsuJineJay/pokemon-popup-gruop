<?php
// echo 'v';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");


$method = $_SERVER["REQUEST_METHOD"];

$mydb = new mysqli('localhost', 'root', '', 'mfeeDB');
$mydb->set_charset('utf8');

$method = $_SERVER["REQUEST_METHOD"];

function executeSQL($sql){
    // 準備並綁定參數
    global $mydb;
    $stmt =  $mydb->prepare($sql);
        
    if ($stmt === false) {
        die("Prepare failed: " . $mydb->error);
    }

    // 執行查詢
    $stmt->execute();
    $result = $stmt->get_result();

    // 獲取結果
    while ($row = $result->fetch_object()) {
        global $finalData;
        $finalData[] = $row;
    }
}


switch ($method) {
    case "GET":
        $finalData = [];
        //-------------------------商品數量productNum
        // 構建基本 SQL 查詢
        $query = "SELECT COUNT(productID) as productNum FROM product";
        
        executeSQL($query);

        //-------------------------交易筆數orderNum
        $query = "SELECT COUNT(transactionID) AS orderNum FROM (SELECT transactionID FROM orderlist GROUP BY transactionID ) as tmp";

        executeSQL($query);

        //-------------------------交易總金額amount
        $query = "SELECT sum(orderAmount) as amount FROM orderlist";

        executeSQL($query);

        //-------------------------咖啡廳預定人數cafeBookingNum
        // 構建基本 SQL 查詢
        $query = "SELECT SUM(bookingNumber)as cafeBookingNum FROM cafeBooking;";

        executeSQL($query);

        //-------------------------咖啡廳預定人數storeBookingNum
        // 構建基本 SQL 查詢
        $query = "SELECT SUM(bookingNumber)as storeBookingNum FROM storeBooking;";

        executeSQL($query);







        // 將結果轉換為索引數組
        $myJSON_data = json_encode($finalData, JSON_UNESCAPED_UNICODE);

        echo $myJSON_data;
        break;


}
?>