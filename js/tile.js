;(function($){

	var config;

	var defaults = {
		auto: true,
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
		this.animating = false;		
		this.tileArray = [];

		this.init = function(){
			if (config.auto){
				if (config.type == "multi"){
					var classArray = ["first", "second", "third", "fourth"];
					this.element.addClass('tile').addClass('multiple');
					this.isSingle = false;	
				}
				else {
					var classArray = ["first"];
					this.element.addClass('tile').addClass('single');
				}

				var imageDiv = $('<div/>').addClass('image').appendTo(this.element);
				for (var i = 0; i < classArray.length; i++){
					var fig = $('<figure/>').addClass(classArray[i]).appendTo(imageDiv);
					var front = $('<div/>').addClass('front').appendTo(fig);
					var back = $('<div/>').addClass('back').appendTo(fig);
					this.mode[i] = "back";
					this.tileArray[i] = fig;
				}
			}

			else{

			}

		}

		this.setTiles = function(frontImage, backImage){
			for (var i = 0; i < this.tileArray.length; i++){
				if (frontImage){
					var front = $(this.tileArray[i][0].getElementsByClassName('front'));
					front.css('background-image', "url(" + frontImage[i] + ")");
				}

				if (backImage){
					var back = $(this.tileArray[i][0].getElementsByClassName('back'));
					back.css('background-image', "url(" + backImage[i] + ")");
				}
			}
		}

		this.loadTiles = function(imageArray){
			//if (!this.isSingle){
			//	this.position = loadTiles(this.tileArray, imageArray, this.mode, this.position, this.timer);
			//}
			//else {
			loadTiles(this.tileArray, imageArray, this.mode, -1, this.timer);
			//}
		}

		this.loadTile = function(tileNo, image){
			var tempTileArray = [];
			tempTileArray[0] = this.tileArray[tileNo];
			loadTiles(tempTileArray, image, this.mode, -1, this.timer);
		}
	}

	// for multi-image tile
	function loadTiles(tileArray, imageArray, mode, pos, timer){
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
					flipFront(tileArray[counter % tileArray.length], imageArray[counter]);
				}
				else {
					flipBack(tileArray[counter % tileArray.length], imageArray[counter]);
				}

				loadTiles(tileArray, imageArray, mode, counter, timer);
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


	// plugin methods
	$.fn.initTile = function(options){
		tile = new Tile(this, options);
		tile.init();
		return this.first();
	};

	$.fn.setTile = function(frontImageArray, backImageArray){
		tile.setTiles(frontImageArray, backImageArray);
		return this.first();
	};

	$.fn.loadEntireTile = function(imageArray){
		tile.loadTiles(imageArray);
		return this.first();
	};

	$.fn.loadSingleTile = function(tileNo, imageArray){
		tile.loadTile(tileNo, imageArray);
	};

}(jQuery));



