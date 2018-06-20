function Snake(controller, x, y){
    if(x && y){
        this.head = new Segment(x, y, 20);
    }else{
        this.head = new Segment(width/2, height/2, 20);
    }
    this.body = [];
    this.buildSnake();
    this.controller = controller;
    this.color = createVector(random(255), random(255), random(255));
}

Snake.prototype.buildSnake = function(){
    let prev = this.head;
    for(let i = 0; i < 10; i++){
        let current = new Segment(prev.a.x + 5, prev.a.y + 5, prev);
        this.body.push(current);
        prev = current;
    }
}

Snake.prototype.addSegment = function(){
    let last = this.body[this.body.length - 1];
    let newSegment = new Segment(last.b.x, last.b.y, last.w, last);
    this.body.push(newSegment);
}

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

Snake.prototype.eats = function(food){
    translate(this.head.b.x, this.head.y);
    let d = dist(this.head.b.x, this.head.b.y, food.pos.x, food.pos.y);
    if(d < this.head.w){
        return true;
    }else{
        return false;
    }
}

Snake.prototype.thicken = function(food){
    this.head.w += food.r / 10;
    for(let seg of this.body){
        seg.w += food.r / 10;
    }
}

Snake.prototype.show = function(){ 
    this.head.show(this.color);
    for(let seg of this.body){
        seg.show(this.color);
    }
    this.head.drawEyes();
}

Snake.prototype.update = function(){
    this.head.follow(this.controller.pos.x, this.controller.pos.y);
    let prev = this.head;
    for(let seg of this.body){
        seg.follow(prev.a.x, prev.a.y);
        prev = seg;
    }
}