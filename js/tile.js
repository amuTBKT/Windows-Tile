;(function($){

	var config;

	var defaults = {
		type: "single",
		delay: 1000
	}

	function Tile(element, options){
		config = $.extend({}, defaults, options);

		this.element = element;
		this.mode = [];
		this.tileArray = [];
		this.isSingle = true;
		this.timer = null;
		this.position = -1;
		
		this.tileArray = [];

		this.tileContentArray = [];

		this.init = function(){
			if (config.type == "multi"){
				var classArray = ["first", "second", "third", "fourth"];
				this.element.addClass('tile').addClass('multiple');
				this.isSingle = false;
				this.firstTileContent = [];this.secondTileContent = [];this.thirdTileContent = [];this.fourthTileContent = [];
				this.tileContentArray[0] = this.firstTileContent;this.tileContentArray[1] = this.secondTileContent;this.tileContentArray[2] = this.thirdTileContent;this.tileContentArray[3] = this.fourthTileContent;
			}
			else {
				var classArray = ["first"];
				this.element.addClass('tile').addClass('single');
				this.firstTileContent = [];
				this.tileContentArray[0] = this.firstTileContent;
			}

			var imageDiv = $('<div/>').addClass('image').appendTo(this.element);

			for (var i = 0; i < classArray.length; i++){
				var fig = $('<figure/>').addClass(classArray[i]).appendTo(imageDiv);
				var front = $('<div/>').addClass('front').appendTo(fig);
				var back = $('<div/>').addClass('back').appendTo(fig);
				this.mode[i] = "back";
				this.tileArray[i] = fig;
				this.tileContentArray[i][0] = front;
				this.tileContentArray[i][1] = back;
			}
		}

		this.setTiles = function(frontImage, backImage){
			for (var i = 0; i < this.tileContentArray.length; i++){
				if (frontImage){
					var front = this.tileContentArray[i][0];
					front.css('background-image', "url(" + frontImage[i] + ")");
				}

				if (backImage){
					var back = this.tileContentArray[i][1];
					back.css('background-image', "url(" + backImage[i] + ")");
				}
			}
		}

		this.loadTiles = function(imageArray){
			if (!this.isSingle){
				this.position = loadTiles(this.tileArray, this.tileContentArray, imageArray, this.mode, this.position, this.timer);
			}
			else {
				loadTiles(this.tileArray, this.tileContentArray, imageArray, this.mode, -1, this.timer);
			}
		}

		this.loadTile = function(tileNo, image, time){
			loadTile(this.tileArray[tileNo], image, this.mode, -1, this.timer, time);
		}
	}

	// for multi-image tile
	function loadTiles(tileArray, tileContentArray, imageArray, mode, pos, timer){
		var counter = pos;
		if (timer){
			clearTimeout(timer);
		}

		// for images more than tiles
		if (counter < imageArray.length - 1){
			counter++;
			mode[counter % tileArray.length] = flipMode(mode[counter % tileArray.length]);
			timer = setInterval(function(){
				if (mode[counter % tileArray.length] == "front"){
					flipFront(tileArray, tileContentArray, imageArray[counter], counter % tileArray.length);
				}
				else {
					flipBack(tileArray, tileContentArray, imageArray[counter], counter % tileArray.length);
				}

				loadTiles(tileArray, tileContentArray, imageArray, mode, counter, timer);
			}, config.delay);
		}

		else {
			clearTimeout(timer);
		}

		var position = (imageArray.length % tileArray.length) - 1;

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

	function flipFront(tileArray, tileContentArray, background, counter){
		if (background){
			var back = tileContentArray[counter][1];
			back.css('background-image', "url(" + background + ")");
		}
		tileArray[counter].removeClass("rotateXX");
		tileArray[counter].addClass("rotateX");
	}

	function flipBack(tileArray, tileContentArray, background, counter){
		if (background){
			var front = tileContentArray[counter][0];
			front.css('background-image', "url(" + background + ")");
		}
		tileArray[counter].removeClass("rotateX");
		tileArray[counter].addClass("rotateXX");
	}

	$.fn.initTile = function(options){
		tile = new Tile(this, options);
		tile.init();
		return this.first();
	};

	$.fn.setTile = function(frontImageArray, backImageArray){
		tile.setTiles(frontImageArray, backImageArray);
		return this.first();
	};

	$.fn.loadTile = function(imageArray){
		tile.loadTiles(imageArray);
		return this.first();
	};

}(jQuery));



