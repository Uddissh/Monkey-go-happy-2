
var banana;
var obstacle;
var backPicture;
var monkey;
var ground;
var bananaGroup; 
var obstacleGroup;
var PLAY = 1;
var OVER = 0;
var gameState = PLAY;
var score = 0;
var death = 0;

function preload(){
 backgroundImg = loadImage("jungle.jpg");
  
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}
function setup() {
  createCanvas(400, 400);
  
  backPicture = createSprite(200,200, 20, 20);
  backPicture.addImage("BackGround", backgroundImg);
  backPicture.scale = 0.5;
  
  
  ground = createSprite(200, 385, 400, 20);
  ground.x = ground.width/2;
  ground.velocityX=-2
  ground.visible = false;

  monkey = createSprite(50, 380, 20, 20);
  monkey.addAnimation("Monkey", monkeyImg);
  monkey.scale=0.2;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
 
}

function draw() {
  background(220);
  
  
  
  
  if (gameState === PLAY) {
    
    if(ground.x < 0){
    ground.x = ground.width/2;
    }
    fruit();
    obstacle();
     
  if (bananaGroup.isTouching(monkey)) {
  bananaGroup.destroyEach();
    score = score + 2;
  }
    
  if (obstacleGroup.isTouching(monkey)) {
  monkey.scale = 0.1;
    death = death + 1
}
    if (death===3) {
      bananaGroup.destroyEach();
      gameState = OVER;
    }
    
  if(keyDown("space") && monkey.y <= 380){
  monkey.velocityY = -10 ;
  //jump.mp3.play();
}
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    switch(score) {
    case 10:monkey.scale = 0.22;
      break;
    case 20:monkey.scale = 0.24;
      break;
    case 30:monkey.scale = 0.26;
      break;
    case 40:monkey.scale = 0.28;
      break;
      default: break;
  }

  }
  
  if (gameState === OVER) {
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
   monkey.velocityY = 0;
    monkey.velocityX = 0;
  }
  
  monkey.collide(ground);
  console.log(gameState);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+ score, 50, 50);
}

function fruit() {
  if (frameCount % 60 === 0) {
  var banana = createSprite(380, 200, 10, 40);
    banana.addImage("Banana", bananaImg);
  banana.velocityX = -(6+3*score/100);
    banana.scale = 0.05;
    banana.lifetime = 300;
    bananaGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 300 === 0) {
  var obstacle = createSprite(400, 340, 20, 20);
  obstacle.addImage("Obstacle", obstacleImg);
  obstacle.velocityX = -(6+3*score/100);
  obstacle.scale = 0.1;
  obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);
  }
}