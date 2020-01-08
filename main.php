<?php
require_once './php/DB.php';
$db = new DB();
if(isset($_POST['action']) === true){
    switch($_POST['action']) {
        case 'product':
            if($db->isExists($_POST['name'],$_POST['company'])) { // check if name product is alredy exist
                echo -1; // item is exist
            }
            else { // if name product not exist, add product to data base
                if($db->addItem($_POST['name'],$_POST['company'], $_POST['calories'], $_POST['protein'], $_POST['carbohydrates'], $_POST['fats'], $_POST['type'],
                    $_POST['gluten'], $_POST['milk'], $_POST['saturated_fat'], $_POST['trans_fat'], $_POST['cholesterol'], 
                        $_POST['fiber'], $_POST['sugar'], $_POST['sodium'], $_POST['calcium']) == TRUE) 
                    echo 1; // item add
                else
                    echo 0; // some error 
            }
            break;
        case 'count_items':
            echo $db->countItems();
            break;
        case 'autoComplete':
            echo $db->autoCompleteSearch($_POST['str'], $_POST['len']);
            break;
        case 'getItem':
            echo $db->getItemByID($_POST['id_item']);
            break;
        case 'updateItem':
            echo $db->updateItem($_POST['col'], $_POST['nameItem'], $_POST['value']);
            break;
        case 'getIDitem':
            echo $db->getIDitem($_POST['name'],$_POST['company']);
            break;
        case 'save_meal':
            echo $db->setMeal($_POST['meal_item'],$_POST['id_user']);
            break;
    }
    return;
}
else {
    echo "action not exist...";
    return;
}
