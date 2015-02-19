var userIDg = null;
function getTime() {
    var time = new Date().toLocaleTimeString();
    document.getElementById('clock').innerHTML = time;
     setTimeout(function(){getTime()},1000);

}

function getTemp() {
	$.getJSON("https://api.forecast.io/forecast/c6debd55d1caf6b070daba6dd3e2cbeb/35.300399,-120.662362?callback=?", 
		function(forecast) {
			$("#forecastLabel").html(forecast.daily.summary);
			var image = "img/" + forecast.daily.icon + ".png";
			$("#forecastIcon").attr("src", image);

			var temp = forecast.daily.data[0].temperatureMax;
			if(temp >= 90) {
				$("body").addClass("hot");
			}
			else if(temp >= 80) {
				$("body").addClass("warm");
			}
			else if(temp >= 70) {
				$("body").addClass("nice");
			}
			else if(temp >= 60) {
				$("body").addClass("chilly");
			}
			else {
				$("body").addClass("cold");
			}
		});
}

function getInfo() {
	getTemp();
	getTime();
}

function showAlarmPopup() {
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

function hideAlarmPopup() {
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName) {
	var blankDiv = $("<div></div>").addClass("flexable");
	var div1 = $("<div></div>").addClass("name");
	div1.html(alarmName);
	var div2 = $("<div></div>").addClass("time");
	div2.html(" &nbsp"+hours + ":" + mins +ampm);
	blankDiv.append(div1);
	blankDiv.append(div2);
	$("#alarms").append(blankDiv);

}


function addAlarm() {
	var hours = $("#hours option:selected").text();
	var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var alarmName = $("#alarmName").val();
	var time = {
    hours : hours,
    mins : mins,
    ampm : ampm,
  };

	var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"time": time, "alarmName": alarmName, "userID": userIDg}, {
      success: function(object) {
        insertAlarm(hours, mins, ampm, alarmName);
                alert("added");
				hideAlarmPopup();
      }
    });
}

function getAllAlarms(userID) {
      userIDg = userID;
	if(userID != null) {
	Parse.initialize("vC5Npzg5L5xeSOOdLClryl4cfpC0cuPHuTMoKpXH", "1jC5M6BzOI3r352eoaa8UbUMYbCkJWswWLCEhvvF");
	    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.equalTo('userID', userID);
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            insertAlarm(results[i].get("time").hours, results[i].get("time").mins, results[i].get("time").ampm, results[i].get("alarmName"));
          }
        }
    });
}
else {
	$("#alarms").html("");
}
}

function showDeletePopup() {
	$("#mask").removeClass("hide");
	$("#popupD").removeClass("hide");
}

function hideDeletePopup() {
	$("#mask").addClass("hide");
	$("#popupD").addClass("hide");
}

function deleteAlarm() {
	var Alarm = Parse.Object.extend("Alarm");
	var query = new Parse.Query(Alarm);
	var find = false;

	query.find({
		success: function(list) {
			for(var i = 0; i < list.length; i++) {
				if(list[i].get("alarmName") == document.getElementById("deleteAlarmName").value) {

					list[i].destroy({
  						success: function(del) {
  						},
  						error: function(del) {
  							alert("Error occured with deletion.");
  						}
					});
					find = true;
				}
					
			}
			if(find == true) {
						alert("Deleted.");
					}
			else {
					alert("Could not find alarm.");
				}
					hideDeletePopup();
		}

	});
}

	function deleteAlarm1(alarmName) {
	var Alarm = Parse.Object.extend("Alarm");
	var query = new Parse.Query(Alarm);
	var find = false;

	query.find({
		success: function(list) {
			for(var i = 0; i < list.length; i++) {
				if(list[i].get("alarmName") == alarmName) {

					list[i].destroy({
  						success: function(del) {
  						},
  						error: function(del) {
  							alert("Error occured with deletion.");
  						}
					});
					find = true;
				}
					
			}
			if(find == true) {
						alert("Deleted.");
					}
			else {
					alert("Could not find alarm.");
				}
					getAllAlarms();
		}

	});
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      userIDg = response.id;
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
    document.location.reload();
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '632458726855311',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {

    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Hi ' + response.name + '!';
        $("#alarms").html("");
     getAllAlarms(response.id);
     userIDg = response.id;
    });
  }