(function(){

	// variables
	var dx = 0, dy = 0;
	var gapH, gapV;

	// current icon
	var currentIcon, icons;
	var counter = 0, touch = false, jiggleDelay = 70, timer;

	// variables for positioning of icons
	var stageX = window.innerWidth, stageY = window.innerHeight, iconWidth = 120, iconHeight = 150, rows = 9, cols = 10,counterX, counterY;

	// variables for moving and auto adjusting icons
	var initialPosX, initialPosY, newPositionX, newPositionY;

	var grid = document.getElementById("grid");
		 
	init();

	window.onresize = function(){
		resizeLayout();
	};

	function init(){
		gapH = (stageX - iconWidth * rows) / 10;
		gapV = (stageY - iconHeight * 2) / cols;


		// storing all the icons in icons list
		icons = grid.getElementsByClassName("icon");

		for (var i = 0; i < icons.length; i++){
			// setting the position of icons
			if (i < rows){
				var posX = gapH + i * (iconWidth + gapH);
				var posY = gapV;
			}
			else {
				var posX = gapH + (i - rows) * (iconWidth + gapH);
				var posY = gapV + iconHeight + gapV;	
			}
			icons[i].style.left = posX + 'px';
			icons[i].style.top = posY + 'px';

			// changing background of div dynamically
			var image = icons[i].getElementsByClassName("image")[0];
			var title = icons[i].getElementsByClassName("title")[0];
			
			// toggle notification banner
			var notificationBanner = icons[i].getElementsByClassName("banner")[0];
			if (notificationBanner){
				var notification = (notificationBanner.getElementsByTagName('p')[0].innerHTML).trim();
				if (notification > 0){
					icons[i].getElementsByClassName("banner")[0].style.visibility = 'visible';
				}
			}

			var imageSrc = "file:///D:/Web%20Projects/iOS%20Icon%20Plugin/images/" + (title.getElementsByTagName('p')[0].innerHTML).trim() + "_icon.png";
			image.style.backgroundImage = "url(" + imageSrc + ")";
			image.style.backgroundSize = '100% 100%';

			image.addEventListener('mousedown', onMouseDown);
		}
	}


	// change display settings of unselected icons --------
	function addPropertyToIcons(className){
		for (var i = 0; i < icons.length; i++){
			icons[i].classList.add(className);
			toggleDeleteBanner(icons[i]);
		}
	}

	// hide/show delete option
	function toggleDeleteBanner(icon){
		var deleteDiv = icon.getElementsByClassName("delete")[0];
		if (deleteDiv){
			if (deleteDiv.style.visibility == 'visible'){
				if (counter == 0){
					deleteDiv.style.visibility = 'hidden';
					deleteDiv.classList.remove("toggleDelete");
				}
			}
			else {
				deleteDiv.style.visibility = 'visible';
				deleteDiv.classList.add("toggleDelete");
			}
		}
	}

	function removePropertyFromIcons(className){
		for (var i = 0; i < icons.length; i++){
			icons[i].classList.remove(className);
			toggleDeleteBanner(icons[i]);
		}
	}

	function setTouches(){
		//console.log(initialPosX + ", " + initialPosY);
		addPropertyToIcons('jiggle');
		currentIcon.classList.remove('jiggle');
		currentIcon.classList.add('selected');
		addEventListener('mousemove', onMouseMove);
	}
	// ----------------------------------------------------

	// mouse events----------------------------------------
	function onMouseDown(e){
		touch = true;
		currentIcon = this.parentNode;

		// to calculate cursor offset
		dx = e.clientX - parseInt(currentIcon.offsetLeft);
		dy = e.clientY - parseInt(currentIcon.offsetTop);

		initialPosX = getCurrentIconPosX();
		initialPosY = getCurrentIconPosY();

		// when to start jiggling
		timer = setInterval(startCounting, 1000 / 100);

		// changing display settings of selected icon
		currentIcon.classList.remove('jiggle');
		currentIcon.classList.add('touch');

		addEventListener('mouseup', onMouseUp);
		addEventListener('keyup', checkKeyUp, false);
	}

	function onMouseMove(e){
		currentIcon.style.left = e.clientX - dx + 'px';
		currentIcon.style.top = e.clientY - dy + 'px';
	}

	function onMouseUp () {
		clearTimeout(timer);
		currentIcon.classList.remove('touch');
		if (counter > jiggleDelay){
			currentIcon.classList.remove('selected');
			currentIcon.classList.add('jiggle');
			autoArrange();
		}
		else{
			counter = 0;
			// set functioning here
			//window.location.assign('https://google.com');
		}
		removeEventListener('mousemove', onMouseMove);
		removeEventListener('mouseup', onMouseUp);
	}

	function checkKeyUp (e) {
		var keyId = (e.keycode) ? e.keycode : e.which;
		if (keyId == 27){
			e.preventDefault();
			exitEditMode();
		}
	}

	function exitEditMode(){
		touch = false;
		counter = 0;

		currentIcon.classList.remove('touch');
		removePropertyFromIcons('jiggle');

		removeEventListener('keyup', checkKeyUp, false);
	}

	function autoArrange(){
		newPositionX = getCurrentIconPosX();
		newPositionY = getCurrentIconPosY();

		var dX = Math.abs(newPositionX - initialPosX);
		var dY = Math.abs(newPositionY - initialPosY);

		if (dX > iconWidth + gapH && dY < gapV){
			if (dY < iconHeight + gapV){
				if (newPositionX < initialPosX){
					moveRowRight(getRoundOffX(), initialPosX, initialPosY);
				}
				else {
					moveRowLeft(getRoundOffX(), initialPosX, initialPosY);
				}
			}

			moveIcon(currentIcon, getRoundOffX(), getRoundOffY());
		}
		
		else if (dY > iconHeight && dX > gapH / 2){
			if (newPositionY < initialPosY){
				moveRowRight(gapH, initialPosX, initialPosY);
				shiftRowRight(getRoundOffX());
			}
			else {
				moveRowLeft(stageX, initialPosX, initialPosY);
				shiftRowLeft(getRoundOffX());
			}

			moveIcon(currentIcon, getRoundOffX(), getRoundOffY());
		}
		
		else {
			moveIcon(currentIcon, initialPosX, initialPosY);
		}
	}

	function shiftRowLeft(fromX){
		for (var i = 0; i < icons.length; i++){
			if (icons[i] != currentIcon){
				if (parseInt(icons[i].style.left) <= fromX && Math.abs(parseInt(icons[i].style.top) - getRoundOffY()) < 2){
					icons[i].style.left = moveIcon(icons[i], parseInt(icons[i].style.left) - gapH - iconWidth, getRoundOffY());
				}

				if (parseInt(icons[i].style.left) <= 0){
					moveIcon(icons[i], gapH + (rows - 1) * (iconWidth + gapH), parseInt(icons[i].style.top) - gapV - iconHeight);
				}
			}			
		}
	}

	function shiftRowRight(fromX){
		for (var i = 0; i < icons.length; i++){
			if (icons[i] != currentIcon){
				if (parseInt(icons[i].style.left) >= fromX && Math.abs(parseInt(icons[i].style.top) - getRoundOffY()) < 2){
					icons[i].style.left = moveIcon(icons[i], parseInt(icons[i].style.left) + gapH + iconWidth, getRoundOffY());
				}

				if (parseInt(icons[i].style.left) + iconWidth >= stageX){
					moveIcon(icons[i], gapH, parseInt(icons[i].style.top) + gapV + iconHeight);
				}
			}
		}
	}

	function moveRowLeft(fromX, toX, whichY){
		for (var i = 0; i < icons.length; i++){
			if (icons[i] != currentIcon){
				if (parseInt(icons[i].style.left) <= fromX && parseInt(icons[i].style.left) > toX && Math.abs(parseInt(icons[i].style.top) - whichY) < 2){
					icons[i].style.left = moveIcon(icons[i], parseInt(icons[i].style.left) - gapH - iconWidth, whichY);
				}
			}			
		}
	}

	function moveRowRight(fromX, toX, whichY){
		for (var i = 0; i < icons.length; i++){
			if (icons[i] != currentIcon){
				if (parseInt(icons[i].style.left) >= fromX && parseInt(icons[i].style.left) < toX && Math.abs(parseInt(icons[i].style.top) - whichY) < 2){
					icons[i].style.left = moveIcon(icons[i], parseInt(icons[i].style.left) + gapH + iconWidth, whichY);
				}
			}			
		}
	}

	function moveIcon(icon, x, y){
		icon.style.left = x + 'px';
		icon.style.top = y + 'px';
	}
	// ----------------------------------------------------


	function startCounting () {
		if (touch){
			counter += 1;
		}
		if (counter > jiggleDelay){
			setTouches();
		}
	}

	function resizeLayout(){
		stageX = window.innerWidth;
		stageY = window.innerHeight;
	}

	function getCurrentIconPosX(){
		return parseInt(currentIcon.style.left);
	}

	function getCurrentIconPosY(){
		return parseInt(currentIcon.style.top);
	}

	function getRoundOffX(){
		var diff = Math.min(newPositionX / (iconWidth + gapH), rows - 1);
		return Math.max(gapH * (1 + Math.floor(diff)) + Math.floor(diff) * iconWidth, gapH);
	}

	function getRoundOffY(){
		var diff = Math.max(newPositionY / (iconHeight + gapV), 0);
		return gapV * (1 + Math.floor(diff)) + Math.floor(diff) * iconHeight;
	}

}());