/** event = TD  editing, status can be edit or update if update neet pas value for update item*/
function touchHoldEditValue(event,status,value) {
    var td = event.target;
    var count = 0;
    td.addEventListener('touchend',function() {
        clearInterval(t);
        count=0;
    });
    var t = setInterval(function(){
        if(count > 5){
            if(status == 'edit')
                editValue(event,'touch');
            else if(status == 'update')
                updateItem(td,value); 

            clearInterval(t);
            count=0;
        }
        count++;
    }, 100);
}

/** on dblclick/ontouchstart on td table of item value create input value to change value */
function editValue(event,type) {
    var td = event.target;
    // remove atribute ondblclick click from td
    type == 'dbl' ? td.removeAttribute("ondblclick") : td.removeAttribute("ontouchstart");
    var inp = document.createElement('input');
    if(event.target.getAttribute('name') == 'name' || event.target.getAttribute('name') == 'company')
        inp.setAttribute('type','text')
    else
        inp.setAttribute('type','number');

    td.innerHTML='';
    td.appendChild(inp);
    inp.focus();
    // update data
    if(type == 'dbl') // if user ckicked dbl click with mouse
        inp.addEventListener('dblclick',function(){
            updateItem(td,inp.value);
        }); 
    else if(type == 'touch') { // if user hold touch in mobile
        inp.addEventListener('touchstart',function(){
            touchHoldEditValue(event,'update',inp.value);
        }); 
    }
}
// send data with post ajax and update item in data base
function updateItem(td,value) {
    if(value == '')
        return;
    $.post(
        './main.php',
        {
            action: 'updateItem',
            col: td.getAttribute('name'),
            nameItem: td.getAttribute('nameItem'),
            value : value
        },
        function(data) {
            if(data == true) {
                td.innerHTML='';
                td.appendChild(document.createTextNode(value));
                td.setAttribute('ondblclick','editValue(event)');
            }
            else
                alert('שיגיאה, הערך לא עודכן');
        }
    );
}