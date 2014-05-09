(function(){

	var tileWidth = 200, tileHeight = 200;

	var tile = document.getElementsByClassName("tile multiple")[0];

	var tileS = document.getElementsByClassName("tile single")[0];

	var imageSArray = ["images/Tiles/sTile.png"];

	var imageArray = ["images/Tiles/tile1.png", "images/Tiles/tile2.png", 
						"images/Tiles/tile3.png", "images/Tiles/tile4.png"];


	var tileObject = new Tile(tile);
	tileObject.loadTile(imageArray);

	var tileObjectS = new Tile(tileS);
	tileObjectS.loadTile(imageSArray);

	tileS.onclick = function(e){
		tileObjectS.loadTile(imageArray);
	}

	function Tile(tile){
		this.tile = tile;
		this.images = this.tile.getElementsByClassName("image")[0];
		this.imageFigure = this.images.getElementsByTagName('figure');

		this.firstImage = this.imageFigure[0];
		this.secondImage = this.imageFigure[1];
		if (this.secondImage != null){
			this.thirdImage = this.imageFigure[2];
			this.fourthImage = this.imageFigure[3];
			this.tileArray = [this.firstImage, this.secondImage, this.thirdImage, this.fourthImage];
		}
		else {
			this.tileArray = [this.firstImage];
		}
		
		this.mode = "back";
		this.timer = null;

		this.loadTile = function(imageArray){
			if (this.mode == "back"){
				this.mode = "front";
			}
			else {
				this.mode = "back";
			}
			loadTile(this.tileArray, imageArray, this.mode, -1, this.timer);
		}

		this.getTileArray = function(){
			return this.tileArray;
		}

		/*tile.onclick = function(e){
			console.log(this.tileArray);
		}*/
	}

	function loadTile(tileArray, imageArray, mode, pos, timer){
		var counter = pos;
		if (timer){
			clearTimeout(timer);
		}

		if (counter < tileArray.length - 1){
			counter ++;
		}
		else {
			clearTimeout(timer);
			return false;
		}

		timer = setInterval(function(){
			if (mode == "front"){
				flipFront(tileArray[counter], imageArray[counter]);
			}
			else {
				flipBack(tileArray[counter], imageArray[counter]);
			}
			loadTile(tileArray, imageArray, mode, counter, timer);

		}, 1000);
	}	

	function flipFront(image, background){
		if (background){
			var back = image.getElementsByClassName("back")[0];
			back.style.backgroundImage = "url(" + background + ")";
		}
		image.classList.remove("rotateXX");
		image.classList.add("rotateX");
	}

	function flipBack(image, background){
		if (background){
			var front = image.getElementsByClassName("front")[0];
			front.style.backgroundImage = "url(" + background + ")";
		}
		image.classList.remove("rotateX");
		image.classList.add("rotateXX");
	}

}());



