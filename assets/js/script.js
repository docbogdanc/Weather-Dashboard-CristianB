var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var key = "7093b5895d7dff871294e9d20a842e17";
var currentDay = dayjs().format("D/M/YYYY");
console.log(currentDay);

$('#currentCityDate').text("London ("+currentDay + ")")
var cityQueryURL = queryURL + "London" + "&units=metric&appid=" + key;
fetch(cityQueryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            $('#currentTemperature').text(" Temp: " + data.main.temp + "°C");
            $('#currentWind').text(" Wind: " + data.wind.speed + "KPH");
            $('#currentHumidity').text(" Humidity: " + data.main.humidity + "%");
        });
        

$("#search-button").on("click", function () {
    event.preventDefault()
    console.log(this);
    // $("#search-input").empty();

    searchString = $("#search-input").val();
    console.log(searchString);
    var cityQueryURL = queryURL + searchString + "&units=metric&appid=" + key;
    

    fetch(cityQueryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        });
});