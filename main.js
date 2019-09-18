// Sets a 'keydown' event to the document (jump or restart)
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        if(level.dead == false)
            toJump(); // make the t-rex jump
        else {
          	// reset the default config
            cloud.x = width + 100;
            cloud.speed = 1;
            cactus.x = width + 100;
            level.speed = 9;
            level.points = 0;
            level.dead = false;
        }
    }
});

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
}

function clearCanvas() {
    canvas.width = width;
    canvas.height = height;
}

var bottom = 200;
var trex = {y: bottom, speed: 0, gravity: 2, jump: 28, speedMax: 9, jumping: false};
var level = {speed: 9, points: 0, dead: false};
var cactus = {x: width + 100, y: bottom-25};
var cloud = {x: 400, y: 100, speed: 1};
var ground = {x: 0, y: bottom + 30};

// -------------------------T-REX---------------------------
function drawRex() {
    context.drawImage(imgRex,0,0,89,96,100,trex.y,50,50);
}

function toJump() {
    trex.jumping = true;
    trex.speed = trex.jump;
}

// Simulates the effects of gravity 
function gravity() {
    if(trex.jumping == true) {
        if(trex.y - trex.speed - trex.gravity > bottom) {
            trex.jumping = false;
            trex.speed = 0; // stop the speed
            trex.y = bottom; // put the rex in the bottom
        } else {
            trex.speed -= trex.gravity;
            trex.y -= trex.speed;
        }
    }
}
// -------------------------CACTUS--------------------------
function drawCactus() {
    context.drawImage(imgCactus,0,0,51,102,cactus.x,cactus.y,38,75);
}

function logicCactus() {
    if(cactus.x < -100) {
        cactus.x = width + 100;
        level.points++;
    } else {
        cactus.x -= level.speed;
    }
}
// --------------------------CLOUD--------------------------
function drawCloud() {
    context.drawImage(imgCloud,0,0,95,35,cloud.x,cloud.y,82,31);
}

function logicCloud() {
    if(cloud.x < -100) {
        cloud.x = width + 100;
    } else {
        cloud.x -= cloud.speed;
    }
}
// ---------------------------------------------------------
function drawGround() {
    context.drawImage(imgGround,ground.x,0,700,30,0,ground.y,700,30);
}

function logicGround() {
    if(ground.x > 700) {
        ground.x = 0;
    } else {
        ground.x += level.speed;
    }
}

// Simple collide detection and effects
function collide() {
    if(cactus.x >= 100 && cactus.x <= 150) {
        if(trex.y >= bottom-25) {
            level.dead = true; // kill the t-rex
            level.speed = 0; // stop the game
            cloud.speed = 0; // stop the clouds
        }
    }
}

function points() {
    context.font = "30px impact";
    context.fillStyle = 'grey';
    context.fillText(`${level.points}`,600,50);

    if(level.dead == true) {
        context.font = "60px impact";
        context.fillText('GAME OVER',240,150);
    }
}

// ---------------------------------------------------------
var FPS = 50;

// Main loop
setInterval(function() {
    main();
},1000/FPS);

function main() {
    clearCanvas();
    gravity();
    collide();
    logicCactus();
    logicCloud();
    logicGround();
    drawGround();
    drawCactus();
    drawCloud();
    drawRex();
    points();
}