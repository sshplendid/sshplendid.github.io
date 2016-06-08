var globalVar;
var key = "150276580f5ca2b86fa916d47e744155";

function searchWeather() {
	//alert("set");
	var cityName;
	if($("#city").val() == "")
		cityName = "seoul";
	else
		cityName = $("#city").val();

	$.ajax({
		type:"get",
		url:"http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appId="+key,
		dataType:"json"
	}).complete(function(data){
		console.log(data.responseText);
		globalVar = eval("("+data.responseText+")");
		var response = data.responseText.weather;
		var weather = globalVar.weather[0].main;
		cityName = globalVar.name;
		var str = "The weather of "+cityName+" is " + weather+".\n";
		str += "And current temperature is " + globalVar.main.temp + "℃. (Max.Temp: " + globalVar.main.temp_max + "℃ / min.Temp: " + globalVar.main.temp_min + "℃)";

		$("#result").empty();
		$("#result").append(str);

		getMediaByLocation(globalVar.coord.lon, globalVar.coord.lat);
	});
}

function getCurrentLocation() {
	navigator.geolocation.getCurrentPosition(
			function geo_success(position) {
				console.log("getLocation-->"+(new Date().getTime()-sTime)+"ms");
		  		console.log(position.coords.latitude + ", " + position.coords.longitude);
		  		latitude = position.coords.latitude;
		  		longitude = position.coords.longitude;
		  		searchByCoord(position.coords.longitude, position.coords.latitude);
				getMediaByLocation(position.coords.longitude, position.coords.latitude);
			},
			function errorCallback(error) {
		  		console.log('ERROR(' + error.code + '): ' + error.message);
		});
}
function searchByCoord(longitude, latitude) {
	if(longitude == null || latitude == null) {
		return;	
	}

	var url = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appId="+key;
	$.ajax({
		type:"get",
		url:url,
		dataType:"json"
	}).complete(function(data){
		console.log(data.responseText);
		globalVar = eval("("+data.responseText+")");
		var response = data.responseText.weather;
		var weather = globalVar.weather[0].main;
		cityName = globalVar.name;
		var str = "The weather of "+cityName+" is " + weather+".\n";
		str += "And current temperature is " + globalVar.main.temp + "℃. (Max.Temp: " + globalVar.main.temp_max + "℃ / min.Temp: " + globalVar.main.temp_min + "℃)";

		$("#result").empty();
		$("#result").append(str);
		console.log("total-->"+(new Date().getTime()-sTime)+"ms");
	});	
}

	$(document).ready(function(){
		/*
		$("form").action = searchWeather();
		*/
		$("#city").keypress(function(e){
			console.log("key keyPress");
			if(e.which==13) {
				searchWeather();
			}
		});
		$("#searchBtn").bind("click", searchWeather);
		sTime = new Date().getTime();
		getCurrentLocation();
	});