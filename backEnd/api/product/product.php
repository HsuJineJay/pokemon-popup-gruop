<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");

$parts = explode("/", $_SERVER["REQUEST_URI"]);

$method = $_SERVER["REQUEST_METHOD"];

$mydb = new mysqli('localhost', 'root', '', 'mfeeDB');
$mydb->set_charset('utf8');

if ($mydb->connect_error) {
    die("Connection failed: " . $mydb->connect_error);
}

$parts = explode("/", $_SERVER["REQUEST_URI"]);
$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        $productID = isset($_GET['productID']) ? $_GET['productID'] : null;
        $productExist = isset($_GET['productExist']) ? $_GET['productExist'] : null;
        $productName = isset($_GET['productName']) ? $_GET['productName'] : null;
        $productType = isset($_GET['productType']) ? $_GET['productType'] : null;
        $productDescribe = isset($_GET['productDescribe']) ? $_GET['productDescribe'] : null;
        $productPrice = isset($_GET['productPrice']) ? $_GET['productPrice'] : null;
        $productInStock = isset($_GET['productInStock']) ? $_GET['productInStock'] : null;
        $storeOnly = isset($_GET['storeOnly']) ? $_GET['storeOnly'] : null;
        $productMain = isset($_GET['productMain']) ? $_GET['productMain'] : null;

        // 構建基本 SQL 查詢
        $query = "SELECT * FROM product LEFT JOIN productImg ON product.productID = productImg.imgProductID WHERE 1 = 1 ";

        // 構建條件陣列
        $conditions = [];
        $params = [];
        $types = "";

        // 添加篩選條件
        if ($productID!=null) {
            $conditions[] = "productID = ?";
            $params[] = $productID;
            $types .= "i";
        }
        if ($productExist!=null) {
            $conditions[] = "productExist = ?";
            $params[] = $productExist;
            $types .= "i";
        }
        if ($productName!=null) {
            $conditions[] = "productName LIKE ?";
            $params[] = "%" . $productName . "%";
            $types .= "s";
        }
        if ($productType!=null) {
            $conditions[] = "productType LIKE ?";
            $params[] = "%" . $productType . "%";
            $types .= "s";
        }
        if ($productDescribe!=null) {
            $conditions[] = "productDescribe LIKE ?";
            $params[] = "%" . $productDescribe . "%";
            $types .= "s";
        }
        if ($productPrice!=null) {
            $conditions[] = "productPrice = ?";
            $params[] = $productPrice;
            $types .= "i";
        }
        if ($productInStock!=null) {
            $conditions[] = "productInStock = ?";
            $params[] = $productInStock;
            $types .= "i";
        }
        if ($storeOnly!=null) {
            $conditions[] = "storeOnly = ?";
            $params[] = $storeOnly;
            $types .= "i";
        }
        if ($productMain!=null) {
            $conditions[] = "productMain = ?";
            $params[] = $productMain;
            $types .= "i";
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
            $productID = $row->productID;
        
            // 如果這個產品還沒有在數組中，初始化它
            if (!isset($data[$productID])) {
                $data[$productID] = [
                    'productID' => $row->productID,
                    'productExist' => $row->productExist,
                    'productName' => $row->productName,
                    'productType' => $row->productType,
                    'productDescribe' => $row->productDescribe,
                    'productPrice' => $row->productPrice,
                    'productInStock' => $row->productInStock,
                    'storeOnly' => $row->storeOnly,
                    'productMain' => $row->productMain,
                    'productImg' => []
                ];
            }
        
            // 如果這條記錄有評論，將評論添加到產品的圖片物件
            if ($row->imgId) {
                $data[$productID]['productImg'][] = [
                    'imgId' => $row->imgId,
                    'productImg' => $row->productImg
                ];
            }
        }
        
        // 將結果轉換為索引數組
        $data = array_values($data);
    
        $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
        echo $myJSON_data;
        break;



    case "POST":
        
        $productExist = $_POST['productExist'];
        $productName = $_POST['productName'];
        $productType = $_POST['productType'];
        $productDescribe = $_POST['productDescribe'];
        $productPrice = $_POST['productPrice'];
        $productInStock = $_POST['productInStock'];
        $storeOnly = $_POST['storeOnly'];
        $productMain = $_POST['productMain'];

        
        $sql = 'INSERT INTO product (productExist,productName,productType,productDescribe,productPrice,productInStock,storeOnly,productMain) VALUES (?,?,?,?,?,?,?,?)';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('isssiiii', $productExist,$productName,$productType,$productDescribe,$productPrice,$productInStock,$storeOnly,$productMain);
        $stmt->execute();
        
        $productID = $mydb->insert_id;
        // var_dump($_POST['productImg']);
        $productImg = json_decode($_POST['productImg']);
        if (json_last_error() !== JSON_ERROR_NONE) {
            die("JSON decode error: " . json_last_error_msg());
        }
        // var_dump($productImg) ;
        // var_dump($productImg);


        foreach($productImg as $key => $value) {
            $sql = 'INSERT INTO productImg (imgProductID,productImg) VALUES (?,?)';
            $stmt = $mydb->prepare($sql);
            // echo $value;
            $stmt->bind_param('is', $productID,$value->img);
            $stmt->execute();
        }



        echo json_encode(["message" => "insert: " . $productID . "---" . $productName]);
        ///備註/// 輸入圖片連結時 請用json [{"img" : "./ddd"},{"img" : "./sss"},{"img" : "./fff"}]
        break;

    case "DELETE":
        $output = json_decode(file_get_contents('php://input'), true);
        $productID = $output['productID'];
        $imgProductID = $output['productID'];


        $sql = 'DELETE FROM productImg WHERE imgProductID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('i', $imgProductID);
        $stmt->execute();

        $sql = 'DELETE FROM product WHERE productID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('i', $productID);
        $stmt->execute();


        echo json_encode(["message" => "delete: " . $productID . " --- OK"]);
        break;

    case "PUT":
        $output = json_decode(file_get_contents('php://input'), true);
        // var_dump(json_encode($output));
        $productID = $output['productID'];
        $productExist = $output['productExist'];
        $productName = $output['productName'];
        $productType= $output['productType'];
        $productDescribe = $output['productDescribe'];
        $productPrice = $output['productPrice'];
        $productInStock = $output['productInStock'];
        $storeOnly = $output['storeOnly'];
        $productMain = $output['productMain'];
        

        $sql = 'UPDATE product SET productExist = ?, productName = ? ,productType = ?, productDescribe = ? , productPrice = ? , productInStock = ?, storeOnly = ?, productMain = ? WHERE productID = ?';
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param('isssiiiii', $productExist, $productName, $productType, $productDescribe, $productPrice, $productInStock,  $storeOnly,  $productMain, $productID);
        $stmt->execute();

        $sql2 = 'DELETE FROM productImg WHERE imgProductID = ?';
        $stmt2 = $mydb->prepare($sql2);
        $stmt2->bind_param('i', $productID);
        $stmt2->execute();

        // $productImg = explode(' ',$output['productImg']);
        // $productImg = json_decode($output['productImg']);
        $productImg = $output['productImg'];
        // var_dump($productImg);
        foreach($productImg as $key => $value) {
            $sql3 = 'INSERT INTO productImg (imgProductID,productImg) VALUES (?,?)';
            $stmt3 = $mydb->prepare($sql3);
            $stmt3->bind_param('is', $productID,$value['img']);
            $stmt3->execute();
        }

        echo json_encode(["message" => "update: " . $productID . " --- OK"]);
        break;
        //productImg 的value 要輸入陣列
        // {"productID":13,"productExist":0,"productName":"ppp","productType":"fod","productDescribe":"God","productPrice":1,"productInStock":1,"productMain":1,"storeOnly":1,"productImg":[{"img" : "./ddd"},{"img" : "./sss"},{"img" : "./fff"}]}
    case "PATCH":
        $output = json_decode(file_get_contents('php://input'), true);

        $productID = $output['productID'];

        $productExist = isset($output['productExist'])? $output['productExist'] : null;
        $productInStock = isset($output['productInStock'])? $output['productInStock'] : null;
        $storeOnly = isset($output['storeOnly'])? $output['storeOnly'] : null;
        $productMain = isset($output['productMain'])? $output['productMain'] : null;
        // var_dump($productExist) ;
        // var_dump($productExist !== null );
        // var_dump($productMain) ;
        // var_dump($productMain !== null );

        $conditions = '';
        // $params = 0;
        $types = "";

        if($productExist !== null){
            $conditions = 'productExist = ?';
            $params = $productExist;
            $types = 'i';
            // echo 'productExist';
        }
        if($productInStock !== null){
            $conditions = 'productInStock = ?';
            $params = $productInStock;
            $types = 'i';
            // echo 'productInStock';
        }
        if($storeOnly !== null){
            $conditions = 'storeOnly = ?';
            $params = $storeOnly;
            $types = 'i';
            // echo 'storeOnly';
        }
        if($productMain !== null){
            $conditions = 'productMain = ?';
            $params = $productMain;
            $types = 'i';
            // echo 'productMain';
        }else{
            // echo "wait a minute some ain`t right";
        }

        $sql = "UPDATE product SET " .$conditions. " WHERE productID = ?";
        // echo $sql;
        var_dump($params) ;
        $stmt = $mydb->prepare($sql);
        $stmt->bind_param("ii", $params,$productID);
        $stmt->execute();

        echo json_encode(["message" => "patch product ID =" . $productID . " --- OK"]);

            break;
}
?>