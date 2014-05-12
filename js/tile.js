;(function($){

	var defaults = {
		auto: true,
		type: "single",
		text: "Tile",
		delay: 1000
	};

	function Tile(element, options){
		this.config = $.extend({}, defaults, options);
		this.element = $(element);
		this.mode = [];
		this.tileArray = [];
		this.isSingle = true;
		this.timer = null;
		this.position = -1;
		this.tileArray = [];
		this.animationTimer;
		this.animate = true;

		this.init();
	}

	Tile.prototype.init = function(){
		if (this.config.auto){
			if (this.config.type == "multi"){
				var classArray = ["first", "second", "third", "fourth"];
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
			$('<p/>', {text: this.config.text}).appendTo(titleDiv);
		}
		/*else{
			var htmlEl = $(element).first().find('tile');
			console.log($(htmlEl));
			var imageNode = htmlEl.getElementsByClassName("image")[0];
			var figureNode = imageNode.getElementsByTagName('figure');
			for (i = 0; i < figureNode.length; i++){
				tileArray[i] = figureNode[i];
				this.mode[i] = "back";
			}
		}*/
	};

	Tile.prototype.setTiles = function(frontImage, backImage){
		this.animate = false;
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

	Tile.prototype.loadTiles = function(imageArray){
		this.animate = true;
		this.position = loadTiles(this.tileArray, imageArray, this.mode, this.position, this.timer);
	};

	Tile.prototype.loadTile = function(tileNo, image){
		this.animate = true;
		var tempTileArray = [];
		tempTileArray[0] = this.tileArray[tileNo];
		loadTiles(tempTileArray, image, this.mode, -1, this.timer);
	};

	Tile.prototype.stopAnimation = function(){
		this.animate = false;
		clearTimeout(this.animationTimer);
	};

	function loadTiles(tileArray, imageArray, mode, pos, timer){
		var counter = pos;
		if (timer){
			clearTimeout(timer);
		}

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
			}, 2000);
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

	//////////////// plugin methods ////////////////

	$.fn.initTile = function(options){
		return this.each(function(){
			var tile = new Tile(this, options);

			$(this).click(
				function() {
          		var img2 = ["images/sstile0.png", "images/sstile1.png", "images/sstile2.png", "images/sstile3.png"];
          	 	tile.loadTiles(img2, null);
          	});

		});
	};

	/*$.fn.setTile = function(frontImageArray, backImageArray){
		tile.setTiles(frontImageArray, backImageArray);
		return this.first();
	};

	$.fn.loadEntireTile = function(imageArray){
		if (imageArray) tile.loadTiles(imageArray);
		return this.first();
	};

	$.fn.loadSingleTile = function(tileNo, imageArray){
		if (tileNo > -1 && imageArray) tile.loadTile(tileNo, imageArray);
		return this.first();
	};

	$.fn.stopAnimation = function(){
		tile.stopAnimation();
		return this.first();
	};

	$.fn.logg = function(){
		console.log(tile.tileArray.length);
		return this.first();
	};*/

	////////////////////////////////////////////////

}(jQuery));



