// creating varaible for weather API address and API key
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var forrecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
var key = "7093b5895d7dff871294e9d20a842e17";

// creating variables for current and 5days ahead dates
var currentDay = dayjs().format("D/M/YYYY");
var day1After = dayjs().add(1, "day").format("D/M/YYYY");
var day2After = dayjs().add(2, "day").format("D/M/YYYY");
var day3After = dayjs().add(3, "day").format("D/M/YYYY");
var day4After = dayjs().add(4, "day").format("D/M/YYYY");
var day5After = dayjs().add(5, "day").format("D/M/YYYY");

// adding the dates to coresponding elements from html
$("#day1Title").text(day1After);
$("#day2Title").text(day2After);
$("#day3Title").text(day3After);
$("#day4Title").text(day4After);
$("#day5Title").text(day5After);

// get cities from local storage if there is data in local storage
var citiesStringLocal = localStorage.getItem("cities");
// transform the string from local storage in an array
var arrayOfCitySearched = JSON.parse(citiesStringLocal);
// if the data from local storage is not empty then re-create buttons for the cities
if (arrayOfCitySearched && arrayOfCitySearched.length > 0) {
  for (var index = 0; index < arrayOfCitySearched.length; index++) {
    var buttonForSearchedCity = $("<button>");
    buttonForSearchedCity.attr("id", "buttonHistory");
    buttonForSearchedCity.text(arrayOfCitySearched[index]);
    $("#history").prepend(buttonForSearchedCity);
  }
}

// display weather for default city - London
var cityQueryURL = queryURL + "London" + "&units=metric&appid=" + key;
fetch(cityQueryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var iconURLondon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    var iconElement = $("<img>").attr("src", iconURLondon);
    $("#span1").text("London (" + currentDay + ")");
    $("#span2").empty();
    $("#span2").append(iconElement);
    weatherCity("London");
  });

// click event to display the weather for searched city and create button for it
$("#search-button").on("click", function () {
  event.preventDefault();
  // allocate the user input city to a variable
  searchCity = $("#search-input").val();

  // display the search city name and the current date
  $("#span1").text(searchCity + " (" + currentDay + ")");
  // exclude empty space as an accepted search word
  if (searchCity.trim() === "") {
    return;
  }
  // call the function to use API to fetch weather data and display it
  weatherCity(searchCity);

  $("#search-input").val("");
  // bring back the data from local storage to assure that it the list is updated
  var citiesStringLocal = localStorage.getItem("cities");
  // transform the string from local storage in an array
  var arrayOfCitySearched = JSON.parse(citiesStringLocal);
  // check if the city name is not already in the array ; if not, create button for it
  if ($.inArray(searchCity, arrayOfCitySearched) == -1) {
    var buttonForSearchedCity = $("<button>");
    buttonForSearchedCity.attr("id", "buttonHistory");
    buttonForSearchedCity.text(searchCity);
    $("#history").prepend(buttonForSearchedCity);

    // update the list of city searched array as is needed to populate again after page refresh
    // if the array doesn't exist, create one
    if (!arrayOfCitySearched || arrayOfCitySearched.length === 0) {
      arrayOfCitySearched = [];
    }
    arrayOfCitySearched.push(searchCity);

    var stringOfCitySearched = JSON.stringify(arrayOfCitySearched);

    localStorage.setItem("cities", stringOfCitySearched);
  }
});

// click event targeting the city clicked from history ; using event delegation to
// target a new generated element and display it's data API
$("#history").on("click", "#buttonHistory", function () {
  event.preventDefault();
  searchCity = $(this).text();
  $("#span1").text(searchCity + " (" + currentDay + ")");
  weatherCity(searchCity);
});

// reset history of searches
$("#resetHistory").on("click", function () {
  event.preventDefault();

  $("#history").empty();
  localStorage.removeItem("cities");
});

// create a function to bring weather data from API and display it
function weatherCity(city) {
  // create a variable for the query API that include the searched city
  var cityQueryURL = queryURL + city + "&units=metric&appid=" + key;
  fetch(cityQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);

      var iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      var iconElement = $("<img>").attr("src", iconURL);
      $("#span2").empty();
      $("#span2").append(iconElement);

      $("#currentTemperature").text(" Temp: " + data.main.temp + "°C");
      $("#currentWind").text(" Wind: " + data.wind.speed + "KPH");
      $("#currentHumidity").text(" Humidity: " + data.main.humidity + "%");
    });

  var forrecastCityURL = forrecastURL + city + "&units=metric&appid=" + key;
  fetch(forrecastCityURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 1; i <= 5; i++) {
        // console.log(data);
        console.log(i);
        var iconURL = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
        $("#day" + i + "card")
          .children()
          .eq(1)
          .attr("src", iconURL);
        $("#day" + i + "card")
          .children()
          .eq(2)
          .text(" Temp: " + data.list[i].main.temp + "°C");
        $("#day" + i + "card")
          .children()
          .eq(3)
          .text(" Wind: " + data.list[i].wind.speed + "KPH");
        $("#day" + i + "card")
          .children()
          .eq(4)
          .text(" Humidity: " + data.list[i].main.humidity + "%");
      }
    });
}
