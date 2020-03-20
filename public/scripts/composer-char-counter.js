$(document).ready(function() {
  // --- our code goes here ---
  //$("output.counter").html("200");
  let bar = $("textarea");

  bar.on("keyup", function(event) {
    let length = bar.val().length;
    let result = 140 - length;
    $("output.counter").html(result);

    if (result < 0) {
      $("output.counter").addClass("red");
    } else {
      $("output.counter").removeClass("red");
    }
  });
});
