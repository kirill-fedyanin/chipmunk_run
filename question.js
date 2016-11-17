$(function(){
  var answers = ["внутри", "внутри меня", "со мной", "с собой"];
  var wrongs = [
    "Хм, интересно, но не то. Попробуй ещё разок.",
    "Не то, подумай ещё. Регистр слов значения не имеет, кстати.",
    "Ну же, ты знаешь ответ. Это был не он сейчас.",
    "Серьёзно? Нет, нужно другое",
  ]
  $("form").submit(function(event){
    event.preventDefault();
    var answer = $("#answer").val().toLowerCase();
    if (answers.indexOf(answer) >= 0){
      $("#wrong-response").hide();
      $("#right-response").show();
    } else {
      $("#right-response").hide();
      var response = wrongs[Math.floor(Math.random()*wrongs.length)];
      $("#wrong-response").html(response);
      $("#wrong-response").show();
    }
  });
})
