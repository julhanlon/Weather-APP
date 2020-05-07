$(document).ready(function () {
  //event listener for input
  $("#btnSubmit").on("click", function (e) {
    e.preventDefault();

    var userInput = $("#userInput").val();

    console.log(userInput);

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=4d1769f6552330211a2272f5cf6614ce`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);
      $("#city").text(res.city.name);
      var today = res.list[0].dt_txt;
      console.log(today);
      $("#list-group").append(`<li class= "btn cities">${res.city.name}</li>`);
      var kTemp = res.list[0].main.temp;
      var fTemp = Math.round((kTemp - 273.15) * (9 / 5) + 32);
      $("#temp").text(`Temperature ${fTemp} F`);
      $("#humidity").text("Humidity" + " " + res.list[0].main.humidity);
      $("#windSpeed").text("Wind Speed" + " " + res.list[0].wind.speed + "mph");

      // $("#uvIndex").text(res.Rated);

      // for 5 day forecast
      // var tomorrow = res.
      var kTemp2 = res.list[8].main.temp;
      var fTemp2 = Math.round((kTemp2 - 273.15) * (9 / 5) + 32);
      $("#tomorrow").text(`Temperature ${fTemp2} F`);

      var kTemp3 = res.list[16].main.temp;
      var fTemp3 = Math.round((kTemp3 - 273.15) * (9 / 5) + 32);
      $("#dayAfter").text(`Temperature ${fTemp3} F`);

      var kTemp4 = res.list[24].main.temp;
      var fTemp4 = Math.round((kTemp4 - 273.15) * (9 / 5) + 32);
      $("#day3").text(`Temperature ${fTemp4} F`);

      var kTemp5 = res.list[32].main.temp;
      var fTemp5 = Math.round((kTemp5 - 273.15) * (9 / 5) + 32);
      $("#day4").text(`Temperature ${fTemp5} F`);

      var kTemp6 = res.list[40].main.temp;
      var fTemp6 = Math.round((kTemp6 - 273.15) * (9 / 5) + 32);
      $("#dayAfter").text(`Temperature ${fTemp6} F`);
    });
  });
  $(document).on("click", ".btn", function () {
    var text = $(this).text();
    console.log(this);
  });
});
