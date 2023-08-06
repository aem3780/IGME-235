//used functions from circle blast 

//use this to keep the player on the screen
	function clamp(val, min, max){
        return val < min ? min : (val > max ? max : val);
    }
    
    //bounding box collision detection - it compares PIXI.Rectangles of sprites
	//intersection based on size of polarbear sprite
	function polarbearsIntersect(a,b){
		var ab = a.getBounds();
		var bb = b.getBounds();
		return ab.x + ab.width/3 > bb.x && ab.x < bb.x + bb.width/3 && ab.y + ab.height/4 > bb.y && ab.y < bb.y + bb.height/4;
	}
	//intersection based on size of seal sprite
    function sealsIntersect(a,b){
		var ab = a.getBounds();
		var bb = b.getBounds();
		return ab.x-10 + ab.width/4 > bb.x && ab.x < bb.x + bb.width/4 && ab.y + ab.height/4 > bb.y && ab.y < bb.y + bb.height/4;
	}
	//intersection based on size of fish sprite
    function fishesIntersect(a,b){
		var ab = a.getBounds();
		var bb = b.getBounds();
		return ab.x + ab.width/6 > bb.x && ab.x < bb.x + bb.width/6 && ab.y + ab.height/5 > bb.y && ab.y < bb.y + bb.height/5;
	}
    //these 2 helpers are used by classes.js
	function getRandomUnitVector(){
		let x = getRandom(-1,1);
		let y = getRandom(-1,1);
		let length = Math.sqrt(x*x + y*y);
		if(length == 0){ // very unlikely
			x=1; // point right
			y=0;
			length = 1;
		} else{
			x /= length;
			y /= length;
		}
	
		return {x:x, y:y};
	}
	
	function getRandom(min, max) {
		return Math.random() * (max - min) + min;
	}