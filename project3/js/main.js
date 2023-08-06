"use strict";

//create global variables
let startScene;
let paused = true;
let instructionScene;
let gameScene;
let penguin;
let polarbear;
let seal;
let fish;
let lifeLabel;
let levelLabel;
let fishSound,hitSound,levelupSound, winSound, loseSound;
let gameOverScene;
let winScene;
let stage;
let polarbears = [];
let fishes = [];
let seals = [];
let life = 100;
let levelNum = 1;
let startBackground;
let instructionBackground;
let gameBackground;
let winBackground;
let gameOverBackground;
let keys = {};

//create constants
const app = new PIXI.Application({
    width: 800,
    height: 600
});
document.body.appendChild(app.view);
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

//preload sprite images
app.loader.
    add([
        "images/penguin.png",
        "images/polarbear.png",
        "images/seal.png",
        "images/fish.png"
    ]);
app.loader.onComplete.add(setup);
app.loader.load();

//function to create the labels and buttons 
function createLabels(){

    //create label on start screen 
    let startLabel1 = new PIXI.Text("Penguin Party!");
    startLabel1.style = new PIXI.TextStyle({
        fill: '#4287f5',
        fontSize: 80,
        fontFamily: 'Marker Felt, fantasy',
        stroke: '#8f05ff',
        strokeThickness: 6
    });
    startLabel1.x = 150;
    startLabel1.y = 120;
    startScene.addChild(startLabel1);

    //create label on start screen 
    let startLabel2 = new PIXI.Text("Help Perry get to the party");
    startLabel2.style = new PIXI.TextStyle({
        fill: '#4287f5',
        fontSize: 40,
        fontFamily: 'Marker Felt, fantasy',
        stroke: '#8f05ff',
        strokeThickness: 4
    });
    startLabel2.x = 160;
    startLabel2.y = 280;
    startScene.addChild(startLabel2);

    //create life label on game screen
    lifeLabel = new PIXI.Text(`Life    ${life}%`);
    lifeLabel.style = new PIXI.TextStyle({
        fill: '#FFFFFF',
        fontSize: 25,
        fontFamily: 'Marker Felt, fantasy',
        stroke: '#4287f5',
        strokeThickness: 4
    });
    lifeLabel.x = 650;
    lifeLabel.y = 550;
    gameScene.addChild(lifeLabel);

    //create level label on game screen
    levelLabel = new PIXI.Text(`Level    ${levelNum}`);
    levelLabel.style = new PIXI.TextStyle({
        fill: '#FFFFFF',
        fontSize: 25,
        fontFamily: 'Marker Felt, fantasy',
        stroke: '#4287f5',
        strokeThickness: 4
    });
    levelLabel.x = 30;
    levelLabel.y = 550;
    gameScene.addChild(levelLabel);

    //create universal button style
    let buttonStyle = new PIXI.TextStyle({
        fill: '#ff00ff',
        fontSize: 48,
        fontFamily: "Marker Felt, Fantasy",
        stroke: '#8f05ff',
        strokeThickness: 4
    });

    //create go button for start screen that goes to instructions
    let goButton = new PIXI.Text("Lets go!");
    goButton.style = buttonStyle;
    goButton.x = 320;
    goButton.y = 380;
    goButton.interactive = true;
    goButton.ButtonMode = true;
    goButton.on("pointerup", instructions);
    goButton.on('pointerover', e=>e.target.alpha = 0.5);
    goButton.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    startScene.addChild(goButton);

    //create start button for instruction screen that starts game
    let startButton = new PIXI.Text("Start!");
    startButton.style = buttonStyle;
    startButton.x = 100;
    startButton.y = 180;
    startButton.interactive = true;
    startButton.ButtonMode = true;
    startButton.on("pointerup", startGame);
    startButton.on('pointerover', e=>e.target.alpha = 0.5);
    startButton.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    instructionScene.addChild(startButton);

    //create play again button for lose screen that starts game again
    let playAgainButton = new PIXI.Text("Play Again!");
    playAgainButton.style = buttonStyle;
    playAgainButton.x = 290;
    playAgainButton.y = 440;
    playAgainButton.interactive = true;
    playAgainButton.ButtonMode = true;
    playAgainButton.on("pointerup", startGame);
    playAgainButton.on('pointerover', e=>e.target.alpha = 0.5);
    playAgainButton.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    gameOverScene.addChild(playAgainButton);

    //create exit button for win screen that exits to start screen 
    let startOverButton = new PIXI.Text("Exit");
    startOverButton.style= buttonStyle;
    startOverButton.x = 330;
    startOverButton.y = 300;
    startOverButton.interactive = true;
    startOverButton.ButtonMode = true;
    startOverButton.on("pointerup", restart);
    startOverButton.on('pointerover', e=>e.target.alpha = 0.5);
    startOverButton.on("pointerout", e=>e.currentTarget.alpha = 1.0);
    winScene.addChild(startOverButton);

}

