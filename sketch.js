var player;
var enemies = [];
var food = [];
var controller;
var zoom = 0;

function setup() {
    createCanvas(600, 600);

    //creating player and player controller
    //the player controller is used to move the player
    playerController = new GameController();
    player = new Snake(playerController);

    //creating enemies
    //enemies have their own controller
    for(let i = 0; i < 25; i++){
        let x = random(-width * 2, width * 2);
        let y = random(-height * 2, height * 2);
        let enemyController = new GameController(x, y);
        let enemy = new Snake(enemyController, enemyController.pos.x, enemyController.pos.y);
        enemies.push(enemy);
    }
    
    //creating the food
    for(let i = 0; i < 300; i++){
        let x = random(-width * 5, width * 5);
        let y = random(-height * 5, height * 5);
        let f = new Food(x, y);
        food.push(f);
    }
}

//this is an infinate loop
function draw() {
    //we have to redraw the background every frame
    background(0);

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
    //we sprint and we reduce the length (limited 10)
    //and the thickness of the snake (limited 20)
    if(mouseIsPressed){
        if(player.body.length > 10){
            player.controller.update(3);
            if(random(1) < 0.05){
                if(player.head.w > 20){
                    player.head.w -= 1;
                    for(let seg of player.body){
                        seg.w -= 1;
                    }
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

    //checking if player dies
    //checking if player kills enemies
    //adding new food food if an enemy dies
    for(let i = enemies.length - 1; i >= 0; i--){
        if(player.checkIfDead(enemies[i])){
            //restart the game if player dies
            restartGame();
        }else if(player.checkIfKills(enemies[i])){
            for(let part of enemies[i].body){
                if(random(1) < 0.6){
                    let f = new Food(part.b.x, part.b.y);
                    food.push(f);
                }
            }
            enemies.splice(i, 1);
            let enemyController = new GameController(random(-width, width), random(-height, height));
            let newEnemy = new Snake(enemyController, random(-width, width), random(-height, height));
            enemies.push(newEnemy);
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
            let newFood = new Food(random(-width, width), random(-height, height));
            food.push(newFood);
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

//when restaring we create new player 
//and new enemies
function restartGame(){
    playerController = new GameController();
    player = new Snake(playerController);
    enemies = [];
    for(let i = 0; i < 20; i++){
        let x = random(-width * 2, width * 2);
        let y = random(-height * 2, height * 2);
        let enemyController = new GameController(x, y);
        let enemy = new Snake(enemyController, enemyController.pos.x, enemyController.pos.y);
        enemies.push(enemy);
    }
}