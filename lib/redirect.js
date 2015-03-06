function redirectInit() {
	var params = {};
	var aToken = location.hash.substring(1);
    var regex = /([^&=]+)=([^&]*)/g;
    var m;
    while (m = regex.exec(aToken)) {
  		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	alert("here!");
	if(!params['access_token']) {
      alert("access denied");
   }
   else {
   		alert("here2");
      localStorage["token"] =  params['access_token'];
      window.opener.callback();
   }
    window.close();
}
