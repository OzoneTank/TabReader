var tabs;
var colors = [
	[255, 0, 0],//red
	[255, 255, 0],//yellow
	[0, 0, 255],//blue
	[255, 128, 0],//orange
	[0, 255, 0],//green
	[255, 0, 255]//purple
	];
var currentTab = 0;
var ctx;
var stringHeight = 10;
var stringWidth = 20;
var canvasW;
var canvasH;
function init() {
	var c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	canvasW = $('#myCanvas').width();
	canvasH = $('#myCanvas').height(); 
}
function formatData() {
	var tabText = $('#textToLoad').val();
	tabs = [[], [], [], [], [], []];
	var musicString = 0;
	var inMusic = false;
	var possibleSheet = [];
	for (var i = 0; i < tabText.length; i++) {
		var curr = tabText.charAt(i);
		if (!inMusic) {
			if (curr === '-') {
				inMusic = true;
				possibleSheet.push('-');
			}
		} else {
			if (curr === '\n' || curr === '\r' || curr === ' ') {
				possibleSheet = [];
				inMusic = false;
			} else if (curr === '|') {
				tabs[musicString] = tabs[musicString].concat(possibleSheet);
				inMusic = false;
				musicString++;
				if (musicString >= 6) {
					musicString = 0;
				}
				possibleSheet = [];
			} else {
				possibleSheet.push(curr);
			}
		}
	}
	tabs.reverse();
	clearScreen();
	drawTab(0);
}

function nextTab(next) {
	if (next === undefined) {
		next = true;
	}
	if (next) {
		currentTab++;
	} else {
		currentTab--;
	}
	if (currentTab < 0) {
		currentTab = tabs[0].length - 1;
	} else if (currentTab >= tabs[0].length) {
		currentTab = 0;
	}
	clearScreen();
	drawTab(0);
}

function clearScreen () {
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillRect(0, 0, canvasW, canvasH);
}

function drawTab(away) {
	if (currentTab + away >= tabs[0].length) {
		return;
	}
	var alpha = 1;
	ctx.fillStyle = 'rgba(128, 128, 128,' + alpha * 0.5 + ')';
	ctx.fillRect(0, 0, canvasW, stringHeight * 6);
	for (var i = 0; i < 6; i++) {
		ctx.fillStyle = 'rgba(' + colors[i][0] + ',' + colors[i][1] + ',' + colors[i][2] + ',' + alpha + ')';
		var num = parseInt(tabs[i][currentTab + away], 10);
		if (num !== NaN) {
			var x = (num-1) * stringWidth;
			var y = i * stringHeight;
			var w = stringWidth;
			var h = stringHeight;
			if (num === 0) {
				w = canvasW;
				y += stringHeight / 4;
				h = stringHeight / 2;
			}
			ctx.fillRect(x, i * stringHeight, w, stringHeight);
		}
		ctx.fillStyle = 'rgba(128, 128, 128,' + alpha * 1 + ')';
		ctx.fillRect(0, i * stringHeight, canvasW, 1);
	}
	for (var i = 0; i < 20; i++) {
		ctx.fillStyle = 'rgba(128, 128, 128,' + alpha * 1 + ')';
		ctx.fillRect(i * stringWidth, 0, 1, stringHeight*6);
	}
}

$(document).ready(function(){
  init();
});
