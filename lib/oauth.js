var client_id;
var type;
var callback_function;

var login_window;

var init = function(obj){
   client_id = obj.client_id;
   type = obj.type;
   callback_function = obj.callback_function;
}

var test = function(){
   console.log(localStorage["token"]);
   $.ajax({
      url: "https://api.imgur.com/3/account/me",
      type: "GET",
      headers: {
         "Authorization": "Bearer " + localStorage["token"]
      },
      success: function(data, textStatus, xhr){
         alert("Hello "+data.data.url+"!");
      }
   });
}

var login = function(){
   login_window = $(window.open('https://api.imgur.com/oauth2/authorize?client_id='+client_id+'&response_type='+type+'&state='));
   console.log("hello");
}