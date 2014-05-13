;(function($){

	// default configutrations
	var defaults = {
		auto: true,
		type: "single",
		text: "Tile",
		animDelay: 1000
	};

	// objects cotrolling all the functionality
	function Tile(element, options){
		this.config = $.extend({}, defaults, options);
		this.element = $(element);
		this.mode = [];
		this.tileArray = [];
		this.isSingle = true;
		this.interval = null;
		this.startPosition = -1;
		this.tileArray = [];  							// contains all the <figure/> nodes present in our layout
		this.init();
	}

	// initializing the object (occurs each time the plugin method is called)
	Tile.prototype.init = function(){
		if (this.config.auto){
			if (this.config.type == "multi"){
				var classArray = ["first", "second", "third", "fourth"];    // for more than 4 image tile customize this according to the changes in tile.css
				this.element.addClass('tile').addClass('multiple');
				this.isSingle = false;
			}
			else {
				var classArray = ["first"];
				this.element.addClass('tile').addClass('single');
			}
			
			var imageDiv = $('<div/>').addClass('image').appendTo(this.element);
			var i;
			for (i = 0; i < classArray.length; i++){
				var fig = $('<figure/>').addClass(classArray[i]).appendTo(imageDiv);
				var front = $('<div/>').addClass('front').appendTo(fig);
				var back = $('<div/>').addClass('back').appendTo(fig);
				this.mode[i] = "back";
				this.tileArray[i] = fig;
			}
			var titleDiv = $('<div/>').addClass('title').appendTo(this.element);
			var title = $('<p/>', {text: this.config.text}).appendTo(titleDiv);
		}
		else{
			var htmlEl = this.element[0];
			var imageNode = htmlEl.getElementsByClassName("image")[0];
			var figureNode = imageNode.getElementsByTagName('figure');
			for (i = 0; i < figureNode.length; i++){
				this.tileArray[i] = $(figureNode[i]);
				this.mode[i] = "back";
				if (i > 0){
					this.isSingle = false;
				}
			}
			var titleNode = htmlEl.getElementsByClassName("title")[0];
			var title = titleNode.getElementsByTagName('p')[0];
			title.innerHTML = this.config.text;
		}
	};

	/*
	*
	*@param frontImage image for front tile
	*@param backImage image for back tile
	*/
	Tile.prototype.setTiles = function(frontImage, backImage){
		var i;
		for (i = 0; i < this.tileArray.length; i++){
			if (frontImage){
				var front = $(this.tileArray[i][0].getElementsByClassName('front'));
				front.css('background-image', "url(" + frontImage[i] + ")");
			}

			if (backImage){
				var back = $(this.tileArray[i][0].getElementsByClassName('back'));
				back.css('background-image', "url(" + backImage[i] + ")");
			}
		}
	};

	/*
	*@param imageArray array of images to be loaded on the tile
	*/
	Tile.prototype.loadTiles = function(imageArray){
		this.startPosition = loadTiles(this.tileArray, imageArray, this.mode, this.startPosition, this.interval, this.config.animDelay);
	};

	/*
	*@param tileNo which tile to load image on
	*/
	Tile.prototype.loadTile = function(tileNo, image){
		var tempTileArray = [];				// array storing the tile on which method is called  
		tempTileArray[0] = this.tileArray[Math.min(tileNo, this.tileArray.length)];
		if (!this.isSingle){
			loadTiles(tempTileArray, image, this.mode, -1, this.interval, this.config.animDelay);
		}
		else {
			loadTiles(this.tileArray, image, this.mode, this.startPosition, this.interval, this.config.animDelay);
		}
	};

	function loadTiles(tileArray, imageArray, mode, pos, interval, animDelay){
		var counter = pos;
		if (interval){
			clearTimeout(interval);
		}

		if (imageArray && counter < imageArray.length - 1){
			counter++;
			mode[counter % tileArray.length] = flipMode(mode[counter % tileArray.length]);
			interval = setInterval(function(){
				if (mode[counter % tileArray.length] == "front"){
					flipFront(tileArray[counter % tileArray.length], imageArray[counter]);
				}
				else {
					flipBack(tileArray[counter % tileArray.length], imageArray[counter]);
				}

				loadTiles(tileArray, imageArray, mode, counter, interval, animDelay);
			}, animDelay);
		}

		else if (!imageArray && counter < tileArray.length - 1){
			counter++;
			interval = setInterval(function(){
				if (mode[counter] == "front"){
					flipFront(tileArray[counter], null);
				}
				else {
					flipBack(tileArray[counter], null);
				}

				loadTiles(tileArray, imageArray, mode, counter, interval, animDelay);
			}, animDelay);
		}

		else {
			clearTimeout(interval);
		}

		var position = (imageArray?((imageArray.length % tileArray.length) - 1):-1);

		return position;
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

	function flipFront(tile, background){
		if (background){
			var back = $(tile[0].getElementsByClassName('back'));
			back.css('background-image', "url(" + background + ")");
		}
		tile.removeClass("rotateXX");
		tile.addClass("rotateX");
	}

	function flipBack(tile, background){
		if (background){
			var front = $(tile[0].getElementsByClassName('front'));
			front.css('background-image', "url(" + background + ")");
		}
		tile.removeClass("rotateX");
		tile.addClass("rotateXX");
	}

	//////////////// plugin methods ////////////////

	// to load the image on front and back of the tile without animation
	$.fn.setTile = function(options, frontImageArray, backImageArray){
		return this.each(function(){
			var tile = new Tile(this, options);
          	tile.setTiles(frontImageArray, backImageArray);
		});
	};

	// to load images in given imageArray
	$.fn.loadEntireTile = function(options, imageArray){
		return this.each(function(){
			var tile = new Tile(this, options);
			tile.loadTiles(imageArray);
		});
	};

	// to load image on a give tile number
	$.fn.loadSingleTile = function(options, tileNo, imageArray){
		return this.each(function(){
			var tile = new Tile(this, options);
			if (tileNo > -1 && imageArray) tile.loadTile(tileNo, imageArray);
		});
	};

	// if images in imageArray is more than number of tiles in tileArray then animation will play for all the images in imageArray

	////////////////////////////////////////////////

}(jQuery));



