
var apikey = '570d11786802096d88c54acfde3523e3';

/////////////////////////////Geolocation//////////////////////////////////////////////


document.querySelector('#search').addEventListener('click', geoLookUp, false)

function geoLookUp(){
    const status = document.querySelector('#weatherUpdate')

    function success (position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        status.innerHTML = ` Weather for your current location with latitude: ${latitude} and lon: ${longitude}`;
        setWeather(latitude, longitude)    
    }

    function error(error){
        weatherUpdate.innerHTML = `Unable to retrieve your location. Error: ${error.code}. ${error.message}`
    }
    if (!navigator.geolocation){
        weatherUpdate.innerHTML = "Geolocation is not supported or allowed by your browser"
    }else{
        weatherUpdate.innerHTML = "Retrieving weather status at from your current location..."
        navigator.geolocation.getCurrentPosition(success,error)
    }
}

//////////////////////////////////////////////////////Weather App - Retrieving User Location//////////////////////////////////////////////////

    function setWeather(latitude, longitude){
    const pResult = document.querySelector('#weatherApp p');  

    let user = new XMLHttpRequest();

    user.open('get', `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`, true);
    
    user.responseType= 'text';

    user.addEventListener('load', function(){
        if(user.status === 200)
        {
            var jsonInfo = JSON.parse(user.responseText);

            pResult.innerHTML = "Location: " + jsonInfo.name + "<br>";
            pResult.innerHTML += "Wind Speed: " + Math.floor(jsonInfo.wind.speed) + " mph <br>";
            pResult.innerHTML += "Latitude: " + jsonInfo.coord.lat + "<br>";
            pResult.innerHTML += "Longitude: " + jsonInfo.coord.lon + "<br>";
            pResult.innerHTML += "Temperature: " + Math.round(jsonInfo.main.temp - 273) + "&#176C";
        }
        else
        {
            pResult.innerHTML = "error: " + user.status
        }
    }, false);

    user.send();

}
//***********************************************************User Input Location******************************************************************//

//Global Variables
var user1 = new XMLHttpRequest();
var apikey = "570d11786802096d88c54acfde3523e3";

function okBtnClick(){
    var location = document.getElementById("location").value;
    loadJSON(location);
}
function loadJSON(cityName){
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid="+ apikey;

    user1.abort();

    user1.open("get", url, true);

    user1.send();

    user1.onreadystatechange = showData;
}

function showData()
{
    if(user1.readyState === 4)
    {
        if(user1.status === 200)
        {
            var jsonInfo1 = JSON.parse(user1.responseText);

            var pResult1 = document.getElementById("result");

            pResult1.innerHTML = "Location: " + jsonInfo1.name + "<br>";
            pResult1.innerHTML += "Wind Speed: " + Math.floor(jsonInfo1.wind.speed) + " mph <br>";
            pResult1.innerHTML += "Latitude: " + jsonInfo1.coord.lat + "<br>";
            pResult1.innerHTML += "Longitude: " + jsonInfo1.coord.lon + "<br>";
            pResult1.innerHTML += "Temperature: " + Math.floor(jsonInfo1.main.temp - 273) + "&#176C"; 
        }
        else{
            //Error
            var jsonInfo1 = JSON.parse(user1.responseText);

            var pResult1 = document.getElementById("result");

            pResult1.innerHTML = "Error: " + jsonInfo1.messgae;
        }
    }
}
/////////////////////////////////////////////////////////////////////////////Map////////////////////////////////////////////////////////////////
"use strict";
// global variables
var approvePermission;

function geoTest() {
    approvePermission = setTimeout(fail, 10000);
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(createMap, fail, {timeout: 10000});
   } else {
      fail();
   }
}
function createMap(position) {
   var Lat;
   var Lng;
   clearTimeout(approvePermission);
   if (position.coords) {
      Lat = position.coords.latitude;
      Lng = position.coords.longitude;
   } 
   var mapOptions = {
      center: new google.maps.LatLng(Lat, Lng),
      zoom: 10
   };
   var map = new google.maps.Map(document.getElementById("map"), mapOptions);
   new google.maps.Marker({
      position: new google.maps.LatLng(Lat, Lng),
      map,
      title: "You are here!",
    });
}
function fail() {
   document.getElementById("map").innerHTML = "Unable to access your current location.";
}
