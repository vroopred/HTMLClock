
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
			if(temp < 60) {
				$("body").addClass("cold");
			}
			else if(temp >= 60) {
				$("body").addClass("chilly");
			}
			else if(temp >= 70) {
				$("body").addClass("nice");
			}
			else if(temp >= 80) {
				$("body").addClass("warm");
			}
			else {
				$("body").addClass("hot");
			}
		});
}


function getInfo() {
	getTemp();
	getTime();
}