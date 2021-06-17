let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// HTML Elements
let image = document.getElementById("imageEl"); // Load Apple
let imageTwo = document.getElementById("imageTwoEl"); // Load Gold Apple
let imageThree = document.getElementById("imageThreeEl"); // Load Pearl
let imageFour = document.getElementById("imageFourEl"); // Load Cookie
// Key Event Stuff
document.addEventListener("keydown", keyDown); // Player Movement
document.addEventListener("keyup", keyUp); // Player Movement
document.addEventListener("keydown", startGame); // Start Game / Restart
// Player Elements
player = {
    x: 375,
    y: 275,
    w: 50,
    h: 50,
    speed: 2,
    col: "blue"
}
// Hunger Bar Elements
hungerBar = {
    x: 10,
    y: 561,
    w: 780,
    h: 29,
    speed: .05,
    col: "blue"
}
// Food Elements
food = {
    x: randomInt(0, 750),
    y: randomInt(50, 500),
    w: 50,
    h: 50
}
// Gold Apple Elements
powerUp = {
    x: -50,
    y: -50,
    w: 50,
    h: 50,
    rarity: 30   // 1/100
}
// Cookie Elements
cookie = {
    x: -50,
    y: -50,
    w: 50,
    h: 50,
    r: .5
}
// Pearl Elements
pearl = {
    x: -50,
    y: -50,
    w: 50,
    h: 50,
    rarity: 10   // 1/200
}
// Power Bar Elements
powerBar = {
    x: 300,
    y: 10,
    w: 0,
    h: 29,
    speed: .125,
    col: "blue"
}
// Random Elements
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let score = 0;
let bestScore = 0;
let gameNotPaused = false;
let startTimes = 0;
let goldAppleOut = 0;
let pearlOut = 0;
let cookieOut = 0;





// Main Looping Function
requestAnimationFrame(main);
function main () {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cnv.width, cnv.height, "fill");

    // Draw Bars
    drawHungerBar();
    drawScoreBar();

    //Power Bar Functions
    if (gameNotPaused) {
        powerDrain();
    }
    drawPowerUpBar();

    // collectable Functions
    playerPowerUpDetection();
    playerFoodDetection();
    playerPearlDetection();
    playerCookieDetection();

    // Draw Player
    drawPlayer();
    // Player Collision Detection
    playerWallDetection();
    if (gameNotPaused) {
        // Move Player
        movePlayer();
        // Hunger Functions
        hungerDrain();
        // Draw Collectables
        drawFood();
        drawPowerUp();
        drawPearl();
        drawCookie();
    } else {
        // Restart/Start Background
        // Restart/Start Text
        if (startTimes == 0) {
            rect(280, 70, 235, 45, "black", "fill");
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Press (r) to start", 290, 100);
        } else if (startTimes > 0) {
            rect(265, 70, 260, 45, "black", "fill");
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Press (r) to restart", 275, 100);
        }

    }
    // Apply Score to Best Score
    if (score > bestScore) {
        bestScore = score;
    }
    // Reload main function
    requestAnimationFrame(main);
}