function getTime() {
    var date=new Date();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();
    if(minutes<10) 
    	{minutes = "0"+minutes};
    if(seconds<10) 
    	{seconds = "0"+seconds}; 
    document.getElementById('clock').innerHTML = hours+":"+minutes+":"+seconds;
    setTimeout(function(){getTime()},1000);
}