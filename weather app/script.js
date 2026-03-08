const apiKey = "9e846493a2a545fd56098d7d1f5f13b7";

async function getWeather(){

let city = document.getElementById("city").value;

if(city === ""){
alert("Please enter a city name");
return;
}

document.getElementById("loading").style.display = "block";

let url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

let response = await fetch(url);
let data = await response.json();

document.getElementById("loading").style.display = "none";

if(data.cod === "404"){
document.getElementById("weatherResult").innerHTML = "City not found!";
return;
}

displayWeather(data);
}

function displayWeather(data){

let icon = data.weather[0].icon;

let result = `
<h2>${data.name}</h2>
<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
<p>Temperature: ${data.main.temp} °C</p>
<p>Humidity: ${data.main.humidity}%</p>
<p>Weather: ${data.weather[0].description}</p>
`;

document.getElementById("weatherResult").innerHTML = result;

changeBackground(data.weather[0].main);
}

function changeBackground(weatherType){

if(weatherType === "Clear"){
document.body.style.background = "#FFD700";
}

else if(weatherType === "Clouds"){
document.body.style.background = "#B0C4DE";
}

else if(weatherType === "Rain"){
document.body.style.background = "#708090";
}

else{
document.body.style.background =
"linear-gradient(135deg,#4facfe,#00f2fe)";
}
}

 function getLocationWeather(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(async function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

let url =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

let response = await fetch(url);
let data = await response.json();

let icon = data.weather[0].icon;

let result = `
<h2>${data.name}</h2>
<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
<p>Temperature: ${data.main.temp} °C</p>
<p>Humidity: ${data.main.humidity}%</p>
<p>Weather: ${data.weather[0].description}</p>
`;

document.getElementById("weatherResult").innerHTML = result;

});

}else{
alert("Geolocation is not supported by this browser.");
}

}
