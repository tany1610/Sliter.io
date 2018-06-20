function Snake(controller, x, y){
    if(x && y){
        this.head = new Segment(x, y, random(10, 100));
    }else{
        this.head = new Segment(width/2, height/2, random(10, 30));
    }
    this.body = [];
    //construct the snakes head
    //and the snakes tail
    this.buildSnake();
    //every snake needs a controller
    //to follow
    this.controller = controller;
    this.color = createVector(random(255), random(255), random(255));
}

Snake.prototype.buildSnake = function(){
    let prev = this.head;
    for(let i = 0; i < 10; i++){
        let current = new Segment(prev.a.x + 5, prev.a.y + 5, prev.w, prev);
        this.body.push(current);
        prev = current;
    }
}

//when a snake eats a piece of food
//we add an segment to the end of the tail
Snake.prototype.addSegment = function(){
    let last = this.body[this.body.length - 1];
    let newSegment = new Segment(last.b.x, last.b.y, last.w, last);
    this.body.push(newSegment);
}

//checking if the snake dies
//every frame
Snake.prototype.checkIfDead = function(enemy){
    let headD = p5.Vector.dist(this.head.b, enemy.head.b);
    if(headD < this.head.w / 2){
        return true;
    }
    for(let part of enemy.body){
        let d = p5.Vector.dist(this.head.b, part.b);
        if(d < this.head.w / 2){
            return true;
        }
    }
    return false;
}

//chacking if snake kills an enemy
//every frame
Snake.prototype.checkIfKills = function(enemy){
    let headD = p5.Vector.dist(this.head.b, enemy.head.b);
    if(headD < enemy.head.w / 2){
        return true;
    }
    for(let part of this.body){
        let d = p5.Vector.dist(part.b, enemy.head.b);
        if(d < enemy.head.w / 2){
            return true;
        }
    }
    return false;
}

//checking if a snake eats food
//every frame
Snake.prototype.eats = function(food){
    translate(this.head.b.x, this.head.y);
    let d = dist(this.head.b.x, this.head.b.y, food.pos.x, food.pos.y);
    if(d < this.head.w){
        return true;
    }else{
        return false;
    }
}

//if a snake eats a piece of food
//it gets thicker
Snake.prototype.thicken = function(food){
    this.head.w += food.r / 10;
    for(let seg of this.body){
        seg.w += food.r / 10;
    }
}

//a function to display the snake
Snake.prototype.show = function(){ 
    this.head.show(this.color);
    for(let seg of this.body){
        seg.show(this.color);
    }
    this.head.drawEyes();
}

//using kinematics to
//move the snake
//each segment follows the one in front of it
//the head should follow the controller
Snake.prototype.update = function(){
    this.head.follow(this.controller.pos.x, this.controller.pos.y);
    let prev = this.head;
    for(let seg of this.body){
        seg.follow(prev.a.x, prev.a.y);
        prev = seg;
    }
}