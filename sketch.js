var player;
var enemies = [];
var food = [];
var controller;
var zoom = 0;

function setup() {
    createCanvas(600, 600);
    playerController = new GameController();
    player = new Snake(playerController);
    for(let i = 0; i < 20; i++){
        let enemyController = new GameController(random(-width, width), random(-height, height));
        let enemy = new Snake(enemyController, enemyController.pos.x, enemyController.pos.y);
        enemies.push(enemy);
    }
    
    for(let i = 0; i < 20; i++){
        let f = new Food(random(width), random(height));
        food.push(f);
    }
}

function draw() {
   background(180);
   translation();

   for(let i = 0; i < enemies.length; i++){
        enemies[i].controller.wander();
        enemies[i].update();
        enemies[i].show();
   }

   player.controller.update();
   player.show();
   player.update();
   for(let enemy of enemies){
        if(player.checkIfDead(enemy)){
            playerController = new GameController();
            player = new Snake(playerController);
        }
   }
   
   for(let i = food.length - 1; i >= 0; i--){
       food[i].show();
       if(player.eats(food[i])){
            player.thicken(food[i]); 
            playerController.thicken(food[i]); 
            player.addSegment();      
            food.splice(i, 1);
       }
   }

   if(random(1) < 0.01){
        let f = new Food(random(width), random(height));
        food.push(f);
    }
}

function translation(){
    translate(width / 2, height / 2);
    var newzoom = 64 / playerController.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-playerController.pos.x,-playerController.pos.y);
}