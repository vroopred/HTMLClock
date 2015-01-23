function getTime() {
    var time = new Date().toLocaleTimeString();
    document.getElementById('clock').innerHTML = time;
    setTimeout(function(){getTime()},1000);
}