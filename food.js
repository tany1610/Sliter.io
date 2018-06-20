function Food(x, y){
    this.pos = createVector(x , y);
    this.r = random(8, 15);
    this.col = createVector(random(255), random(255), random(255))
}

Food.prototype.show = function(){
    fill(this.col.x, this.col.y, this.col.z);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
}