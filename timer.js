$(function(){
  function setNewTime(){
    var date = new Date(2016, 10, 19, 21);
    var now = new Date();
    var diff = Math.ceil((date - now)/1000);
    var hours = Math.floor(diff/3600);
    if (hours > 0){
      diff = diff - hours * 3600;
      var minutes = Math.floor(diff/60);
      seconds = diff - minutes * 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      $("#timeLeft").html(hours + ":" + minutes + ":" + seconds);
    } else {
      if (typeof interval !== "undefined"){
        clearInterval(interval);
      }
      $(".timer-wrapper").html("Looks like we're out of time ¯\\_(ツ)_/¯<br/>But has it changed something?")
    }
  }

  setNewTime();
  var interval = setInterval(setNewTime, 1000);
});
