var player;
var enemies = [];
var food = [];
var grid = [];
var controller;
var zoom = 0;

function setup() {
    createCanvas(600, 600);
    //creating a grid
    for(let i = 0; i < 600; i += 60){
        for(let j = 0; j < 600; j += 60){
            let square = {
                pos: createVector(i, j),
                w: 60
            }
            grid.push(square);
        }
    }
    //creating player and player controller
    //the player controller is used to move the player
    playerController = new GameController();
    player = new Snake(playerController);

    //creating enemies
    //enemies have their own controller
    for(let i = 0; i < 20; i++){
        let enemyController = new GameController(random(-width, width), random(-height, height));
        let enemy = new Snake(enemyController, enemyController.pos.x, enemyController.pos.y);
        enemies.push(enemy);
    }
    
    //creating the foor
    for(let i = 0; i < 20; i++){
        let f = new Food(random(width), random(height));
        food.push(f);
    }
}

//this is an infinate loop
function draw() {
    //we have to redraw the background every frame
    background(0);
    //drawing a grid
    drawGrid();
    //this function is used to zoom out and follow
    //the player
    translation();

    //drawing and moving the enemies
    for(let i = 0; i < enemies.length; i++){
        enemies[i].controller.wander();
        enemies[i].update();
        enemies[i].show();
    }

    //drawing and moving the player
    //if the mouse button is held
    //we sprint and we reduce the length
    //and the thickness of the snakes
    if(mouseIsPressed){
        if(player.body.length > 10){
            player.controller.update(3);
            if(random(1) < 0.05){
                player.head.w -= 1;
                for(let seg of player.body){
                    seg.w -= 1;
                }
                player.body.splice(player.body.length - 1, 1);
            }
        }else{
            player.controller.update();
        }
    }else{
        player.controller.update();
    }
    player.show();
    player.update();

    //adding some more food
    if(random(1) < 0.03){
        let f = new Food(random(width), random(height));
        food.push(f);
    }

    //adding some more enemies
    if(random(1) < 0.005){
        let enemyController = new GameController(random(-width, width), random(-height, height));
        let enemy = new Snake(enemyController, enemyController.pos.x, enemyController.pos.y);
        enemies.push(enemy);
    }

    //checking if player dies
    //checking if player kills enemies
    //adding new food food if an enemy dies
    for(let i = enemies.length - 1; i >= 0; i--){
        if(player.checkIfDead(enemies[i])){
            //restart the game if player dies
            restartGame();
        }else if(player.checkIfKills(enemies[i])){
            for(let part of enemies[i].body){
                if(random(1) < 0.5){
                    let f = new Food(part.b.x, part.b.y);
                    food.push(f);
                }
            }
            enemies.splice(i, 1);
        }
    }

    //drawing the food
    //checking if player eats food
    for(let i = food.length - 1; i >= 0; i--){
        food[i].show();
        if(player.eats(food[i])){
            player.thicken(food[i]); 
            playerController.thicken(food[i]); 
            player.addSegment();      
            food.splice(i, 1);
        }
    }
}

function translation(){
    translate(width / 2, height / 2);
    var newzoom = 64 / playerController.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-playerController.pos.x,-playerController.pos.y);
}

function drawGrid(){
    for(let square of grid){
        noFill();
        stroke(255);
        strokeWeight(1);
        rect(square.pos.x, square.pos.y, square.w, square.w);
    }
}

//when restaring we create new player 
//and new enemies
function restartGame(){
    playerController = new GameController();
    player = new Snake(playerController);
    enemies = [];
    for(let i = 0; i < 20; i++){
        let enemyController = new GameController(random(-width, width), random(-height, height));
        let enemy = new Snake(enemyController, enemyController.pos.x, enemyController.pos.y);
        enemies.push(enemy);
    }
}