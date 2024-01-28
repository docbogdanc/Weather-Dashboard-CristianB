var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var forrecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
var key = "7093b5895d7dff871294e9d20a842e17";


var currentDay = dayjs().format("D/M/YYYY");
var day1After = dayjs().add(1, 'day').format("D/M/YYYY");
var day2After = dayjs().add(2, 'day').format("D/M/YYYY");
var day3After = dayjs().add(3, 'day').format("D/M/YYYY");
var day4After = dayjs().add(4, 'day').format("D/M/YYYY");
var day5After = dayjs().add(5, 'day').format("D/M/YYYY");

$('#day1Title').text(day1After)
$('#day2Title').text(day2After)
$('#day3Title').text(day3After)
$('#day4Title').text(day4After)
$('#day5Title').text(day5After)

var arrayOfCitySearched = [];

// display weather for default city - London
$('#currentCityDate').text("London ("+currentDay + ")")
var cityQueryURL = queryURL + "London" + "&units=metric&appid=" + key;
fetch(cityQueryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            $('#currentTemperature').text(" Temp: " + data.main.temp + "°C");
            $('#currentWind').text(" Wind: " + data.wind.speed + "KPH");
            $('#currentHumidity').text(" Humidity: " + data.main.humidity + "%");
        });
        
var forrecastCityURL = forrecastURL + "London" + "&units=metric&appid=" + key;
fetch(forrecastCityURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            for (var i=1 ; i<=5 ; i++) {
            $("#day"+i+"card").children().eq(2).text(" Temp: " + data.list[i].main.temp + "°C");
            $("#day"+i+"card").children().eq(3).text(" Wind: " + data.list[i].wind.speed + "KPH");
            $("#day"+i+"card").children().eq(4).text(" Humidity: " + data.list[i].main.humidity + "%");
            }
        });



// click event to display weather for searched city
$("#search-button").on("click", function () {
    event.preventDefault()

    searchCity = $("#search-input").val();
    var cityQueryURL = queryURL + searchCity + "&units=metric&appid=" + key;
    $('#currentCityDate').text(searchCity +  " ("+currentDay + ")")

    fetch(cityQueryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            $('#currentTemperature').text(" Temp: " + data.main.temp + "°C");
            $('#currentWind').text(" Wind: " + data.wind.speed + "KPH");
            $('#currentHumidity').text(" Humidity: " + data.main.humidity + "%");
        });
        
    var forrecastCityURL = forrecastURL + searchCity + "&units=metric&appid=" + key;
    fetch(forrecastCityURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                for (var i=1 ; i<=5 ; i++) {
                $("#day"+i+"card").children().eq(2).text(" Temp: " + data.list[i].main.temp + "°C");
                $("#day"+i+"card").children().eq(3).text(" Wind: " + data.list[i].wind.speed + "KPH");           
                $("#day"+i+"card").children().eq(4).text(" Humidity: " + data.list[i].main.humidity + "%");
                }
        });
    $("#search-input").val('');
    var buttonForSearchedCity = $('<button>');
    buttonForSearchedCity.attr('id', 'buttonHistory')
    buttonForSearchedCity.text(searchCity);
    $('#history').prepend(buttonForSearchedCity);
    // update the list of city searched array - needed to populate again after page refresh
    arrayOfCitySearched.push(searchCity);
    console.log(arrayOfCitySearched);
});


// click event targeting the city clicked from history ; using event delegation to
// target a new generated element
$("#history").on("click", "#buttonHistory" ,function () {
    event.preventDefault()

    searchCity = $(this).text();

    var cityQueryURL = queryURL + searchCity + "&units=metric&appid=" + key;
    $('#currentCityDate').text(searchCity +  " ("+currentDay + ")")

    fetch(cityQueryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            $('#currentTemperature').text(" Temp: " + data.main.temp + "°C");
            $('#currentWind').text(" Wind: " + data.wind.speed + "KPH");
            $('#currentHumidity').text(" Humidity: " + data.main.humidity + "%");
        });
        
    var forrecastCityURL = forrecastURL + searchCity + "&units=metric&appid=" + key;
    fetch(forrecastCityURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                for (var i=1 ; i<=5 ; i++) {
                $("#day"+i+"card").children().eq(2).text(" Temp: " + data.list[i].main.temp + "°C");
                $("#day"+i+"card").children().eq(3).text(" Wind: " + data.list[i].wind.speed + "KPH");           
                $("#day"+i+"card").children().eq(4).text(" Humidity: " + data.list[i].main.humidity + "%");
                }
        });
    $("#search-input").val('');
    var buttonForSearchedCity = $('<button>');
    buttonForSearchedCity.attr('id', 'buttonHistory')
    buttonForSearchedCity.text(searchCity);
    $('#history').prepend(buttonForSearchedCity);
});