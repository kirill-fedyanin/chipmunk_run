$(function(){
  var answers = ["внутри", "со мной", "с собой", "в сердце"]
  $("button").click(function(){
    var answer = $("#answer").val().toLowerCase();
    var right = answers.indexOf(answer) != -1;
    console.log(right);
  });
})
