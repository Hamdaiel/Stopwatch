$(document).ready(function() {
  var execution = 0,
    intervalSetup = null,
    startTime = null,
    pauseTime = null,
    pauseDuration = 0;

  $("body").keyup(function(e) {
    if (e.keyCode == 32) {
      start();
    }
  });

  $("#start-pause").on("click", start);
  $("#reset").on("click", reset);

  function start() {
    if (execution) {
     
      clearInterval(intervalSetup);
      pauseTime = new Date();
      execution = 0;
      $("#start-pause").text("START");
      $("#start-pause").css("color", "yellowgreen");
    } else {
     
      if (pauseTime === null) {
        // If pauseTime is null, we can be sure that user clicked for the first time.
        startTime = new Date();
        intervalSetup = setInterval(count, 10);
        execution = 1;
        $("#start-pause").text("PAUSE");
        $("#start-pause").css("color", "darkorange");
      } else {
        // Since pauseTime is not null, we can be sure that user wants to resume.
        pauseDuration += new Date() - pauseTime;
        intervalSetup = setInterval(count, 10);
        execution = 1;
        $("#start-pause").text("PAUSE");
        $("#start-pause").css("color", "darkorange");
      }
    }
  }

  function reset() {
    clearInterval(intervalSetup);
    pauseDuration = 0;
    startTime = null;
    pauseTime = null;
    execution = 0;
    $("#stopwatch").text("00:00:00");
    $("#start-pause").text("START");
    $("#start-pause").css("color", "yellowgreen");
  }

  function count() {
    var elapsedTime = new Date(new Date() - startTime - pauseDuration);
    var hr = elapsedTime.getUTCHours(),
      min = elapsedTime.getUTCMinutes(),
      sec = elapsedTime.getUTCSeconds(),
      ms = elapsedTime.getUTCMilliseconds();

    $("#stopwatch").text(
      handleZeros(hr, 2) + ":" + handleZeros(min, 2) + ":" + handleZeros(sec, 2)
    );
    console.log(handleZeros(ms, 3));
  }

  function handleZeros(value, digit) {
   
    var dummyZeros = "";
    for (i = 0; i < digit; i++) {
      dummyZeros += "0";
      return (dummyZeros + value).slice(-digit);
    }
  }
});
