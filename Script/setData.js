// check if basic input is not rmpty and correct
function checkBasicIbput() { 
    var allInput = document.getElementsByName("inp-basic");
    var typeOption = document.getElementById("type");
    var gluten = document.getElementById("gluten");
    var milk = document.getElementById('milk');
    var flag = true;
    // chek if basic field is empty
    for(var i=0;i<6;i++){
        if(allInput[i].value == ''){
            setError(allInput[i].id);
            flag = false;
        }
    }
    //check if type food selected
    if(typeOption.options[typeOption.selectedIndex].value == 'type') {
        typeOption.style.border = '2px solid red';
        typeOption.style.boxShadow = '3px 3px 6px black';
        flag = false;
    }
    //check if gluten selected
    if(gluten.options[gluten.selectedIndex].value == 'gluten') {
        gluten.style.border = '2px solid red';
        gluten.style.boxShadow = '3px 3px 6px black';
        flag = false;
    }
    //check if milk selected
    if(milk.options[milk.selectedIndex].value == 'milk') {
        milk.style.border = '2px solid red';
        milk.style.boxShadow = '3px 3px 6px black';
        flag = false;
    }
    return flag;  
}
// send food items with ajax if akk cirrect
function btnAddItem() {
    var name = document.getElementById('name').value;
    var company = document.getElementById('company').value;
    var calories = document.getElementById('calories').value;
    var protein = document.getElementById('protein').value;
    var carbohydrates = document.getElementById('carbohydrates').value;
    var fats = document.getElementById('fats').value;
    var saturated_fat = document.getElementById('saturated_fat').value;
    var trans_fat = document.getElementById('trans_fat').value;
    var cholesterol = document.getElementById('cholesterol').value;
    var fiber = document.getElementById('fiber').value;
    var sugar = document.getElementById('sugar').value;
    var sodium = document.getElementById('sodium').value;
    var calcium = document.getElementById('calcium').value;
    var typeOption = document.getElementById("type");
    var gluten = document.getElementById("gluten");
    var milk = document.getElementById('milk');

    //send data on array to server
    if(checkBasicIbput() == true) {
        waiting();
        $.post('./main.php', // url
            {              //data
                action:         'product',
                name:           name, 
                company:        company,
                calories:       calories,
                protein:        protein,
                carbohydrates:  carbohydrates,
                fats:           fats,
                saturated_fat:  saturated_fat == '' ? 0 : saturated_fat,
                trans_fat:      trans_fat == '' ? 0 : trans_fat,
                cholesterol:    cholesterol == '' ? 0 : cholesterol,
                fiber:          fiber == '' ? 0 : fiber,
                sugar:          sugar == '' ? 0 : sugar,
                sodium:         sodium == '' ? 0 : sodium,
                calcium:        calcium == '' ? 0 : calcium,
                type:           typeOption.value == 'tevoni' ? 0 : typeOption.value == 'zimhoni' ? 1 : 2,
                gluten:         gluten.value == 'yes' ? 1 : 0,
                milk:           milk.value == 'yes' ? 1 : 0
            },
            function(data) { // call back
                if(data == 1){ // add item seccess
                    document.getElementById('items').innerHTML = "<span style='color:blue;'>."+name+"</span>"+" נקלט בהצלחה";
                    getCountItems();
                }
                else if(data == -1) // item is exist in data base
                    document.getElementById('items').innerHTML = 'הפריט קיים במערכת'+'<br>';
                else if (data == 0) // some error in insert data
                    document.getElementById('items').innerHTML = 'תקלה,פריט לא נשמר במערכת'+'<br>';
                removeWaiting();
            });
    }
    else{
        console.log('ajax: data not send!');
        return;
    }
    return;
}

/*set error if user forget inputs*/
function setError(data) {
        switch(data) {
            case 'name':
                document.getElementById(data).style.border = '2px solid red';
                document.getElementById(data).style.boxShadow = '3px 3px 6px black';
                break;
            case 'company':
                document.getElementById(data).style.border = '2px solid red';
                document.getElementById(data).style.boxShadow = '3px 3px 6px black';
                break;
            case 'calories':
                document.getElementById(data).style.border = '2px solid red';
                document.getElementById(data).style.boxShadow = '3px 3px 6px black';
                break;
            case 'protein':
                document.getElementById(data).style.border = '2px solid red';
                document.getElementById(data).style.boxShadow = '3px 3px 6px black';
                break;
            case 'carbohydrates':
                document.getElementById(data).style.border = '2px solid red';
                document.getElementById(data).style.boxShadow = '3px 3px 6px black';
                break;
            case 'fats':
                document.getElementById(data).style.border = '2px solid red';
                document.getElementById(data).style.boxShadow = '3px 3px 6px black';
                break;
        }
    }
/*clear all input*/
function clearInputs() {
    var allInput = document.getElementsByTagName("input");
    document.getElementById("type").value = 'type';
    document.getElementById("gluten").value ='gluten';
    document.getElementById('milk').value = 'milk';
    for(var i=0;i<allInput.length;i++)
        allInput[i].value='';
    resetArrayVtmnMnrl();
}


