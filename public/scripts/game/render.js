// * ASSETS PATH IMPORTS
import {
    playerIdle,
    playerRun,
    playerShoot,
    playerDeath,
    enemyIdle,
    enemyRun,
    enemyShoot,
    enemyDeath,
    bossIdle,
    bossRun,
    bossShoot,
    bossDeath,
    levels
} from "./render_paths.js"


export class Render {
    constructor () {
        // *CANVAS SETUP
        // Prepare canvas elements
        this.canvas = document.getElementById("playground");
        this.c      = canvas.getContext('2d');

        // Canvas size
        this.canvas.width  = 1600;
        this.canvas.height = 900;
    }

    render = () => {}
}



// * IMAGES SETUP
// Prepare maps' images for render
const image_level_1 = new Image();
const image_level_2 = new Image();

// Set paths 
image_level_1.src = levels.image_paths[0];
image_level_2.src = levels.image_paths[2];


// Draw level
image_level_1.onload = async () => { 
    await c.drawImage(image_level_1, -128, -128);
}
