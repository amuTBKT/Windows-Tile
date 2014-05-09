function moveIcon(icon, x, y){
		var time = 0.1;
		var mTimer = setInterval(function(){
			move(icon, x, y, time, mTimer);
		}, 0.001);
	}

	function move(icon, finalX, finalY, time, timer){
		console.log('move');
		var step = Math.max(Math.abs(parseInt(icon.style.left) - finalX), Math.abs(parseInt(icon.style.top) - finalY)) * time;

		if (parseInt(icon.style.left) > finalX){
			icon.style.left = parseInt(icon.style.left) - step + 'px';	
		}
		else {
			icon.style.left = parseInt(icon.style.left) + step + 'px';
		}

		if (parseInt(icon.style.top) > finalY){
			icon.style.top = parseInt(icon.style.top) - step + 'px';	
		}
		else {
			icon.style.top = parseInt(icon.style.top) + step + 'px';
		}

		if (Math.abs(parseInt(icon.style.left) - finalX) < 5 && Math.abs(parseInt(icon.style.top) - finalY) < 5){
			icon.style.left = finalX + 'px';
			icon.style.top = finalY + 'px';
			clearTimeout(timer);
		}
	}