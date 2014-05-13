#Windows tiles
simple to use windows tile animations for your website

## Usage:
include the plugin as:
````html
<!-- js scripts -->
<script language="text/javascript" src="jquery.js">
<script language="text/javascript" src="tile.js">

<!-- css script -->
<link rel="stylesheet" type="text/css" href="tile.css">
````

````javascript
$('element').setTile(options, frontImageArray, backImageArray); to set the front and back of the tile

$('element').loadEntireTile(options, imageArray); // to load the images in imageArray along with animations
                                         // imageArray = null for just flipping the tiles
                                         
$('element').loadSingleTile(options, tileNumber, imageArray); // to load a single tile

// default configuration:
var defaults = {
	auto: true,
	type: "single",
	text: "Tile",
	animDelay: 1000
};
````

### using auto generate feature:
````html
<div id="autoTile" style="width:200px; height:200px; top:10px; left:10px;">  <!-- style is customizable -->
````

````javascript
// auto = true is default configuration 
$('#autoTile').setTile({type:"multi", auto:true, text:"Auto Tile", animDelay:2000}, frontImageArray, backImageArray);
// type = "multi" for 4 image tile
// type = "single" for 1 image tile
````


### using our own layout (instead of auto generate):
````html
<div id="customTile" style="width:200px; height:200px; top:10px; left:10px;">  <!-- style is customizable -->
  	<div class="image">
		<figure class="first">
			<div class="front"> "your custom layout here" </div>
			<div class="back"> "your custom layout here" </div>
		</figure>
		<figure class="second">
			<div class="front"> "your custom layout here" </div>
			<div class="back"> "your custom layout here" </div>
		</figure>
		<figure class="third">
			<div class="front"> "your custom layout here" </div>
			<div class="back"> "your custom layout here" </div>
		</figure>
		<figure class="fourth">	
			<div class="front"> "your custom layout here" </div>
			<div class="back"> "your custom layout here" </div>
		</figure>
	</div>	
	<div class="title"><p>Tile</p></div>
</div>
````

````javascript
// setting auto = false is necessary
$('#customTile').loadEntireTile({auto:false, text:"Custom Tile", animDelay:1000}, null); // null to just flip the tiles
````

## Further customization:
tile.css can be further customized for using any number of image tiles
and accordingly changes can be made in tile.jss for using more images for tile

## Future improvements
a php script can be attached to split a image into 4 image to pass as imageArray giving windows tile like animation similar to that of loading a persons image


## Bugs:
*after using the plugin methods on an element it is necessary to set "auto = false" when using other methods on the same element
*intervals have to be used for subsequent loading of images before completion of current animation and would otherwise
try to ovveride the current animation and both would occur simultaneously
