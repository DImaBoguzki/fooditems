function getCountItems() {
    var lblCountItems = document.getElementById('lbl-count-items');
    $.post(
        './main.php',
        {action: 'count_items'},
        (data)=> {
            lblCountItems.innerHTML = 'מספר הפריטים במאגר  <label style= "color:red;">' + data + '</label>';
        }
    );
}
function searchInputFocus() {
    document.getElementById('search-items').value ='';
    document.getElementById('ul-autocomplete').style.display = 'block';
    clearAutoCompleteList(); // clear list
}
function clearAutoCompleteList() {
    document.getElementById('ul-autocomplete').innerHTML = '';
}
/**no check user key down (only check arrow down or up) */
function autoComplete(event){
    let inpSearch = document.getElementById('search-items');
    let list = document.getElementById('ul-autocomplete');
    if(inpSearch.value != '' && event.keyCode != 38 && event.keyCode != 40) {
        $.post(
            './main.php',
            {action: 'autoComplete',str: inpSearch.value, len: inpSearch.value.length},
            function(data) {
                clearAutoCompleteList(); // clear list
                for(var i=0;i<data.length;i++){
                    //apend new option to auto complete list
                    var newOptionElement = document.createElement("li");
                    newOptionElement.setAttribute("id", i); // id
                    newOptionElement.setAttribute('id_item',data[i]['id']); // id item in data base
                    newOptionElement.setAttribute("tabindex", -1); // tabindex for focus
                    newOptionElement.setAttribute("name", 'li-auto-complete'); // name list
                    newOptionElement.setAttribute("onclick", "previewItemToTable(this.getAttribute('id_item'),this.innerText);"); // function onclick getitem
                    newOptionElement.textContent = data[i]['name'];
                    list.appendChild(newOptionElement);
                }
            },'JSON'
        );
    }
}
function getItemByID(id){
    $.post('./main.php',{id_item:id})
    .done((data)=>{
        console.log(data);
    })
    .fail((error)=>{
        console.log(error);
    })

}
// on delete item
function onDeleteItem(id){
    if(!confirm("אתה בטוח רוצה למחוק פריט זה?")){
        return;
    }
    $.post('./main.php',{action:'delete_item',id_item:id})
    .done((data)=>{
        if(data==1){
            alert("הפריט נמחק");
            document.getElementById('table-item-value').innerHTML="";
        }
        else{
            alert("תקלה במחיקת פריט");
        }
    })
    .fail((error)=>{console.log(error)});
}
/*get items and set table of value of item */
function previewItemToTable(idItem, nameItem) {
    document.getElementById('search-items').value = nameItem;
    document.getElementById('ul-autocomplete').style.display = 'none';
    document.getElementById('table-item-value').style.display = 'table';
    $.post(
        './main.php',
        {action : 'getItem', id_item : idItem},
        (data)=> {
            //set table value
            var table = document.getElementById('table-item-value');
            table.style.border = '1px solid black';
            table.innerHTML=''; //clear table before set new item
            // set table all value of item
            Object.keys(data).forEach((key)=> {
                if(convertNameValue(key) != null) { // if type value is for table
                    let tr = document.createElement('tr');
                    let tdValue = document.createElement('td');
                    let tdKey = document.createElement('td');

                    tdValue.setAttribute('nameItem',data['name']);
                    tdValue.setAttribute('ondblclick',"editValue(event,'dbl');");
                    tdValue.setAttribute('ontouchstart',"touchHoldEditValue(event,'edit',null)");
                    tdValue.setAttribute('name',key);

                    if(key == 'name' || key == 'company') { // if is name items or company
                        if(data[key] !=0 && data[key] !=null) {
                            tdValue.setAttribute('colspan',2);
                            tdValue.style.backgroundColor='grey';
                            tdValue.appendChild(document.createTextNode(data[key]));
                            tr.appendChild(tdValue);
                        }
                    }
                    else { // if is value 
                        tdKey.appendChild(document.createTextNode(convertNameValue(key)));
                        tdValue.appendChild(document.createTextNode(data[key]));
                        tr.appendChild(tdKey);
                        tr.appendChild(tdValue);
                    }
                    table.appendChild(tr);
                }
            });
            let tr = document.createElement('tr');
            let tdValue = document.createElement('td');
            let btn = document.createElement("BUTTON");
            btn.innerHTML="מחק";
            tdValue.setAttribute('colspan',"2");
            btn.setAttribute("onclick", "onDeleteItem("+data['id']+")");
            btn.setAttribute("style", "background-color:red");
            tdValue.appendChild(btn);
            tr.appendChild(tdValue);
            table.appendChild(tr);

        },'JSON'
    );
}

function convertNameValue(str) {
    switch(str){
        case 'name':            return 'שם מוצר';
        case 'company':         return 'חברה';
        case 'calories':        return 'קלוריות';
        case 'proteins':        return 'חלבון';
        case 'carbohydrates':   return 'פחמימות';
        case 'fats':            return 'שומן';
        case 'saturated_fat':   return 'שומן רווי';
        case 'trans_fat':       return 'שומן טראנס';
        case 'cholesterol':     return 'כולוסטרול';
        case 'fiber':           return 'סיבים תזונתיים';
        case 'sugar':           return 'סוכר';
        case 'sodium':          return 'נתרן';
        case 'calcium':         return 'סידן';
        default :               return null;
    }
}
/*לרדת או לעלות ברשימה של ה רשימה השלמה אוטומטית */
function arrowDownUpAutoCompleteList() {
    var activeFocus = document.activeElement;
    var liList = document.getElementsByName('li-auto-complete');
    if(event.keyCode == 40 ) {
        if(activeFocus.id == 'search-items' && liList.length > 0 ){
            document.getElementById('0').focus();
        }
        else if(activeFocus.getAttribute("name") == 'li-auto-complete') {
            var id = Number(activeFocus.id); // convert string id to number
            if (id < liList.length-1)
                id++;
            document.getElementById(id.toString()).focus();
        }
    }
    else if(event.keyCode == 38) {
        if(activeFocus.getAttribute("name") == 'li-auto-complete') {
            var id = Number(activeFocus.id); // convert string id to number
            if (id > 0)
                id--;
            document.getElementById(id.toString()).focus();
        }

    } // if focus on list and user pres not arrow keys then back focus to input
    else if(event.keyCode == 13 && activeFocus.getAttribute("name") == 'li-auto-complete') { // user press enter
        var IDitem = activeFocus.getAttribute('id_item');
        document.getElementById('ul-autocomplete').style.display = 'none';
        getItem(IDitem,activeFocus.innerText); // get data (ajax)
    }
    else if(activeFocus.getAttribute("name") == 'li-auto-complete') {
        document.getElementById('search-items').focus();
    }
}