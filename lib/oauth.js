var client_id;
var type;
var callback_function;


function init(json){
   client_id = json.client_id;
   type = json.type;
   callback_function = json.callback_function;
}

function callback(){
   console.log(localStorage["token"]);
   $.ajax({
      url: "https://api.imgur.com/3/account/me",
      type: "GET",
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization','Bearer ' + localStorage["aToken"]);
      },
      success: function(reply){
         alert("Hey "+reply.data.url+"!!! Nice to see you :)");
      }
   });
}
function login(){
   window.open('https://api.imgur.com/oauth2/authorize?client_id='+client_id+'&response_type='+type+'&state=');
}