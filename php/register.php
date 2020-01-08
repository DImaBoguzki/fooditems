<?php
    require_once './DB.php';
    $db = new DB();

    $fist_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];

    $pass = password_hash($_POST['password'],PASSWORD_DEFAULT);
    //$isGood = $bcrypt->verify('password', $hash);
    $heigth = $_POST['heigth'];
    $weight = $_POST['weight'];
    $bday = $_POST['bday'];
    $gender = $_POST['gender'];


    $res=$db->insertClient($fist_name,$last_name,$bday,$weight,$heigth,$email,$pass,$gender);
    if($res===1){
        header('Location: ../login.html');
    }
    else{
        $str = explode(" ", $res);
        if($str[0]==="Duplicate"){
            echo "המייל הזה כבר קיים <a href='../register.html'>חזרה</a>";
        }
        else{
                error_log(date("Y-m-d H:i")."\nerror with insert client the error is: ".$res."\n", 3,"./log/error.log");
            }
    }
?>