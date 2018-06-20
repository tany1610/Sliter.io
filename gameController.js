function GameController(x, y){
    if(x && y){
        this.pos = createVector(x, y);
    }else{
        this.pos = createVector(width/2, height/2);
    }
    
    this.vel = createVector(0, 0);
    this.r = 20;
    this.dir = createVector(random(width), random(height));
}

GameController.prototype.update = function(){
    let newvel = createVector(mouseX - width/2, mouseY - height/2);
    newvel.setMag(1.5);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
}

GameController.prototype.thicken = function(food){
    this.r += food.r / 10;
}

GameController.prototype.wander = function(){
    if(random(1) < 0.1){
        this.dir = createVector(random(width), random(height));
    }
    this.dir.setMag(1);
    this.vel.lerp(this.dir, 0.2);
    this.pos.add(this.vel);
}