
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
	div2.html(hours + ":" + mins +ampm);
	blankDiv.append(div1);
	blankDiv.append(div2);
	$("#alarms").append(blankDiv);
}


function addAlarm() {
	var hours = $("#hours option:selected").text();
	var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var alarmName = $("#alarmName").val();

	var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName}, {
      success: function(object) {
        insertAlarm(hours, mins, ampm, alarmName);
		hideAlarmPopup();
      }
    });
}

function getAllAlarms() {
	Parse.initialize("vC5Npzg5L5xeSOOdLClryl4cfpC0cuPHuTMoKpXH", "1jC5M6BzOI3r352eoaa8UbUMYbCkJWswWLCEhvvF");
	    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            insertAlarm(results[i].get("hours"), results[i].get("mins"), results[i].get("ampm"), results[i].get("alarmName"));
          }
        }
    });
}

function showDeletePopup() {
	$("#mask").removeClass("hide");
	$("#Deletepopup").removeClass("hide");
}

function hideDeletePopup() {
	$("#mask").addClass("hide");
	$("#Deletepopup").addClass("hide");
}

function deleteAlarm() {
	var Alarm = Parse.Object.extend("Alarm");
	var query = new Parse.Query(Alarm);
	var find = false;

	query.find({
		success: function(list) {
			for(var i = 0; i < list.length; i++) {
				if(list[i].get("alarmName") == document.getElementById("deleteAlarmName").value) {
					find = true;
					list[i].destroy({
  						success: function(del) {
  							alert("Successfully Deleted.")
  						},
  						error: function(del) {
  							alert("Could not delete.")
  						}
					});
				}
					if(find == true) {
						alert("Deleted.")
					}
					else {
						alert("Could not find alarm.")
					}
					hideDeletePopup();
					location.reload();
			}
		}

	});
}










