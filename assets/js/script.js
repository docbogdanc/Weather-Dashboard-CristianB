var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var forrecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
var key = "7093b5895d7dff871294e9d20a842e17";
var currentDay = dayjs().format("D/M/YYYY");
var day1After = dayjs().add(1, 'day').format("D/M/YYYY");
var day2After = dayjs().add(2, 'day').format("D/M/YYYY");
var day3After = dayjs().add(3, 'day').format("D/M/YYYY");
var day4After = dayjs().add(4, 'day').format("D/M/YYYY");
var day5After = dayjs().add(5, 'day').format("D/M/YYYY");
console.log(currentDay);

$('#currentCityDate').text("London ("+currentDay + ")")
$('#day1Title').text(day1After)
$('#day2Title').text(day2After)
$('#day3Title').text(day3After)
$('#day4Title').text(day4After)
$('#day5Title').text(day5After)


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
        
var forrecastCityURL = forrecastURL + "London" + "&units=metric&appid=" + key;
fetch(forrecastCityURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            for (var i=1 ; i<=5 ; i++) {
            $("#day"+i+"card").children().eq(2).text(" Temp: " + data.list[i].main.temp + "°C");
      
            $("#day"+i+"card").children().eq(3).text(" Temp: " + data.list[i].wind.speed + "KPH");
          
            $("#day"+i+"card").children().eq(4).text(" Temp: " + data.list[i].main.humidity + "%");
            
            // $('#currentTemperature').text(" Temp: " + data.main.temp + "°C");
            // $('#currentWind').text(" Wind: " + data.wind.speed + "KPH");
            // $('#currentHumidity').text(" Humidity: " + data.main.humidity + "%");
            }
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