// * ASSETS PATH IMPORTS
import {
    playerIdle,
    playerRun,
    playerShoot,
    playerDeath,
    levels
} from "./render_paths.js"

// Canvas import
const canvas = document.getElementById("playground");
const c      = canvas.getContext('2d');

// Canvas size
canvas.width  = 1600;
canvas.height = 900;


// Player Setup
const player_image  = new Image();
player_image.src    = playerIdle.left;
player_image.width  = playerIdle.frames * playerIdle.size;
player_image.height = playerIdle.size


// Prepare maps' images for render
const image_level_1 = new Image();
const image_level_2 = new Image();

// Set paths 
image_level_1.src = levels.image_paths[0];
image_level_2.src = levels.image_paths[2];


// Draw level
image_level_1.onload = async () => { 
    await c.drawImage(image_level_1, -128, -128);
    await c.drawImage(
        player_image, // Image
        0, // Crop left upper corner
        0,
        player_image.width / 2, // crop right lower corner
        player_image.height,
        544, // Image place position
        256,
        playerIdle.size, // Image size
        playerIdle.size
    )
}
