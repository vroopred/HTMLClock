function redirectInit() {
	var params = {};
	var token = location.hash.substring(1),
    regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(queryString)) {
  		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	localStorage["token"] =  params['access_token'];
    window.opener.callback();
    window.close();
}

window.onload = redirectInit;