//
//
// Food Functions
//
//
// Create and Draw Food
function drawFood () {
    ctx.drawImage(image, food.x, food.y, food.w, food.h);
}
// Food Collected
function foodCollected () {
    food.x = randomInt(0, 750); // Random food x Value
    food.y = randomInt(50, 500); // Random food y Value
    hungerBar.speed += .05; // Increase Hunger Speed
    hungerBar.w = 780; // Reset Hunger Bar
    score++;
    if (randomInt(1, 100) < powerUp.rarity) {
        let tempRan = randomInt(1, 10);
        console.log(tempRan);
        if (tempRan <= 7) {
            if (goldAppleOut == 0 && cookieOut == 0) { // Test if Power is Already Out
                // Spawn Power Up
                powerUp.x = randomInt(0, 750);
                powerUp.y = randomInt(50, 500);
                goldAppleOut = 1;
            }
        } else if (tempRan > 7) {
            if (cookieOut == 0 && goldAppleOut == 0) { // Test if Power is Already Out
                if (hungerBar.speed > cookie.r) { // Test if Hunger Bar Speed is Less than .5
                    // Spawn Power Up
                    cookie.x = randomInt(0, 750);
                    cookie.y = randomInt(50, 500);
                    cookieOut = 1;
                } else if (hungerBar.speed <= cookie.r) { // If it's than spawn Apple Instead
                    // Spawn Power Up
                    powerUp.x = randomInt(0, 750);
                    powerUp.y = randomInt(50, 500);
                    goldAppleOut = 1;
                }

            }
        }

    }
    if (randomInt(1, 100) < pearl.rarity) {
        if (pearlOut == 0) {
            // Spawn Pearl
            pearl.x = randomInt(0, 750);
            pearl.y = randomInt(50, 500);
            pearlOut = 1;
        }
    }
}
// Player Food Collision Detection
function playerFoodDetection () {
    if (player.x + player.w >= food.x && player.x <= food.x + food.w && player.y + player.h >= food.y && player.y <= food.y + food.h) {
        // Left Side                     // Right Side                  // Top Side                      // Bottom Side
        foodCollected();
    }
}
//
//
// Hunger Functions
//
//
// Create and Draw the Hunger Bar
function drawHungerBar () {
    // Hunger bar Background
    rect(0, 550, cnv.width, 50, "black", "fill");
    // Hunger bar Border
    rect(8, 558, 784, 34, "white", "fill");
    // Hunger bar Border Background
    rect(10, 561, 195, 28, "maroon", "fill"); // 1/4
    rect(195, 561, 195, 28, "darkred", "fill");  // 1/2
    rect(390, 561, 195, 28, "red", "fill"); // 3/4
    rect(585, 561, 205, 28, "tomato", "fill"); // 4/4

    // Hunger Bar
    rect(hungerBar.x, hungerBar.y, hungerBar.w, hungerBar.h, hungerBar.col, "fill");
}
// Drain the Hunger Bar
function hungerDrain () {
    if (hungerBar.w > 0) {
        hungerBar.w -= hungerBar.speed;
    } else if (hungerBar.w <= 0) {
        stopGame();
    }
}
//
//
// Power Functions
//
//
// Create and Draw Power Up
function drawPowerUpBar () {
    // Power Up Bar Border
    rect(298, 8, 204, 34, "white", "fill");
    rect(300, 10, 200, 30, "black", "fill");
    // Power Up Bar
    rect(powerBar.x, powerBar.y, powerBar.w, powerBar.h, powerBar.col, "fill");
}
// Create and Draw Power Up
function drawPowerUp () {
    ctx.drawImage(imageTwo, powerUp.x, powerUp.y, powerUp.w, powerUp.h);
}
// Create and Draw Pearl
function drawPearl () {
    ctx.drawImage(imageThree, pearl.x, pearl.y, pearl.w, pearl.h);
}
// Create and Draw Cookie
function drawCookie () {
    ctx.drawImage(imageFour, cookie.x, cookie.y, cookie.w, cookie.h);
}
// Player Pearl Collision Detection
function playerPearlDetection () {
    if (player.x + player.w >= pearl.x && player.x <= pearl.x + pearl.w && player.y + player.h >= pearl.y && player.y <= pearl.y + pearl.h) {
        // Left Side                        // Right Side                        // Top Side                         // Bottom Side
        pearlCollected();
    }
}
// Pearl Collected
function pearlCollected () {
    pearl.x = -50;
    pearl.y = -50;
    player.x = food.x;
    player.y = food.y;
    pearlOut = 0;
}
// Player Power Up Collision Detection
function playerPowerUpDetection () {
    if (player.x + player.w >= powerUp.x && player.x <= powerUp.x + powerUp.w && player.y + player.h >= powerUp.y && player.y <= powerUp.y + powerUp.h) {
        // Left Side                        // Right Side                        // Top Side                         // Bottom Side
        powerUpCollected();
    }
}
// Power Collected
function powerUpCollected () {
    powerUp.x = -50;
    powerUp.y = -50;
    powerBar.w = 200; // Start Power Up
    goldAppleOut = 0;
}
// Player Cookie Up Collision Detection
function playerCookieDetection () {
    if (player.x + player.w >= cookie.x && player.x <= cookie.x + cookie.w && player.y + player.h >= cookie.y && player.y <= cookie.y + cookie.h) {
        // Left Side                                   // Right Side                                 // Top Side             // Bottom Side
        cookieCollected();
    }
}
// Cookie Collected
function cookieCollected () {
    cookie.x = -50;
    cookie.y = -50;
    cookieOut = 0;
    console.log("outstide");
    if (hungerBar.speed > cookie.r) {
        console.log("instide");
        hungerBar.speed -= cookie.r;
    }
}
// Power Up Active
function powerDrain () {
    if (powerBar.w > 0) {
        powerBar.w -= powerBar.speed;
        player.speed = 2.5;
    } else {
        player.speed = 2;
    }
}
//
//
// Player Functions
//
//
// Create and Draw the Player
function drawPlayer () {
    rect(player.x, player.y, player.w, player.h, player.col, "fill");
}
// Player Collision Detection
function playerWallDetection () {
    // Left Wall
    if (player.x <= 0) {
        player.x = 0;
    }
    // Right Wall
    if (player.x + player.w >= cnv.width) {
        player.x = cnv.width - player.w;
    }
    // Top Wall
    if (player.y <= 50) {
        player.y = 50
    }
    // Bottom Wall
    if (player.y + player.h >= cnv.height - 50) {
        player.y = cnv.height - 100;
    }
}
// Move the Player Around
function movePlayer () {
    // Move Right and Left
    if (rightPressed) {
        player.x -= player.speed;
    } else if (leftPressed) {
        player.x += player.speed;
    }
    // Move Player Up and Down
    if (upPressed) {
        player.y -= player.speed;
    } else if (downPressed) {
        player.y += player.speed;
    }
}
// Test for Key Down
function keyDown (event) {
    // console.log(event.keyCode);
    if (event.keyCode == 65) {
        rightPressed = true;
    } else if (event.keyCode == 68) {
        leftPressed = true;
    } else if (event.keyCode == 87) {
        upPressed = true;
    } else if (event.keyCode == 83) {
        downPressed = true;
    }
}
// Test for Key Up
function keyUp (event) {
    if (event.keyCode == 65) {
        rightPressed = false;
    } else if (event.keyCode == 68) {
        leftPressed = false;    
    } else if (event.keyCode == 87) {
        upPressed = false;
    } else if (event.keyCode == 83) {
        downPressed = false;
    }
}
//
//
// Other Functions
//
//
// Create and Draw Score Bar
function drawScoreBar () {
    // Score Bar Background
    rect(0, 0, cnv.width, 50, "black", "fill");
    // Score Text
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 35);
    // Best Score Text
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Best Score: " + bestScore, 580, 35);
}
// Stop the Game and Add to Best Score
function stopGame() {
    gameNotPaused = false;
}
// Start the Game When Page is Loaded
function startGame (event) {
    if (gameNotPaused == false) {
        if (event.keyCode == 82) { // Test for (r)
            // Power Up Bar Background
            powerBar.w = 0;
            gameNotPaused = true;
            food.x = randomInt(0, 750); // Random food x Value
            food.y = randomInt(50, 500); // Random food y Value
            hungerBar.speed = .05; // Increase Hunger Speed
            hungerBar.w = 780; // Reset Hunger Bar
            score = 0; // Reset Score
            player.x = 375; // Reset Player
            player.y = 275; // Reser Player
            startTimes++;
        }
    }
}
// Random Number Generator
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
// Function for Drawing Rectangles
function rect (x, y, w, h, color, mode) {
    if (mode === "fill") {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    } else if (mode === "stroke") {
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, w, h)
    }
}