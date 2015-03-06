function redirectInit() {
   //from imgur
   var params = {}, queryString = location.hash.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
   while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
   }
   //Check if there is an access token 
   if(params['access_token']) {
      localStorage["aToken"] =  params['access_token'];
      window.opener.callBack();
  }
  //if not log the undefined access token
  else {
   console.log(params['access_token']);
  }
   window.close()
}
window.onload = redirectInit;