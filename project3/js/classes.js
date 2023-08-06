//class to create new penguin sprite
class Penguin extends PIXI.Sprite {
    constructor(x = 0, y = 0){
        //loads sprite using preloaded penguin image
        super(app.loader.resources["images/penguin.png"].texture);
        //set the anchor and x and y
        this.anchor.set(.5, .5);
        this.scale.set(.5);
        this.x = x;
        this.y = y;
    }
}

//class to create new polarbear sprites
class Polarbear extends PIXI.Sprite {
    constructor(x = 0, y = 0){
        //loads sprite using preloaded polarbear image
        super(app.loader.resources["images/polarbear.png"].texture);
        //set the anchor and x and y
        this.anchor.set(.5, .5);
        this.scale.set(.8);
        this.x = x;
        this.y = y;
        //get random unit vector so that a random location and movement can occur
        this.fwd = getRandomUnitVector();
        //assign speed to polar bears
        this.speed = 40;
        this.isAlive = true;
    }

    //create move function to be used by polarbears
    move(dt = 1/60){
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }
    //create reflection functions to be used by polarbears
    reflectX(){
        this.fwd.x *= -1;
    }

    reflectY(){
        this.fwd.y *= -1;
    }
}


//class to create new seal sprites
class Seal extends PIXI.Sprite {
    constructor(x = 0, y = 0){
        //loads sprite using preloaded seal image        
        super(app.loader.resources["images/seal.png"].texture);
        //set anchor and x and y 
        this.anchor.set(.5, .5);
        this.scale.set(.5);
        this.x = x;
        this.y = y;
        //get random unit vector so that a random location and movement can occur        
        this.fwd = getRandomUnitVector();
        //assign faster speed to seals
        this.speed = 50;
        this.isAlive = true;
    
    }
    //create move function to be used by seals
    move(dt = 1/60){
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }
    //create reflection functions to be used by seals
    reflectX(){
        this.fwd.x *= -1;
    }

    reflectY(){
        this.fwd.y *= -1;
    }
}
//class to create new fish sprites
class Fish extends PIXI.Sprite {
    constructor(x = 0, y = 0){
        //loads sprite using preloaded fish image  
        super(app.loader.resources["images/fish.png"].texture);
        //set anchor and x and y 
        this.anchor.set(.5, .5);
        this.scale.set(.5);
        this.x = x;
        this.y = y;
        //get random unit vector so that a random location and movement can occur    
        this.fwd = getRandomUnitVector();
        //set speed of fish to be slower 
        this.speed = 30;
        this.isAlive = true;
    
    }
    //create move function to be used by fish
    move(dt = 1/60){
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }
    //create reflection functions to be used by fish
    reflectX(){
        this.fwd.x *= -1;
    }

    reflectY(){
        this.fwd.y *= -1;
    }
}