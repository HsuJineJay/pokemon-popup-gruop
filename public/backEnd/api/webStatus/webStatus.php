<?php

    // 底下範例程式碼針對上課使用，請在實際開發時進行調整

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
    header("Content-type: application/json; charset=UTF-8");

    $mydb = new mysqli('localhost','root','', 'mfeeDB');
    $mydb->set_charset('utf8');
    $method = $_SERVER["REQUEST_METHOD"];

    switch($method){
        case "GET":

                
            $sql = 'SELECT * FROM web;';
            $result = $mydb->query($sql);
                
            
            
            $data = [];
            while($row = $result->fetch_object()){
                $data[] = $row;
            }
        
            $myJSON_data = json_encode($data, JSON_UNESCAPED_UNICODE);
            echo $myJSON_data;
            break;


        case "PATCH":
                $output = json_decode(file_get_contents('php://input'), true);
                $id = $output['id'];
                $webStatus = $output['webStatus'];
      
                
               
                $sql = 'UPDATE web SET webStatus = ? WHERE id = ?';      
                $stmt = $mydb->prepare($sql);
                $stmt->bind_param('ii',$webStatus,$id);
                $stmt->execute();

                echo json_encode(["message"=>"update webStatus:". $webStatus. " --- OK"]);

                // data raw: {"id":1,"webStatus":1} 
            break;
    }

?>