//function to make instruction scene visible
function instructions(){
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = false;
    winScene.visible = false;
    instructionScene.visible = true;
}

//increase life by value passed in and update life label
function increaseLifeBy(value) {
    life += value;
    life = parseInt(life);
    lifeLabel.text = `Life    ${life}%`;
}

//increase level by value passed in and update level label
function increaseLevel(value) {
        levelNum = value;
        levelNum = parseInt(levelNum);
        levelLabel.text = `Level    ${levelNum}`;
        levelupSound.play();
    
}

//decrease level by value passed in and update life label
function decreaseLifeBy(value){
    life -= value;
    life = parseInt(life);
    lifeLabel.text = `Life    ${life}%`;
}

//start game
function startGame(){
    //make game scene visible
    winScene.visible = false;
    startScene.visible = false;
    gameScene.visible = true;
    gameOverScene.visible = false;
    instructionScene.visible = false;
    //set life to 100
    life = 100;
    //set x and y of penguin
    penguin.x = 370;
    penguin.y = 510;
    //set life and level
    increaseLifeBy(0);
    decreaseLifeBy(0);
    increaseLevel(1);
    //unpause game
    paused = false;
    //load level
    loadLevel();
}

//restart game
function restart(){
    //make start scene visible
    winScene.visible = false;
    startScene.visible = true;
    gameScene.visible = false;
    gameOverScene.visible = false;
    instructionScene.visible = false;
    //set life to 100
    life = 100;
    //set x and y of penguin
    penguin.x = 370;
    penguin.y = 510;
    //set life and level
    increaseLifeBy(0);
    decreaseLifeBy(0);
    increaseLevel(1);
    //unpause game
    paused = false;
    //load level
    loadLevel();
}

