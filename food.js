function Food(x, y){
    this.pos = createVector(x , y);
    //we make the food with random thickness
    this.r = random(8, 10);
    this.col = createVector(random(255), random(255), random(255))
}

//function to display the food
Food.prototype.show = function(){
    fill(this.col.x, this.col.y, this.col.z);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
}