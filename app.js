$(document).ready(function () {
  //event listener for input
  $("#btnSubmit").on("click", function (e) {
    e.preventDefault();

    var userInput = $("#userInput").val();

    console.log(userInput);

    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid={4d1769f6552330211a2272f5cf6614ce}`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);
    });
  });
});