//set up game
function setup() {

    // add keyboard event handler for key up and down 
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    //stage game in center 
    app.view.style.position = "absolute";
    app.view.style.left = (window.innerWidth - sceneWidth) / 2 + "px";
    app.view.style.top = (window.innerHeight - sceneHeight) / 1.75 + "px";
	stage = app.stage;

    //create backgrounds for each scene
    startBackground = PIXI.Sprite.from("images/startscreen.png");
    instructionBackground = PIXI.Sprite.from("images/instructions.png");
    gameBackground = PIXI.Sprite.from("images/gameBackground.png");
    gameOverBackground = PIXI.Sprite.from("images/gameOverScreen.png");
    winBackground = PIXI.Sprite.from("images/winScreen.png");

    //create new start scene and add to stage
    startScene = new PIXI.Container();
    startScene.addChild(startBackground);
    stage.addChild(startScene);

    //create new instruction scene and add to stage 
    instructionScene = new PIXI.Container();
    instructionScene.addChild(instructionBackground);
    instructionScene.visible = false;
    stage.addChild(instructionScene);

    //create new game scene and add to stage
    gameScene = new PIXI.Container();
    gameScene.addChild(gameBackground);
    gameScene.visible = false;
    stage.addChild(gameScene);

    //create new game over scene and add to stage 
    gameOverScene = new PIXI.Container();
    gameOverScene.addChild(gameOverBackground);
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

    //create new win scene and add to stage
    winScene = new PIXI.Container();
    winScene.addChild(winBackground);
    winScene.visible = false;
    stage.addChild(winScene);

    //call function to make buttons and labels
    createLabels();

    //create new penguin and add to the game scene 
    penguin = new Penguin();
    gameScene.addChild(penguin);

    //create new howls for each sound
    fishSound = new Howl({
        src: ['sounds/fish.wav']
    });

    hitSound = new Howl({
        src: ['sounds/hit.wav']
    });

    levelupSound = new Howl({
        src: ['sounds/levelup.wav']
    });

    winSound = new Howl({
        src: ['sounds/win.wav']
    });

    loseSound = new Howl({
        src: ['sounds/lose.wav']
    });

    // set up game loop
    app.ticker.add(gameLoop);
    function gameLoop(){

	    if (paused) return;

        //calculate "delta time"
        let dt = 1/app.ticker.FPS;
        if(dt > 1/12) dt = 1/12;
	
        //up arrow moves penguin up 4
        if (keys["38"]){
            penguin.y -= 4;
        }

        //left arrow moves penguin left 4
        if (keys["37"]){
            penguin.x -= 4;
        }

        //down arrow moves penguin down 4
        if (keys["40"]){
         penguin.y += 4;
        }

        //right arrow moves penguin right 4
        if (keys["39"]){
            penguin.x += 4;
        }

        //establish half height of penguin
        let h2 = penguin.height/2;
        //keep penguin on the screen using clamp function
        penguin.x = clamp(penguin.x,20,sceneWidth);
        penguin.y = clamp(penguin.y,0,sceneHeight-h2);

        //loop through polarbears array
        for(let p of polarbears){

            //establish half height of polarbear
            let h2 = p.height/1.5;
            //keep polarbear on the screen using clamp function
            p.x = clamp(p.x,20,sceneWidth);
            p.y = clamp(p.y,15,sceneHeight-h2);
            //move polarbear
            p.move(dt);
            //if the x of polarbear is greater than or equal to scene width
            //bump off side of screen
            if(p.x >= sceneWidth){
                p.reflectX();
                p.move(dt);
            }
            //if the y of polarbear is greater than or equal to scene height
            //bump off side of screen
            if(p.y >= sceneHeight){
                p.reflectY();
                p.move(dt);
            }
        }

        //loop through array of seals
        for(let s of seals){

            //establish half height of seal
            let h2 = s.height/1.5;
            //keep seals on the screen using clamp function
            s.x = clamp(s.x,20,sceneWidth);
            s.y = clamp(s.y,15,sceneHeight-h2);
            //move seal
            s.move(dt);
            //if the x of seal is greater than or equal to scene width
            //bump off side of screen
            if(s.x >= sceneWidth){
                s.reflectX();
                s.move(dt);
            }
            //if the y of seal is greater than or equal to scene height
            //bump off side of screen
            if(s.y >= sceneHeight){
                s.reflectY();
                s.move(dt);
            }   
        }


        //loop through array of fish
        for(let f of fishes){

            //establish half height of fish
            let h2 = f.height/1.5;
            //keep fish on the screen using clamp function
            f.x = clamp(f.x,20,sceneWidth);
            f.y = clamp(f.y,0,sceneHeight-70);
            //move fish
            f.move(dt);
            //if the x of fish is greater than or equal to scene width
            //bump off side of screen allow fish to float off screen 
            //increases difficulty
            if(f.x >= sceneWidth){
                f.reflectX();
                f.move(dt);
            }
        }

    //check for collisions with penguins
    //loop through array of polarbears
        for (let p of polarbears){
            //call intersection function for polarbears
            if(polarbearsIntersect(penguin,p)){
                //play hit sound
                hitSound.play();
                //remove the polar bear that is hit 
                gameScene.removeChild(p);
                p.isAlive = false;
                //decrease life by 10 
                decreaseLifeBy(10);
    
            }
    
        }
    
    //loop through array of seals
        for (let s of seals){
            //call intersection function for seals
            if(sealsIntersect(penguin,s)){
                //play hit sound
                hitSound.play();
                //remove seal that is hit
                gameScene.removeChild(s);
                s.isAlive = false;
                //decrease life by 20 
                decreaseLifeBy(20);
        
            }
        
        }


    //loop through array of fish
    for (let f of fishes){
        //call intersection function for fish
        if(fishesIntersect(penguin,f)){
            //play fish sound
            fishSound.play();
            //remove fish that is hit
            gameScene.removeChild(f);
            f.isAlive = false;

        //if life is less than 100 and current life value plus 10 is still
        //less than 100
        if((life < 100 )&& ((life+10)<100)){
            //increase life by 10
            increaseLifeBy(10);
        }
        //otherwise increase life by the difference of 100 minus current life score
       else{
            increaseLifeBy(100-life);
          }

    }
        
}

    //clean up arrays of predators and fish 
    polarbears = polarbears.filter(p=>p.isAlive);

    seals = seals.filter(s=>s.isAlive);

    fishes = fishes.filter(f=>f.isAlive);

    //if the y coordinate of penguin is 0
        if(penguin.y == 0){
            //advance to next level
            levelNum++;
            increaseLevel(levelNum);
            //remove all remaining polarbears and set array to 0
            polarbears.forEach(p=>gameScene.removeChild(p));
            polarbears = [];
            //remove all remaining seals and set array to 0
            seals.forEach(s=>gameScene.removeChild(s));
            seals = [];
            //remove all remaining fish and set array to 0
            fishes.forEach(f=>gameScene.removeChild(f));
            fishes = [];
            //reset penguin location
            penguin.x = 370;
            penguin.y = 510;
            //load new level
            loadLevel();
        
        }

        //if life is less than or equal to 0
        if(life <= 0){
            //call end function 
            end();
            return;
        }

        //if life is greater than 0 and all 5 levels have been completed
        if(life > 0 && (levelNum > 5)){
            //call win function
            win();
        }
    }


}

