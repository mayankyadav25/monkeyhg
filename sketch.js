var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacle_Image;
var FoodGroup, obstacleGroup;

var survival_time=0;
var PLAY = 1;
var END = 0
var gamestate = PLAY;
var ground2;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacle_Image = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 500);

  monkey = createSprite(80, 100, 20, 20)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;


  ground = createSprite(170, 200, 900, 10);
  ground2 = createSprite(170, 205, 900, 10);
  monkey.debug=true;
  monkey.setCollider("circle",0,0,325)
  
    FoodGroup = new Group();
  obstacleGroup = new Group();
  


}


function draw() {
  background(0);
  
  if (gamestate === PLAY) {
    if (keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -12;

    }
    obstacles();
    food();
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground2);
    ground.velocityX = -4;
    if (ground.x < 170) {
      ground.x = width / 2;
    }
   
    if (obstacleGroup.isTouching(monkey)){
      gamestate=END;
      
       FoodGroup.setLifetimeEach(-1);
       obstacleGroup.setLifetimeEach(-1);
     monkey.velocityX=0;
      ground.velocityX=0;
      monkey.velocityY=0;
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);   
    
    }
  }
  
    if (FoodGroup.isTouching(monkey)){
      score=score+1;
      fill("white");
    
    }
  
    

  
  ground2.visible = false;
  
  console.log(monkey.depth);
  
  drawSprites();
  textSize(20);
  fill("white");
  survival_time=Math.round(frameCount/frameRate());
  text("survival time"+survival_time,50,40)
  
      
    
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(80, 180)), 50, 50);
    banana.addImage(bananaImage)
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 120;
    
    banana.debug=false;
    banana.setCollider("circle",0,0,225)
    FoodGroup.add(banana);

  }
}

function obstacles() {
  if (frameCount % 130 === 0) {
    obstacle = createSprite(600, 170, 50, 50);
    obstacle.addImage(obstacle_Image);
    obstacle.scale = 0.12;
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;
  
    obstacle.debug=true;
    obstacle.setCollider("circle",0,0,245);
    obstacleGroup.add(obstacle);

  }
}