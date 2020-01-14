function appendSpinner(){
    let spinner = document.createElement('div');
    spinner.setAttribute("class","spinner");
    spinner.setAttribute("id","spinner");
    document.body.appendChild(spinner);
}
function onSppiner(){
    document.getElementById("spinner").style.display="block";
}
function offSpinner(){
    document.getElementById("spinner").style.display="none";
}
function onLoadIndex(){
    let obj = localStorage.getItem('user');
    if(obj===null)
        window.location.href="./login.html";
    else{
        user = JSON.parse(obj);
        document.getElementById("user").innerHTML=user.first_name+" "+user.last_name;
    }
}
function onDisconnet(){
    localStorage.clear();
    window.location.href="./login.html";
}
/* nav bar */
function btnNavBar(e,tab) {
    var content = document.getElementsByClassName('tab-content');
    var tabs = document.getElementsByClassName("btn-nav");
    for(var i=0;i<content.length;i++){
        content[i].style.display='none';
        tabs[i].className = tabs[i].className.replace(" active","");
    }
    document.getElementById(tab).style.display='block';
    e.currentTarget.className += " active";
    
}

/* all function for calculaor */
function bmrCalculate(){
    var genderDom = document.getElementById('bmr-gender');
    var gender = genderDom.options[genderDom.selectedIndex].value;
    var weight = document.getElementById('bmr-weight').value;
    var height = document.getElementById('bmr-height').value;
    var age = document.getElementById('bmr-age').value;
    var resLabel = document.getElementById('bmr-label-res');

    resLabel.style.color = 'white';

    if(weight!=0 && height!=0 && age!=0) {
        if(gender == 0) { // is male
            var res = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
            var resFloat = parseFloat(res).toFixed(2);
            resLabel.innerHTML = resFloat;
        }
        else if(gender == 1) { // is female
            var res = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
            var resFloat = parseFloat(res).toFixed(2);
            resLabel.innerHTML = resFloat;
        }
    }
    else {
        resLabel.style.color = 'red';
        resLabel.innerHTML = 'נתונים חסרים';
    }
}
function bmiCalculate() {
    var w = document.getElementById('bmi-weight').value;
    var h = document.getElementById('bmi-height').value;
    var resLabel = document.getElementById('bmi-label-res');
    var slide = document.getElementById('slider');
    if(w!=0 && h!=0) { 
        heightInMeter = h/100;
        var res = w / (heightInMeter*heightInMeter);
        var resFloat = parseFloat(res).toFixed(2);

        //set slier
        slide.value = resFloat;
        if(resFloat <= 18.5) {  //under weight
            resLabel.innerHTML = resFloat +"<br>"+ "תת משקל";
        }
        else if(resFloat > 18.5 && resFloat < 25) { // normal wright
            resLabel.innerHTML = resFloat +"<br>"+ "משקל תקין";
        }
        else if(resFloat >= 25 && resFloat <= 30) { // over weight
            resLabel.innerHTML = resFloat +"<br>"+ "עודף משקל";
        }
        else if (resFloat > 30) { // obese
            resLabel.innerHTML = resFloat +"<br>"+ "עודף משקל חריג";
        }
    }
    else {
        resLabel.style.color = 'red';
        resLabel.innerHTML = 'נתונים חסרים';
    }
}