//detect when a key is pressed
function keysDown(e) {
    keys[e.keyCode] = true;
}

//detect when a key is lifted
function keysUp(e) {
    keys[e.keyCode] = false;
}
//create array of seals based on number passed 
function createSeals(numSeals){
    for(let i = 0; i <numSeals; i++){
        //create new seal
        seal = new Seal();
        //place seals randomly on screen
        seal.x = Math.random()* (sceneWidth - 50) + 25;
        seal.y = Math.random()* (sceneHeight - 300) + 25;
        //add seal to seals array
    seals.push(seal);
    //add each seal to the screen 
    gameScene.addChild(seal);
  }
}

//create array of fish based on number passed 
function createFish(numFish){
    for(let i = 0; i <numFish; i++){
        //create new fish
        fish = new Fish();
        //place fish randomly on screen
        fish.x = Math.random()* (sceneWidth - 50) + 25;
        fish.y = Math.random()* (sceneHeight - 300) + 25;
        //add fish to fish array
    fishes.push(fish);
    //add each fish to game screen
    gameScene.addChild(fish);
  }
}

//create array of polarbears based on number passed 
function createPolarBears(numBears){
    for(let i = 0; i <numBears; i++){
        //create new polarbear
        polarbear = new Polarbear();
        //place polarbear randomly on screen
        polarbear.x = Math.random()* (sceneWidth - 50) + 25;
        polarbear.y = Math.random()* (sceneHeight - 300) + 25;
        //add polarbear to polarbear array
    polarbears.push(polarbear);
    //add each polarbear to game screen
    gameScene.addChild(polarbear);
  }
}

//load new level 
function loadLevel(){
    //increase number of predators based on level
    createPolarBears(levelNum*4);
    createSeals(levelNum*3);
    //always create 10 fish
    createFish(10);
    paused = false;
}

//called when player loses 
function end(){
    //pause game
    paused = true;
    //play lose sound
    loseSound.play();

    //remove each polarbear left and empty the array
    polarbears.forEach(p=>gameScene.removeChild(p));
    polarbears = [];
    //remove each seal left and empty the array
    seals.forEach(s=>gameScene.removeChild(s));
    seals = [];
    //remove each fish left and empty the array
    fishes.forEach(f=>gameScene.removeChild(f));
    fishes = [];
    //make the game over screen visible
    gameOverScene.visible = true;
    //make game scene not visible
    gameScene.visible = false;
}

//called when game is won
function win(){
    //pause game
    paused = true;
    //play win sound
    winSound.play();
    //remove each polarbear left and empty the array
    polarbears.forEach(p=>gameScene.removeChild(p));
    polarbears = [];
    //remove each seal left and empty the array
    seals.forEach(s=>gameScene.removeChild(s));
    seals = [];
    //remove each fish left and empty the array
    fishes.forEach(f=>gameScene.removeChild(f));
    fishes = [];
    //make win scene visible
    winScene.visible = true;
    //make game scene not visible
    gameScene.visible = false;
}