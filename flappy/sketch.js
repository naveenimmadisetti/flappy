var bird;
var pipes = [];
function setup() {
    createCanvas(400, 600);
    bird = new Bird();
    pipes.push(new Pipe());
}
function draw() {
    background(0);
    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        if (pipes[i].hits(bird)) {
            console.log("hit");
        }
        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }
    bird.show();
    bird.update();
    if (frameCount % 100 == 0) {
        pipes.push(new Pipe());
    }
    
    
}
function Bird() {
    this.y = height / 2;
    this.x = 50;
    this.gravity = 0.7;
    this.velocity = 0;
    this.lift = -15;
    this.show = function () {
        fill(255, 204, 0);
        ellipse(this.x, this.y, 35, 30);
    }
    this.update = function () {
        this.velocity = this.velocity + this.gravity;
        this.y = this.y + this.velocity;
        this.velocity *= 0.9;
        if (this.y > height) {
            this.velocity = 0;
            this.y = height;
        }
        if (this.y < 0) {
            this.velocity = 0;
            this.y = 0;
            //this.gravity = 0;
        }
    }
    this.fly = function() {
        this.velocity = this.velocity + this.lift;
        //print(this.velocity);
    }
}
function keyPressed() {
    if (key == ' ') {
        //console.log("SPACE key presed");
        bird.fly();
    }
}
function Pipe() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width;
    this.b = 25;
    this.speed = 3;
    this.highlight = false;
    this.hits = function(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.b) {
                this.highlight = true;
                return true;
                
            }
        }
        //this.highlight = false;
        return false;
        
        
    }
    this.show = function() {
        fill(255);
        if (this.highlight){
            fill("red");
        }
        else {
            fill(0, 255, 0);
        }
        rect(this.x, 0, this.b, this.top);
        rect(this.x, height-this.bottom, this.b, this.bottom);
        
    }
    this.update = function() {
        this.x -= this.speed;
    }
    this.offscreen = function() {
        if(this.x < -this.w)
            return true;
        else
            return false;
    }
}
