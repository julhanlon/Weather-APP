$(document).ready(function () {
  //event listener for input

  var cities = JSON.parse(window.localStorage.getItem("cities")) || [
    "San Francisco",
  ];
  console.log(cities);

  for (let index = 0; index < cities.length; index++) {
    $("#list-group").prepend(
      `<li class="list-group cities btn">${cities[index]}</li>`
    );
  }
  // request for when refreshing the page
  getOpenWeatherData(cities[cities.length - 1]);

  $("#btnSubmit").on("click", function (e) {
    e.preventDefault();

    var userInput = $("#userInput").val();
    $("#list-group").append(`<li class= "btn cities">${res.city.name}</li>`);

    cities.push(userInput);
    window.localStorage.setItem("cities", JSON.stringify(cities));
    getOpenWeatherData(userInput);
  });
  // Eventlistener for cities that already appear in the list
  $(document).on("click", ".btn", function () {
    var text = $(this).text();
    getOpenWeatherData(text);
  });

  function getOpenWeatherData(searchItem) {
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchItem}&appid=4d1769f6552330211a2272f5cf6614ce&units=imperial`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);
      var today = moment().format("l");
      console.log(today);
      $("#city").text(res.city.name + " " + today);

      var mainIcon = res.list[6].weather[0].icon;
      $("#mainIcon").html(
        ` <img src="http://openweathermap.org/img/wn/${mainIcon}@2x.png"/>`
      );

      var fTemp = res.list[0].main.temp.toFixed();
      $("#temp").text(`Temperature: ${fTemp} °F`);
      $("#humidity").text("Humidity: " + res.list[0].main.humidity + "%");
      $("#windSpeed").text("Wind Speed: " + res.list[0].wind.speed + "mph");

      // getting the latitude and longitude to get the UV Index
      var lat = res.city.coord.lat;
      var lon = res.city.coord.lon;
      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=4d1769f6552330211a2272f5cf6614ce`,
        dataType: "json",
      }).then(function (res) {
        console.log(res);
        var uv = res.value;
        $("#UVIndex").text("UV Index: " + uv);

        // conditional statements for UV Index
        if (uv < 2) {
          $("#UVIndex").attr("class", "green");
        }
        if (uv < 6) {
          $("#UVIndex").attr("class", " yellow");
        }
        if (uv < 8) {
          $("#UVIndex").attr("class", "orange");
        } else {
          $("#UVIndex").attr("class", "red");
        }
      });

      // for 5 day forecast

      var tomorrow = moment().add(1, "days").format("l");
      $("#tomorrowDate").text(tomorrow);
      var fTemp2 = res.list[6].main.temp.toFixed();
      var hum2 = res.list[6].main.humidity;
      var icon1 = res.list[6].weather[0].icon;
      $("#icon1").html(
        ` <img src="http://openweathermap.org/img/wn/${icon1}@2x.png"/>`
      );
      $("#tomorrow").text(`Temperature: ${fTemp2} °F`);
      $("#tomorrow").append(" " + "Humidity: " + hum2 + "%");

      var dayAfter = moment().add(2, "days").format("l");
      $("#dayAfterDate").text(dayAfter);
      var fTemp3 = res.list[16].main.temp.toFixed();
      var hum3 = res.list[14].main.humidity;
      var icon2 = res.list[14].weather[0].icon;
      $("#icon2").html(
        ` <img src="http://openweathermap.org/img/wn/${icon2}@2x.png"/>`
      );
      $("#dayAfter").text(`Temperature: ${fTemp3} °F`);
      $("#dayAfter").append(" " + "Humidity: " + hum3 + "%");

      var day3 = moment().add(3, "days").format("l");
      $("#day3Date").text(day3);
      var fTemp4 = res.list[22].main.temp.toFixed();
      var hum4 = res.list[22].main.humidity;
      var icon3 = res.list[22].weather[0].icon;
      $("#icon3").html(
        ` <img src="http://openweathermap.org/img/wn/${icon3}@2x.png"/>`
      );
      $("#day3").text(`Temperature: ${fTemp4} °F`);
      $("#day3").append(" " + "Humidity: " + hum4 + "%");

      var day4 = moment().add(4, "days").format("l");
      $("#day4Date").text(day4);
      var fTemp5 = res.list[30].main.temp.toFixed();
      var hum5 = res.list[30].main.humidity;
      var icon4 = res.list[30].weather[0].icon;
      $("#icon4").html(
        ` <img src="http://openweathermap.org/img/wn/${icon4}@2x.png"/>`
      );
      $("#day4").text(`Temperature: ${fTemp5} °F`);
      $("#day4").append(" " + "Humidity: " + hum5 + "%");

      var day5 = moment().add(5, "days").format("l");
      $("#day5Date").text(day5);
      var fTemp6 = res.list[37].main.temp.toFixed();
      var hum6 = res.list[37].main.humidity;
      var icon5 = res.list[37].weather[0].icon;
      $("#icon5").html(
        ` <img src="http://openweathermap.org/img/wn/${icon5}@2x.png"/>`
      );
      $("#day5").text(`Temperature: ${fTemp6} °F`);
      $("#day5").append(" " + "Humidity: " + hum6 + "%");
    });
  }
});
