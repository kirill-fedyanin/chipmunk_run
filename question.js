$(function(){
  var answers = ["внутри", "со мной", "с собой", "в сердце"]
  $("form").submit(function(event){
    var answer = $("#answer").val().toLowerCase();
    var right = answers.indexOf(answer) != -1;
    console.log(right);
    event.preventDefault();
  });
})
