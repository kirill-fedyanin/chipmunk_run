$(function(){
  var answers = ["внутри", "со мной", "с собой"];
  $("form").submit(function(event){
    event.preventDefault();
    var answer = $("#answer").val().toLowerCase();
    var right = answers.indexOf(answer) != -1;
    if (right){
      $("#right-response").show();
    } else {
      $("#wrong-response").show();
    }
  });
})
