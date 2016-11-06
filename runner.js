/**
 *  Chipmunk runner
 *  Based on straker great js runner tutorial
 *  http://blog.sklambert.com/html5-game-tutorial-module-pattern/
 */
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


  /**
   * Assets preloader - load all images
   */
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



  /**
   * Creates a spritesheet
   * @param (string) - path to image
   * @param (number) - width in px of each frame
   * @param (number) - height in px of each frame
   */

  function SpriteSheet(path, frameWidth, frameHeight){
    this.image = new Image();
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    var self = this;

    this.image.onload = function(){
      self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
    }
    this.image.src = path;
  }

  /**
   * Creates an animation from sprite
   */
  function Animation(spritesheet, frameSpeed, startFrame, endFrame){
    var animationSequence = [];
    var currentFrame = 0;
    var counter = 0;

    for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++){
      animationSequence.push(frameNumber);
    }

    this.update = function(){
      if (counter = frameSpeed - 1){
        currentFrame = (currentFrame + 1) % animationSequence.length;
      }
      counter = (counter + 1) % frameSpeed;
    };

    this.draw = function(x, y){
      var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
      var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

      ctx.drawImage(
        spritesheet.image,
        col * spritesheet.frameWidth, row * spritesheet.frameHeight,
        spritesheet.frameWidth, spritesheet.frameHeight,
        x, y,
        spritesheet.frameWidth, spritesheet.frameHeight
      );
    }
  }

  var background = (function(){
    var sky = {};
    var backdrop = {};
    var backdrop2 = {};

    this.draw = function(){
      ctx.drawImage(assetLoader.imgs.bg, 0, 0);

      sky.x -= sky.speed;
      backdrop.x -= backdrop.speed;
      backdrop2.x -= backdrop2.speed;
      ctx.drawImage(assetLoader.imgs.sky, sky.x, sky.y);
      ctx.drawImage(assetLoader.imgs.sky, sky.x + canvas.width, sky.y); ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x, backdrop.y);
      ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x + canvas.width, backdrop.y);
      ctx.drawImage(assetLoader.imgs.backdrop2, backdrop2.x, backdrop2.y);
      ctx.drawImage(assetLoader.imgs.backdrop2, backdrop2.x + canvas.width, backdrop2.y);

      if (sky.x + assetLoader.imgs.sky.width <= 0)
          sky.x = 0;
      if (backdrop.x + assetLoader.imgs.backdrop.width <= 0)
          backdrop.x = 0;
      if (backdrop2.x + assetLoader.imgs.backdrop2.width <= 0)
          backdrop2.x = 0;
    };

    this.reset = function() {
      sky.x = 0;
      sky.y = 0;
      sky.speed = 0.2;
      backdrop.x = 0;
      backdrop.y = 0;
      backdrop.speed = 0.4;
      backdrop2.x = 0;
      backdrop2.y = 0;
      backdrop2.speed = 0.6;
    }
    return {
      draw: this.draw,
      reset: this.reset
    };

  })();

  function startGame(){
    player.width = 60;
    player.height = 96;
    player.speed = 6;
    player.sheet = new SpriteSheet("imgs/normal_walk.png", player.width, player.height);
    player.anim = new Animation(player.sheet, 4, 0, 15);

    for (i = 0, length = Math.floor(canvas.width / platformWidth) + 1; i < length; i++) {
          ground[i] = {"x": i * platformWidth, "y": platformHeight};
        }
    background.reset();
    animate();
  }

  function animate(){
    requestAnimFrame( animate );

    background.draw();
    for (i = 0; i < ground.length; i++) {
      ground[i].x -= player.speed;
      ctx.drawImage(assetLoader.imgs.grass, ground[i].x, ground[i].y);
    }
    if (ground[0].x <= -platformWidth) {
      ground.shift();
      ground.push({"x": ground[ground.length-1].x + platformWidth, "y": platformHeight});
    }
    player.anim.update();
    player.anim.draw(64, 260);
  }

  assetLoader.downloadAll();

})();
