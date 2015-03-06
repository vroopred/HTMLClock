function init() {
	return {
		"client_id": "21eec6be4ca6b11" ,
		"type":"token", 
		"callback_function": "callback"
	}
}

function login() {
	var json = init();
	var url = "https://api.imgur.com/oauth2/authorize?client_id=" +json.client_id+"&response_type=" +json.type+"&state=login";
	newWindow = window.open(url, 'Login to Imgur', 'height=200,width=150');
}

function callback() {
   $.ajax({
      url: "https://api.imgur.com/3/account/me",
      type: 'GET',
      dataType: 'json',
      success: function (result) {
         alert('Logged in as: ' + result.data.url);
      },
      error: function (result) {
         console.log(JSON.stringify(result));
      },
      beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("OAuth2"));
      }
   });
}