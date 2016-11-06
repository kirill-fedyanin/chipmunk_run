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
    this.imgs     = {
      "bg"        : "imgs/bg.png",
      "sky"       : "imgs/sky.png",
      "backdrop"  : "imgs/backdrop.png",
      "backdrop2" : "imgs/backdrop_ground.png",
      "grass"     : "imgs/grass.png",
      "avatar"    : "imgs/normal_walk.png"
    }

    var assetsLoaded = 0;
    var numImgs = Object.keys(this.imgs).length;
    this.totalAssets = numImgs;

    function assetLoaded(dic, name){
      if (this[dic][name].status !== "loading"){
        return;
      }
      this[dic][name].status = "loaded";
      assetsLoaded++;

      if (assetsLoaded === this.totalAssets && typeof this.finished === "function"){
        this.finished();
      }

    }

    this.downloadAll = function(){
      var _this = this;
      var src;

      for (var img in this.imgs){
        if (this.imgs.hasOwnProperty(img)) {
          src = this.imgs[img];

          (function(_this, img){
            _this.imgs[img] = new Image();
            _this.imgs[img].status = "loading";
            _this.imgs[img].name = img;
            _this.imgs[img].onload = function() { assetLoaded.call(_this, "imgs", img) };
            _this.imgs[img].src = src;
          })(_this, img);
        }
      }
    }

    return {
      imgs: this.imgs,
      totalAssets: this.totalAssets,
      downloadAll: this.downloadAll
    }

  })();

  assetLoader.finished = function(){ startGame() };


})();
