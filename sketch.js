var player;
var enemy;
var food = [];
var controller;
var zoom = 0;

function setup() {
    createCanvas(600, 600);
    player = new Snake();
    enemy = new Snake(width / 2, height / 2 - 200);
    controller = new GameController();
    for(let i = 0; i < 20; i++){
        let f = new Food(random(width), random(height));
        food.push(f);
    }
}

function draw() {
   background(180);
   translation();
   controller.update();
   player.show(createVector(50, 100, 50));
   enemy.show(createVector(100, 200, 100));
   player.update(controller);

   if(player.checkIfDead(enemy)){ 
        player = new Snake();  
   }

   for(let i = food.length - 1; i >= 0; i--){
       food[i].show();
       if(player.eats(food[i])){
            player.thicken(food[i]); 
            controller.thicken(food[i]); 
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
    var newzoom = 64 / controller.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-controller.pos.x,-controller.pos.y);
}