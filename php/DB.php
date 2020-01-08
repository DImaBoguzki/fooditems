<?php
header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('Asia/Jerusalem');
class DB {
    private $_conn = null;
    function __construct(){
        $this->conn = new mysqli('localhost','root','');
        if($this->conn->connect_errno)
            die('Connected error!');
        else {
            $this->conn->set_charset("utf8");
            mysqli_select_db($this->conn,"food_items");
        }
    }
    public function insertClient($fn,$ln,$date,$weight,$heigth,$email,$pass,$gender){
        $sql = "INSERT INTO client (first_name, last_name, date, weight,heigth,email,password,gender)
                VALUES ('$fn', '$ln', '$date', '$weight','$heigth','$email','$pass','$gender');";
        if ($this->conn->query($sql) === TRUE){
            return 1; // save client
        }else return mysqli_error($this->conn); // some problem
    }
    public function getClientByEmail($email){
        $sql = "SELECT * FROM client WHERE email='".$email."';";
        $res = $this->conn->query($sql);

        if($res->num_rows > 0){
            $data = $res->fetch_assoc();
            return $data;
        }
        else {
            return -1; // not exist mail....
        }

    }
    public function setMeal($items,$id_user){
        $date = date("Y-m-d H:i");
        $sql = "INSERT INTO meal (date,id_client) VALUES('$date','$id_user')";
        $meal_items=json_decode($items);
        //insert new meal
        if ($this->conn->query($sql) === TRUE){
            // last id of meal
            $id_meal = $this->conn->insert_id;
            //set all items of meal in table meal_item
            foreach ($meal_items as $val) {
                if($this->conn->query("INSERT INTO meal_item (id_meal,id_item,gram) VALUES($id_meal,$val->id,$val->weight);")===FALSE){
                    error_log(date("Y-m-d H:i")."\nerror with set item of meal: ".mysqli_error($this->conn)."\n", 3,"./php/log/error.log");
                    return -1; // some error with insert meal item
                }
            }
            return 1; // success insert meal items
        }
        else{
            error_log(date("Y-m-d H:i")."\nerror with setMeal: ".mysqli_error($this->conn)."\n", 3,"./php/log/error.log");
            return -1;
        }
    }
    /* 
     name = שם 
     cal = קלוריות
     carb = פחממות
     fats =  שומן
     type = טבעוני,צמחוני,בשרי
     gluten = גלוטן כן או לא
     milk = חלבי
     sfat =  שומן רווים
     tfat = שומן טראנס
     cholas =  כולוסטרול
     fiber = סיבים תזונתיים
     sugar = סוכר
     sodium = נתרן
     calsium =  סידן
    */
    public function addItem($name, $company, $cal, $prot, $carb, $fats, $type, $gluten, $milk, $sfat, $tffat, $cholas, $fiber, $sugar, $sodium, $calsium) {
        $sql = "INSERT INTO items (name,company,calories,proteins,carbohydrates,fats,type,gluten,milk,saturated_fat,trans_fat,cholesterol,fiber,sugar,sodium,calcium)
        VALUES ('".$name."','".$company."',".$cal.",".$prot.",".$carb.",".$fats.",".$type.",".$gluten.",".$milk.",".$sfat.",".$tffat.",".$cholas.",".$fiber.",".$sugar.",".$sodium.",".$calsium.")";
        
        if ($this->conn->query($sql) === TRUE) {
            return true;
        } else {
            echo "Error: " . $sql . "<br>" . $this->conn->error;
            return false;
        }
    }
    public function isExists($name,$company) {
        $result = $this->conn->query("SELECT id FROM items WHERE name='$name' AND company='$company'");
        if($result->num_rows > 0)
            return true;
        else 
            return false;
    }
    public function countItems() {
        $result = $this->conn->query('SELECT name FROM items');
        echo $result->num_rows;
    }
    public function autoCompleteSearch($str, $len) {
        $result = $this->conn->query("SELECT id, name, company FROM items WHERE LEFT(name , $len) = '$str' LIMIT 10");
        if(!$result){
            echo("Error description: " . $this->conn->error);
        }
        $json=array();
        while ($data = $result->fetch_assoc()) {
            $name = ($data['company'] != '0' && $data['company'] != '') ? $data['name'].','.$data['company'] : $data['name'];
            $arr = array("name" => $name, "id" => $data['id']);
            array_push($json, $arr);
        }
        echo json_encode($json);
    }
    public function getItemByID($id_item) {
        $res = $this->conn->query("SELECT * FROM items WHERE id ='$id_item'");
        if($res->num_rows > 0){
            $data = $res->fetch_assoc();
            echo json_encode($data);
        }
        else {
            echo 'לא נמצא פריט';
        }
    }
    /**update item tabel */
    public function updateItem($col, $nameItem, $val) {
        if ($this->conn->query("UPDATE items SET $col ='$val' WHERE name='$nameItem'") === TRUE) {
            echo TRUE;
        } 
        else {
            echo FALSE;
        }
    }
    // get item by name item and company item if return -1 not fount else return id item
    public function getIDitem($name, $company) {
        $res = $this->conn->query("SELECT id FROM items WHERE name='$name' AND company='$company'");
        if($res->num_rows > 0){
            $data = $res->fetch_assoc();
            echo $data['id'];
        }
        else {
            echo -1;
        }
    }
}



