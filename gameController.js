function GameController(x, y){
    if(x && y){
        this.pos = createVector(x, y);
    }else{
        this.pos = createVector(width/2, height/2);
    }

    //velocity is used to calculate
    //the speed of the player
    this.vel = createVector(0, 0);
    this.r = 20;
    //we need to store the direction in order
    //to move the enemies 
    this.dir = createVector(random(width), random(height));
}

//we use it to update the position of the mouse
//and make the player follow it
GameController.prototype.update = function(mag){
    let newvel = createVector(mouseX - width/2, mouseY - height/2);
    if(mag){
        newvel.setMag(mag);
    }else{
        newvel.setMag(1.5);
    }
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
}

//we have to make the controller bigger
//when the player also gets bigger
//for better percision
GameController.prototype.thicken = function(food){
    this.r += food.r / 10;
}

//the bots have to move randomly
//not like the player which follows the mouse
GameController.prototype.wander = function(){
    if(random(1) < 0.1){
        this.dir = createVector(random(width), random(height));
    }
    this.dir.setMag(1);
    this.vel.lerp(this.dir, 0.2);
    this.pos.add(this.vel);
}