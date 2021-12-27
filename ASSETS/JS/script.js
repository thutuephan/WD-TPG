// created an API key
var weatherAPIKey = "4a9646ee83d600552d65c84deed82d99";
var cityInput = document.querySelector('#City-input');
var searchButton = document.querySelector('#search-Btn');
var currentForecast = document.querySelector('.current-forecast');
var fiveDay = document.querySelector('.FiveDay');


// write a function to getWeather(). I will pass in a city as an argument to getWeather(city).
function getWeather(city) {
    //Inside getWeather make a fetch request that returns the data from the openweathermap API.
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=imperial`, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow'
})

    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
}

searchButton.addEventListener('click', function() {
    getWeather(cityInput.value);
})

// Write a currentWeather(data) function that returns html values based on the data that is returned in your getWeather() fetch request.

