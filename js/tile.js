(function(){

	var tileWidth = 200, tileHeight = 200;

	var tile = document.getElementsByClassName("tile multiple")[0];

	var tileS = document.getElementsByClassName("tile single")[0];

	var imageSArray = ["images/Tiles/tile1.png", "images/Tiles/tile2.png", 
						"images/Tiles/tile3.png", "images/Tiles/tile4.png", "images/Tiles/sTile.png"];

	var imageArray = ["images/Tiles/tile1.png", "images/Tiles/tile2.png", 
						"images/Tiles/tile3.png", "images/Tiles/tile4.png"];			


	var tileObject = new Tile(tile);
	tileObject.loadTiles(imageSArray);

	var tileObjectS = new Tile(tileS);
	tileObjectS.loadTiles(imageSArray);

	tileS.onclick = function(e){
		tileObjectS.loadTiles(imageSArray);
	}

	function Tile(tile){
		this.tile = tile;
		this.images = this.tile.getElementsByClassName("image")[0];
		this.imageFigure = this.images.getElementsByTagName('figure');

		this.firstImage = this.imageFigure[0];
		this.secondImage = this.imageFigure[1];
		if (this.secondImage != null){
			this.isSingle = false;
			this.thirdImage = this.imageFigure[2];
			this.fourthImage = this.imageFigure[3];
			this.tileArray = [this.firstImage, this.secondImage, this.thirdImage, this.fourthImage];
		}
		else {
			this.isSingle = true;
			this.tileArray = [this.firstImage];
		}

		this.mode = "back";
		this.timer = null;

		this.loadTiles = function(imageArray){
			if (!this.isSingle){
				this.mode = flipMode(this.mode);
				loadTiles(this.tileArray, imageArray, this.mode, -1, this.timer, 500 + 500 * (0.5 - 0.5 * Math.random()));
			}
			else {
				loadTile(this.tileArray, imageArray, this.mode, -1, this.timer, 500 + 500 * (0.5 - 0.5 * Math.random()));
			}
		}

		this.getTileArray = function(){
			return this.tileArray;
		}
	}

	function logg(message){
		console.log("" + message);
	}

	function loadTiles(tileArray, imageArray, mode, pos, timer, delay){
		var counter = pos;
		if (timer){
			clearTimeout(timer);
		}

		if (counter < tileArray.length - 1){
			counter ++;

			timer = setInterval(function(){
				if (mode == "front"){
					flipFront(tileArray[counter], imageArray[counter]);
				}
				else {
					flipBack(tileArray[counter], imageArray[counter]);
				}
				loadTiles(tileArray, imageArray, mode, counter, timer, 2500 + 500 * (0.5 - 0.5 * Math.random()));
			}, delay);

		}

		else if (counter < imageArray.length - 1){
			counter++;
			timer = setInterval(function(){
				mode = flipMode(mode);
				if (mode == "front"){
					flipFront(tileArray[imageArray.length - counter - 1], imageArray[counter]);
				}
				else {
					flipBack(tileArray[imageArray.length - counter - 1], imageArray[counter]);
				}
				loadTiles(tileArray, imageArray, mode, counter, timer, 2500 + 500 * (0.5 - 0.5 * Math.random()));
			}, delay);
		}

		else {
			clearTimeout(timer);
			return false;
		}
	}

	function loadTile(tileArray, imageArray, mode, pos, timer, delay){
		var counter = pos;
		if (timer){
			clearTimeout(timer);
		}

		if (counter < imageArray.length - 1){
			counter ++;
		}
		else {
			clearTimeout(timer);
			return false;
		}

		mode = flipMode(mode);

		timer = setInterval(function(){
			if (mode == "front"){
				flipFront(tileArray[0], imageArray[counter]);
			}
			else {
				flipBack(tileArray[0], imageArray[counter]);
			}
			loadTile(tileArray, imageArray, mode, counter, timer, 2500 + 500 * (0.5 - 0.5 * Math.random()));

		}, delay);
	}	

	function flipMode(mode){
		if (mode == "back"){
			mode = "front";
		}
		else {
			mode = "back";
		}
		return mode;
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



