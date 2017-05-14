var h = 572
var w = 1024
var issX = -50;
var issY = -50;
var lat = 0;
var long = 0;
var onHover;
var radius = 10;

var url = "http://api.open-notify.org/iss-now.json"
var apiHead = "https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,0/" + w + "x" + h +"@2x?access_token="
var mapAPI = "pk.eyJ1IjoiYWRpdHlhdGhlYmUiLCJhIjoiY2oxaTE3MXBtMDAwdjMzdXg0aGd0ZW1oYiJ9.H488o09cPUAfxZC8rPqjug";
var apiURL = apiHead + mapAPI;

function preload() {
	bg = loadImage(apiURL);
}

function setup() {
	createCanvas(w, h);
	setInterval(getData, 1000 * 5);
	textAlign(CENTER);
	fill('#D33257');
}

function draw() {
	background(bg);
	ellipse(issX, issY, radius, radius);
	noFill();
	stroke(255);
	ellipse(issX, issY, radius * 2, radius * 2);
	onHover();
}

function gotData(data) {
	lat = parseFloat(data.iss_position.latitude);
	long = parseFloat(data.iss_position.longitude);
	issX = (width/360) * (180 + long);
	issY = (height/180) * (90 - lat);
}

function getData() {
	loadJSON(url, gotData);
}

onHover = function() {
	var distance = dist(issX, issY, mouseX, mouseY);
	if(distance <= radius/2) {
		val = long + ', ' + lat;
		text(val, issX, issY - radius);
	}		
}
