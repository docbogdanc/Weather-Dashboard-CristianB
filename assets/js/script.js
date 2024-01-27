var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var key = "7093b5895d7dff871294e9d20a842e17";



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