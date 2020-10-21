//global variable
var trex;
var trexAnimation;
var gravity;
var ground;
var groundImage;
var invisibleGround;
var cloudImage;
var cactusImage1;
var cactusImage2;
var cactusImage3;
var cactusImage4;
var cactusImage5;
var cactusImage6;
var cloudGroup;
var cactusGroup;
var play = 1;
var end = 0;
var gameState = play;
var trexCollided;
var resetImage;
var gameOverImage;
var score;
var jump;
var die;
var ss;

function preload(){
  trexAnimation = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trexCollided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloudImage = loadImage("cloud.png");
  
  cactusImage1 = loadImage("obstacle1.png");
  cactusImage2 = loadImage("obstacle2.png");
  cactusImage3 = loadImage("obstacle3.png");
  cactusImage4 = loadImage("obstacle4.png");
  cactusImage5 = loadImage("obstacle5.png");
  cactusImage6 = loadImage("obstacle6.png");
  
  resetImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  ss = loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200);
  trex = createSprite(75,170);
  trex.addAnimation("trex", trexAnimation);
  trex.addAnimation("trexstop", trexCollided);
  trex.debug = true;
  trex.scale = 0.5;
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  gravity = 2;
  
  ground = createSprite(300,180,600,20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2
  //console.log(ground.width);
  
  invisibleGround = createSprite(300,190,600,20);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  cactusGroup = new Group();
  
  gameOver = createSprite(300,100);
  gameOver.addImage("gameover", gameOverImage);
  gameOver.scale = 0.7;
  gameOver.visible = false;
    
  resetButton = createSprite(300,150);
  resetButton.addImage("resetbutton", resetImage);
  resetButton.scale = 0.6;
  resetButton.visible = false;
  
  score = 0;
}

function draw(){
  background(180);
  text(mouseX+","+mouseY,mouseX,mouseY);
  
  if(gameState == play) {
    if(ground.x<0) {
      ground.x = ground.width/2;
    }
    
    if(keyDown("space") && trex.collide(ground)) {
      trex.velocityY = -19;
      jump.play();
    }
    
    trex.velocityY = trex.velocityY + gravity;
    
    ground.velocityX = -3;
    
    cactusGroup.setScaleEach(0.5);
    
    spawnClouds();
    spawnCactus();
    
    score = Math.round(score+1/2);
    var remaindar = score % 100;
    if(remaindar == 0 && score > 0) {
      ss.play();
      ground.velocityX = ground.velocityX - 1;
    }
    
    if(trex.isTouching(cactusGroup)) {
      //gameState = end;
      //die.play();
      trex.velocityY = -10;
    }
  }
  
  else if(gameState == end) {
    ground.velocityX = 0;
    cactusGroup.setVelocityXEach(0);
    cactusGroup.setLifetimeEach(-1);
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("trexstop", trexCollided);
    
    resetButton.visible = true;
    gameOver.visible = true;
    
    trex.velocityY = 0;
  }
  
  if (mousePressedOver(resetButton)) {
    reset();
  }
  
  //console.log(trex.y);
  
  trex.collide(invisibleGround);
  
  textSize(20);
  text("score:" + score,475,20);
  
  drawSprites();
  
}

function reset() {
  resetButton.visible = false;
  gameOver.visible = false;
  trex.changeAnimation("trex", trexAnimation);
  gameState = play;
  cloudGroup.destroyEach();
  cactusGroup.destroyEach();
  score = 0;
  
}

function spawnClouds(){
  var remainder = frameCount % 50;
  if(remainder == 0){
    clouds = createSprite(600,200);
    clouds.addImage("clouds", cloudImage);
    clouds.y = random(25,150);
    clouds.velocityX = -2;
    clouds.lifetime = 300;
    console.log(clouds.depth);
    trex.depth = clouds.depth + 1;
    cloudGroup.add(clouds);
  }
}

function spawnCactus(){
  var remainder = frameCount % 60;
  if(remainder == 0){
    var cactus = createSprite(600,160);
    var r = Math.round(random(1,6));
    if(score % 100 == 0) {
      cactus.velocityX = cactus.velocityX - 1;
    }
    switch(r){
      case 1: cactus.addImage("cactus1",cactusImage1);
        break;
      case 2: cactus.addImage("cactus2",cactusImage2);
        break;
      case 3: cactus.addImage("cactus3",cactusImage3);
        cactus.scale = 0.2;
        break;
      case 4: cactus.addImage("cactus4",cactusImage4);
        break;
      case 5: cactus.addImage("cactus5",cactusImage5);
        cactus.scale = 0.5;
        break;
      case 6: cactus.addImage("cactus6",cactusImage6);
        cactus.scale = 0.5;
        break;
      default: break;
    }
    
    cactus.velocityX = -4;
    cactus.lifetime = 152;
    cactus.scale = 0.57;
    cactusGroup.add(cactus);
  }
      
} 