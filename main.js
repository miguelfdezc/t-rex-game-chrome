document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        console.log("jump");
    }
})

var imgRex, imgCloud, imgCactus, imgGround;

function loadImages() {
    imgCactus = new Image();
    imgCloud = new Image();
    imgGround = new Image();
    imgRex = new Image();

    imgCactus.src = 'img/cactus.png';
    imgCloud.src = 'img/cloud.png';
    imgGround.src = 'img/ground.png';
    imgRex.src = 'img/rex.png';
}

var width = 700;
var height = 300;

var canvas, context;

function initialize() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    loadImages();
};



function clearCanvas() {
    canvas.width = width;
    canvas.height = height;
}

function drawRex() {
    context.drawImage(imgRex,0,0,89,96,100,100,50,50);
}

function gravity() {

}

// ------------------------------------------------------
// Main loop
var FPS = 10;
setInterval(function() {
    main();
},1000/10);




function main() {
    clearCanvas();
    gravity();
    drawRex();
}