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

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Get the link from One Call API
            var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={part}&appid=${weatherAPIKey}&units=imperial`

            fetch(oneCall)
            .then(function(response) {
            return response.json();
            })
            .then(function(oneCallData) {
            console.log(oneCallData);


                // Copied link from stackoverflow to get the weather icon
                var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            
                // Dynamic html and data
                currentForecast.innerHTML = `
                    <div class="cityName"><h3 id="city">${data.name} </h3>
                        <div id="current-date">(${moment(data.dt, 'X').format('MM/DD/YYYY')})
                        <img id="weather-icon" src='${iconurl}'>    
                        </div>                    
                    </div>
                    <p class="current-city">Temp: <span id="temp-info">${data.main.temp} ${"&#176F"}</span></hp></p>
                    <p class="current-city">Wind Speed: <span id="wind-info">${data.wind.speed} MPH</span></p>
                    <p class="current-city">Humidity: <span id="humidity-info">${data.main.humidity} %</span></p>
                    <p class="current-city">UV Index: <span id="uv-index">${oneCallData.current.uvi}</span></p>

                    `
                // Future conditions for the selected city, 5-day forecast; created a for loop to loop through 5 days forecast, select from index 1 -5 under daily section from one call api
                fiveDay.innerHTML = ''
                for (let i = 1; i < 6; i++) {
                var iconurl = "http://openweathermap.org/img/w/" + oneCallData.daily[i].weather[0].icon + ".png";

                fiveDay.innerHTML = fiveDay.innerHTML + `<div class="day" id="box1">
                <p>${moment(oneCallData.daily[i].dt, 'X').format('MM/DD/YYYY')}</p>
                <img class="weather-img" src='${iconurl}'>
                <p class="5day">Temp: <span class="5Day-temp">${oneCallData.daily[i].temp.day} ${"&#176F"} </span></p>
                <p class="5day">Wind Speed: <span class="5Day-wind">${oneCallData.daily[i].wind_speed} MPH</span></p>
                <p class="5day">Humidity: <span class="5Day-humid">${oneCallData.daily[i].humidity} %</span></p>

            
                </div>`
                }
                
                // Set UV Index data function and its color coded
                let uvIndexColor = document.querySelector('#uv-index');
                if (oneCallData.current.uvi <= 2) {
                    uvIndexColor.setAttribute('class', 'badge badge-success');
                } else if (oneCallData.current.uvi > 2 && oneCallData.current.uvi < 8) {
                    uvIndexColor.setAttribute('class', 'badge badge-warning');
                
                } else {
                    uvIndexColor.setAttribute('class', 'badge badge-danger')
                }
        });
    });   
}

searchButton.addEventListener('click', function () {
    getWeather(cityInput.value);
    
})

// Write a currentWeather(data) function that returns html values based on the data that is returned in your getWeather() fetch request.

