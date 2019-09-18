document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        console.log("jump");
        toJump();
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

var trex = {y: 250, speedY: 0, gravity: 2, jump: 28, speedMax: 9, jumping: false};

function drawRex() {
    context.drawImage(imgRex,0,0,89,96,100,trex.y,50,50);
}

function toJump() {
    trex.jumping = true;
    trex.speedY = trex.jump;
}

function gravity() {
    if(trex.jumping == true) {
        if(trex.y > 250) {
            trex.jumping = false;
            trex.speedY = 0; // stop the speed
            trex.y = 250; // put the rex in the ground
        }
        trex.speedY -= trex.gravity;
        trex.y -= trex.speedY;
    }
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