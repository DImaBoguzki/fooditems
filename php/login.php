<?php
    require_once "./DB.php";
    $db = new DB();

    $data = $db->getClientByEmail($_POST['email']);
    if($data===-1){
        error_log(date("Y-m-d H:i")."\nThe mail (". $_POST['email'] .") is not exist\n", 3, "./log/error.log");
        echo -1; // mail is not exist
    }
    else if(password_verify($_POST['password'], $data['password'])){
        $arr = array("id" => $data['id'],
         "first_name" => $data['first_name'],
         "last_name" => $data['last_name'],
         "email" => $data['email'],
         "date" => $data['date'],
         "weight" => $data['weight'],
         "heigth" => $data['heigth'],
         "gender" => $data['gender'],
         "permission" => $data['permission']);
        echo json_encode($arr);
    }
    else{
        error_log(date("Y-m-d H:i")."\nuser is not  available!\n", 3, "./log/error.log");
        echo 0;// the password is invalid
    }
?>