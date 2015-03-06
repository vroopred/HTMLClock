function redirectInit() {
   //from imgur
   var params = {}, queryString = location.hash.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
   while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
   }
   alert(params['access_token']);
   if(!params['access_token']) {
      alert("access denied");
   }
   else {
      localStorage["aToken"] =  params['access_token'];
      window.opener.callback_function();
   }

   window.close()
}
window.onload = redirectInit;