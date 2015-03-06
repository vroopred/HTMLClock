var clientId;
var type;
var callBack;


function init(json){
   clientId = json.client_id;
   type = json.type;
   callBack = json.callback_function;
}

function login(){
   window.open("https://api.imgur.com/oauth2/authorize?client_id="+clientId+"&response_type="+type+"&state=login");
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
         alert("Yoooooooo "+reply.data.url+" :)");
      }
   });
}