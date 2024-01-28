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
// if there is a list of sity searched already saved on local storage then display those
if (arrayOfCitySearched.length !== 0) {
  for (var index=0 ; index<arrayOfCitySearched.length ; index++) {
    weatherCity(arrayOfCitySearched[index]);
  }
}
// create a function to bring data from API and display it
function weatherCity(city) {
    // create a variable for the query API that include the searched city
    var cityQueryURL = queryURL + city + "&units=metric&appid=" + key;
    fetch(cityQueryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            $('#currentTemperature').text(" Temp: " + data.main.temp + "°C");
            $('#currentWind').text(" Wind: " + data.wind.speed + "KPH");
            $('#currentHumidity').text(" Humidity: " + data.main.humidity + "%");
        });
        
    var forrecastCityURL = forrecastURL + city + "&units=metric&appid=" + key;
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
}


// display weather for default city - London
$('#currentCityDate').text("London ("+currentDay + ")")
weatherCity("London");
    




// click event to display weather for searched city
$("#search-button").on("click", function () {
    event.preventDefault()

    searchCity = $("#search-input").val();
    // exclude empty space as an accepted search word
    if (searchCity.trim() === "") {return};

    weatherCity(searchCity);

    $("#search-input").val('');
    // check if the city name is not already in the array ; if not, create button for it
    if ($.inArray(searchCity, arrayOfCitySearched) == -1) {
        var buttonForSearchedCity = $('<button>');
        buttonForSearchedCity.attr('id', 'buttonHistory')
        buttonForSearchedCity.text(searchCity);
        $('#history').prepend(buttonForSearchedCity);
        // update the list of city searched array - needed to populate again after page refresh
        arrayOfCitySearched.push(searchCity);
        console.log(arrayOfCitySearched);
    };


});


// click event targeting the city clicked from history ; using event delegation to
// target a new generated element
$("#history").on("click", "#buttonHistory" ,function () {
    event.preventDefault()

    searchCity = $(this).text();
    
    weatherCity(searchCity);

});