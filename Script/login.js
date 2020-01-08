/* check if input name is valid */
function checkName(event) {
    var x = String.fromCharCode(event.keyCode);
    if(x.match(/[|\\/~^:,;?!&%$@*+.<>'"<>0123456789{}()[, \]]/)){
        event.preventDefault();
        return;
    }
}
function isValidEmail(emal){
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(emal); 
}
function isValidName(name){
    if(name.length==0) return false;
    for(let i=0;i<name.length;i++){
        if( !((name.charCodeAt(i)>=1488 && name.charCodeAt(i)<=1514) ||
            (name.charCodeAt(i)>=97 && name.charCodeAt(i)<=122) ||
            (name.charCodeAt(i)>=65 && name.charCodeAt(i)<=90)) )
            return false;
    }
    return true;
}

/*check if exist username cookie */
function checkCookie() {
    var c = getUserNameCookie();
    if(c !== null) {
        location.href = "index.html";
    }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    /* when expiry the date in milliseconds  */
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}
/* reurn 1 if is male, 0 if is female, -1 if not exist */
function getGenderCookie() {
    var allCookie = document.cookie.split(";");
    for(var i=0;i<allCookie.length;i++) {
        _cookie = allCookie[i].split("=");
        if(_cookie[0]==='username')
        {
            _userName = _cookie[1].split("-");
            return _userName[1];
        }
    }
    return -1;
}
/* get name of user name return string of user name or null if not excite*/
function getUserNameCookie() {
    var allCookie = document.cookie.split(";");
    for(var i=0;i<allCookie.length;i++) {
        _cookie = allCookie[i].split("=");
        if(_cookie[0]==='username')
        {
            _userName = _cookie[1].split("-");
            return _userName[0];
        }
    }
    return null
}
/* print all cookie name in console */
function printAllCookie() {
    var allCookie = document.cookie.split(";");
    for(var i=0;i<allCookie.length;i++) {
        console.log(allCookie[i]);
    }
}