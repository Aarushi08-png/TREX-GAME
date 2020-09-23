var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var PLAY, END, GameState;

var score;

var GameOver, Restart, GameOverimg, Restartimg;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  GameOverimg = loadImage("gameOver.png");
  Restartimg  = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  GameOver = createSprite(300, 90, 20,30);
  GameOver.addImage(GameOverimg);
  GameOver.visible = false;
  GameOver.scale = 0.5;
  
  
  Restart = createSprite(300, 130, 10, 20);
  Restart.addImage(Restartimg);
  Restart.visible = false;
  Restart.scale = 0.5;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  PLAY = 1;
  END = 0;
  GameState = PLAY;
  
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  
  if(GameState === PLAY){
  
  score = score + Math.round(getFrameRate()/60);
    
  if(keyDown("space") && trex.collide(invisibleGround)) {
    trex.velocityY = -12;
  }
  
    ground.velocityX = -(6+3*score/100);
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles(); 
  
    if(obstaclesGroup.isTouching(trex)){
       GameState = END;
  }
  }
  
  else if(GameState === END){
  trex.velocityY = 0;
  ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
    
  GameOver.visible = true;
  Restart.visible = true;
    
  
  trex.changeAnimation("trex_collided", trex_collided);
    
    
  }
  
  if(mousePressedOver(Restart)){
  Reset();
  
  
  }
  
  
  
 trex.collide(invisibleGround);
  drawSprites();
}

  function Reset(){
  GameState = PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running)
  score = 0;
  GameOver.visible = false;
  Restart.visible = false;  
  }
  
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;

    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
  }