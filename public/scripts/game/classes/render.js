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
} from "../render_paths.js"

class Sprite {
    constructor(image_url) {
        this.image = "";
        this.image_url = image_url;
    }
}

export class Render {
    constructor (game) {
        // Game object
        this.game = game;

        // Level parameters
        this.level_x = 0;
        this.level_y = 0;

        // Player centering parameters
        this.player_center_x = 750;
        this.player_center_y = 400;

        // *CANVAS SETUP
        // Prepare canvas elements
        this.canvas = document.getElementById("playground");
        this.c      = this.canvas.getContext('2d');

        // Canvas size
        this.canvas.width  = 1600;
        this.canvas.height = 900;


        // * IMAGES SETUP
        // Prepare maps' images for render
        this.image_level_1 = new Image();
        this.image_level_2 = new Image();

        // Set paths 
        this.image_level_1.src = levels.image_paths[0];
        this.image_level_2.src = levels.image_paths[1];

        // Prepare player
        this.player_image     = new Image();
        this.player_image.src = playerIdle.right;
    }

    render = async () => {
        // Clear canvas 
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height)


        // Draw level
        await this.c.drawImage(
            this.game.level === 1 ? this.image_level_1: this.image_level_2,
            -this.game.player.x,
            -this.game.player.y 
        );
        

        // Define player animation
        let animation;
        switch (this.game.player.state) {
            case "idle": animation = playerIdle; break;
            case "run" : animation = playerRun; break;
        }


        // Check player character direction
        this.player_image.src = this.game.player.direction === "right" ? animation.right : animation.left;

        
        // Draw player
        await this.c.drawImage(
            this.player_image, 
            this.player_image.width / animation.frames * (this.game.player.animation_state % animation.frames),
            0,
            this.player_image.width / animation.frames,
            this.player_image.height,
            this.player_center_x, 
            this.player_center_y,
            this.player_image.width / animation.frames,
            this.player_image.height,
        );
    }
}






