function Segment(x, y, w, parent){
    if(parent){
        this.a = parent.b.copy();
        this.parent = parent;
    }else{
        this.a = createVector(x,y);
        this.parent = undefined;
    }
    this.b = this.a.copy();
    this.angle;
    this.len = 5;
    this.w = w;
    this.vel = createVector(0, 0);
}

Segment.prototype.drawEyes= function(){
    stroke(255);
    strokeWeight(this.w / 2);
    point(this.b.x, this.b.y);
    stroke(0);
    strokeWeight(this.w / 5);
    point(this.b.x, this.b.y);
}

Segment.prototype.show = function(col){
    stroke(col.x, col.y, col.z);
    strokeWeight(this.w);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
}

Segment.prototype.calcB = function(){
    let dx = this.len * cos(this.angle);
    let dy = this.len * sin(this.angle);
    this.b.set(this.a.x + dx, this.a.y + dy);
}

Segment.prototype.follow = function(targetX, targetY){
    let target = createVector(targetX, targetY);
    let dir = p5.Vector.sub(target, this.a);
    this.angle = dir.heading();
    dir.setMag(1);
    dir.mult(-1);
    let newtarget = p5.Vector.add(target, dir);
    this.a.lerp(newtarget, 0.2);
    this.calcB();
}