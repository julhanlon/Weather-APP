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
      $("#list-group").append(`<li class= "btn">${res.city.name}</li>`);
      var kTemp = res.list[0].main.temp;
      var fTemp = Math.round((kTemp - 273.15) * (9 / 5) + 32);
      $("#temp").text(`"Temperature ${fTemp} F"`);
      $("#humidity").text(res.list[0].main.humidity);
      $("#windSpeed").text(res.list[0].wind.speed);

      // $("#uvIndex").text(res.Rated);
    });
  });
  $(document).on("click", ".btn", function () {
    var text = $(this).text();
    console.log(this);
  });
});
