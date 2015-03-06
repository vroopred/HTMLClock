function init() {
	return {
		"client_id": "21eec6be4ca6b11" ,
		"type":"token", 
		"callback_function": "callback"
	};
}

function login() {
	var json = init();
	var url = "https://api.imgur.com/oauth2/authorize?client_id=" +json.client_id+"&response_type=" +json.type+"&state=login";
	var newWindow = window.open(url);
}

var callback = function callback() {
   $.ajax({
      url: "https://api.imgur.com/3/account/me",
      type: "GET",
      headers: {
         "Authorization": "Bearer " + localStorage["token"]
      },
      success: function(data, textStatus, xhr){
         alert("Hello "+ data.data.url +"!");
      }
   });
}