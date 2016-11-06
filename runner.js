(function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var player = {};
  var ground = [];
  var platformWidth = 32;
  var platformHeight = canvas.height - platformWidth*4;


	var requestAnimFrame = (function(){
		return window.requestAnimationFrame       ||
					 window.webkitRequestAnimationFrame ||
					 window.mozRequestAnimationFrame    ||
					 window.oRequestAnimationFrame      ||
					 window.msRequestAnimationFrame     ||
					 function(callback, element){
						 window.setTimeout(callback, 1000 / 60);
					 };
	})();

  var assetLoader = (function(){
  })();
})();
