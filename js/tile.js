(function(){

	var tileWidth = 200, tileHeight = 200;

	var tile = document.getElementsByClassName("tile multiple")[0];

	var tileS = document.getElementsByClassName("tile single")[0];

	var imageSArray = ["images/Tiles/stile.png", "images/Tiles/sstile.png"];
	var imageSSArray = ["images/Tiles/sstile0.png", "images/Tiles/sstile1.png", 
						"images/Tiles/sstile2.png", "images/Tiles/sstile3.png", "images/Tiles/sstile.png"];

	var imageArray = ["images/Tiles/tile1.png", "images/Tiles/tile2.png", "images/Tiles/tile3.png", "images/Tiles/tile4.png"];

	var imageSMArray = ["images/Tiles/sstile0.png", "images/Tiles/sstile1.png", "images/Tiles/sstile2.png", "images/Tiles/sstile3.png"];

	var tileObject = new Tile(tile);
	tileObject.loadTiles(imageArray);

	var tileObjectS = new Tile(tileS);
	tileObjectS.loadTiles(imageSArray);

	tileS.onclick = function(e){
		tileObjectS.loadTiles(imageSSArray);
		tileObject.loadTiles(imageSMArray);
	}

	function Tile(tile){
		this.tile = tile;
		this.images = this.tile.getElementsByClassName("image")[0];
		this.imageFigure = this.images.getElementsByTagName('figure');

		this.mode = [];

		this.firstImage = this.imageFigure[0];
		this.secondImage = this.imageFigure[1];
		if (this.secondImage != null){
			this.isSingle = false;
			this.thirdImage = this.imageFigure[2];
			this.fourthImage = this.imageFigure[3];
			this.tileArray = [this.firstImage, this.secondImage, this.thirdImage, this.fourthImage];
			this.mode[0] = "back";
			this.mode[1] = "back";
			this.mode[2] = "back";
			this.mode[3] = "back";
		}
		else {
			this.isSingle = true;
			this.mode[0] = "back";
			this.tileArray = [this.firstImage];
		}

		this.timer = null;
		this.position = -1;

		this.loadTiles = function(imageArray){
			if (!this.isSingle){
				this.position = loadTiles(this.tileArray, imageArray, this.mode, this.position, this.timer, 500 + 500 * (0.5 - 0.5 * Math.random()));
			}
			else {
				loadTile(this.tileArray[0], imageArray, this.mode, -1, this.timer, 500 + 500 * (0.5 - 0.5 * Math.random()));
			}
		}

		this.loadTile = function(tileNo, image, time){
			loadTile(this.tileArray[tileNo], image, this.mode, -1, this.timer, time);
		}

		this.getTileArray = function(){
			return this.tileArray;
		}
	}

	function logg(message){
		console.log("" + message);
	}

	// for multi-image tile
	function loadTiles(tileArray, imageArray, mode, pos, timer, delay){
		var counter = pos;
		if (timer){
			clearTimeout(timer);
		}

		if (counter < tileArray.length - 1){
			counter ++;
			mode[counter] = flipMode(mode[counter]);
			timer = setInterval(function(){
				if (mode[counter] == "front"){
					flipFront(tileArray[counter], imageArray[counter]);
				}
				else {
					flipBack(tileArray[counter], imageArray[counter]);
				}

				loadTiles(tileArray, imageArray, mode, counter, timer, 2500 + 500 * (0.5 - 0.5 * Math.random()));
			}, delay);
		}

		// for images more than tiles
		else if (counter < imageArray.length - 1){
			counter++;
			mode[counter % tileArray.length] = flipMode(mode[counter % tileArray.length]);
			timer = setInterval(function(){
				if (mode[counter % tileArray.length] == "front"){
					flipFront(tileArray[counter % tileArray.length], imageArray[counter]);
				}
				else {
					flipBack(tileArray[counter % tileArray.length], imageArray[counter]);
				}

				loadTiles(tileArray, imageArray, mode, counter, timer, 2500 + 500 * (0.5 - 0.5 * Math.random()));
			}, delay);
		}

		else {
			clearTimeout(timer);
		}

		var position = (imageArray.length % tileArray.length) - 1;

		return position;
	}

	// for single image tile
	function loadTile(tile, imageArray, mode, pos, timer, delay){
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

		mode[0] = flipMode(mode[0]);

		timer = setInterval(function(){
			if (mode[0] == "front"){
				flipFront(tile, imageArray[counter]);
			}
			else {
				flipBack(tile, imageArray[counter]);
			}
			loadTile(tile, imageArray, mode, counter, timer, 2500 + 500 * (0.5 - 0.5 * Math.random()));

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

	function flipFront(imageTile, background){
		if (background){
			var back = imageTile.getElementsByClassName("back")[0];
			back.style.backgroundImage = "url(" + background + ")";
		}
		imageTile.classList.remove("rotateXX");
		imageTile.classList.add("rotateX");
	}

	function flipBack(imageTile, background){
		if (background){
			var front = imageTile.getElementsByClassName("front")[0];
			front.style.backgroundImage = "url(" + background + ")";
		}
		imageTile.classList.remove("rotateX");
		imageTile.classList.add("rotateXX");
	}

}());



