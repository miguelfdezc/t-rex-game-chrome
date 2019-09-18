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

var ground = 200;
var trex = {y: ground, speedY: 0, gravity: 2, jump: 28, speedMax: 9, jumping: false};
var level = {speed: 9, points: 0};
var cactus = {x: width + 100, y: ground-25};
var cloud = {x: 400, y: 100};

function drawRex() {
    context.drawImage(imgRex,0,0,89,96,100,trex.y,50,50);
}

function toJump() {
    trex.jumping = true;
    trex.speedY = trex.jump;
}

function gravity() {
    if(trex.jumping == true) {
        if(trex.y - trex.speedY - trex.gravity > ground) {
            trex.jumping = false;
            trex.speedY = 0; // stop the speed
            trex.y = ground; // put the rex in the ground
        }
        trex.speedY -= trex.gravity;
        trex.y -= trex.speedY;
    }
}
// ---------------------------------------------------------
function drawCactus() {
    context.drawImage(imgCactus,0,0,51,102,cactus.x,cactus.y,38,75);
}

function logicCactus() {
    if(cactus.x < -100) {
        cactus.x = width + 100;
    } else {
        cactus.x -= level.speed;
    }
}
// ---------------------------------------------------------
function logicCloud() {
    if(cloud.x < -100) {
        cloud.x = width + 100;
    } else {
        cloud.x -= 2;
    }
}

function drawCloud() {
    context.drawImage(imgCloud,0,0,95,35,cloud.x,cloud.y,82,31);
}
// ---------------------------------------------------------
// Main loop
var FPS = 50;
setInterval(function() {
    main();
},1000/FPS);

function main() {
    clearCanvas();
    gravity();
    logicCactus();
    logicCloud();
    drawCactus();
    drawCloud();
    drawRex();
}