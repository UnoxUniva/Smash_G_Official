const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground1
var arms1, armimg
var playerImg
var enemy,enemimg, enemyGroup
var leftedge  
var score =0 
var y
var restart, restartImg
var scores ,scorimg
var PLAY = 0
var END =1
var smashg,smgimg
var gameState = PLAY
var gameState = END

function preload(){
  playerImg = loadImage("Images/player_rightlook.png")
  enemimg = loadAnimation("Images/enemy_leftrun.png","Images/player_leftlook.png")
  restartImg = loadImage("Images/g_o1.png")
  scorimg = loadImage("Images/Score.png")
  armimg = loadImage("Images/armimg.png")
  smgimg = loadImage("Images/ICON.png")
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  engine = Engine.create();
  world = engine.world;
  
  ground1 = new Ground(width/2,height-100,1000, 300, true, "brown")
  giant = new Ground(120,height/2,200,500,true,"grey",playerImg)
  
  arms1 = createSprite(370,height/2,60,60)
  arms1.addImage(armimg)
  arms1.scale = 0.4
  scores = createSprite(140,80,20,20)
  scores.addImage(scorimg)
  scores.scale=0.2

  smashg = createSprite(700,600)
  smashg.addImage(smgimg)
  smashg.scale = 0.4

  // enemy1 =  createSprite(750,410,50,50)
  // enemy1.addAnimation("attack1",enemimg)
  leftedge = createSprite(250,height/2,40,height)
  leftedge.visible= false


  enemyGroup = new Group()
  
}

function draw() {
  background("cyan");  
  Engine.update(engine);
  ground1.display()
  giant.display()
  
  
    restart = createSprite(700, 400 , 60,60)
    restart.addImage(restartImg)
    restart.scale = 0.5

    restart.visible = false

  // arms1.x = mouseX
  // arms1.y = mouseY

  spawnE()

  textSize(38)
  
  text(score,250,110)
  

  for (var i = 0; i < enemyGroup.length; i++) {
    if (enemyGroup.get(i).isTouching(leftedge)) {
  
        text("Game Over. Press Reload to restart",700,400)
        // restart.visible = true


        enemyGroup.destroyEach();

        
     
        
    }
    if (enemyGroup.get(i).isTouching(arms1)) {
      enemyGroup.get(i).destroy();

      score = score+5
   
      

  }

  if(keyDown(UP_ARROW)){
    arms1.velocityY = -20
  }else if(keyDown(DOWN_ARROW)){
    arms1.velocityY = 20
  }else{
    arms1.velocityY = 0
  }
  // if(gameState===END){
  //    enemyGroup.destroyEach()
  //    enemyGroup.setVelocityXEach(0);
  //    arms1.destroy()

  //    restart.visible = true

     
  //    if(mousePressedOver(restart)){
  //      gameState=PLAY
  //      restart.visible = false
  //    }

   }

  drawSprites()

  }


function spawnE() {
  //write code here to spawn the clouds
  if (frameCount % 5 === 0) {
    enemy = createSprite(1200,y,40,10);
    y = Math.round(random(80,500));
    enemy.addAnimation("attack1",enemimg);
    
    enemy.velocityX = -6;
    
     //assign lifetime to the variable
    // enemy.lifetime = 200;
    
    //adjust the depth
    // enemy.depth = trex.depth;
    // trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    enemyGroup.add(enemy);
  }
  
}