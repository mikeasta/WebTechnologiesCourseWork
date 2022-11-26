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
} from "../data/render_paths.js"

export class Render {
    constructor (game) {
        // Game object
        this.game = game;

        // Player centering parameters
        this.player_center_x = game.global_offset.x;
        this.player_center_y = game.global_offset.y;

        // * BOUNDARIES
        this.need_to_draw_boundaries = true;

        // *CANVAS SETUP
        // Prepare canvas elements
        this.canvas = document.getElementById("playground");
        this.c      = this.canvas.getContext('2d');

        // Canvas size
        this.canvas.width  = 1600;
        this.canvas.height = 900;


        // * IMAGES SETUP
        // ? LEVELS
        // Var for saving current level image
        this.level_image = undefined;

        // Prepare maps' images for render
        this.image_level_1 = new Image();
        this.image_level_2 = new Image();

        // Set paths 
        this.image_level_1.src = levels.image_paths[0];
        this.image_level_2.src = levels.image_paths[1];

        // ? PLayer
        // Current player image
        this.player_image = undefined;
        this.animation    = undefined;

        // Idle sprite
        this.player_image_idle      = new Image();
        this.player_image_idle.src  = playerIdle.right;

        // Run sprite
        this.player_image_run       = new Image();
        this.player_image_run.src   = playerRun.right;

        // Shoot sprite
        this.player_image_shoot     = new Image();
        this.player_image_shoot.src = playerShoot.right;

        // Death sprite
        this.player_image_death     = new Image();
        this.player_image_death.src = playerDeath.right;
    }


    // Define player animation
    define_player_animation = () => {
        // Define player animation
        switch (this.game.player.state) {
            case "idle":  
                this.animation    = playerIdle; 
                this.player_image = this.player_image_idle;  
                break;
            case "run" :  
                this.animation    = playerRun;   
                this.player_image = this.player_image_run;  
                break;
            case "shoot": 
                this.animation    = playerShoot; 
                this.player_image = this.player_image_shoot; 
                break;
            case "death": 
                this.animation = playerDeath; 
                this.player_image = this.player_image_death;
                break;
        }
    }


    // Draw boundaries
    draw_boundaries = () => {
        // Collisions
        let boundaries = [];
        switch (this.game.level) {
            case 1: boundaries = this.game.boundary.level_1_boundaries; break;
            case 2: boundaries = this.game.boundary.level_2_boundaries; break;
        }

        // Draw all boundaries (walls)
        boundaries.forEach(
            boundary => boundary.draw(
                this.c, 
                this.game.player.x,
                this.game.player.y
            )
        );


        // Teleports
        let teleports = [];
        switch (this.game.level) {
            case 1: teleports  = this.game.boundary.level_1_teleports; break;
        }

        // Draw all teleports
        teleports.forEach(
            teleport => teleport.draw(
                this.c, 
                this.game.player.x,
                this.game.player.y
            )
        );

        // Player hitbox
        this.c.fillStyle = 'yellow';
        this.c.fillRect(
            this.player_center_x, 
            this.player_center_y,
            this.player_image.width / this.animation.frames,
            this.player_image.height,
        )
    }


    // Draw player
    draw_player = async () => {
        // Check player character direction
        this.player_image.src = 
            this.game.player.direction === "right" ? 
                this.animation.right : this.animation.left;

        // Draw player
        await this.c.drawImage(
            this.player_image, 
            this.player_image.width / this.animation.frames * (this.game.player.animation_state % this.animation.frames),
            0,
            this.player_image.width / this.animation.frames,
            this.player_image.height,
            this.player_center_x, 
            this.player_center_y,
            this.player_image.width / this.animation.frames,
            this.player_image.height,
        );
    }


    // Draw level
    draw_level = async () => {
        // Check current level
        switch(this.game.level) {
            case 1: this.level_image = this.image_level_1; break;
            case 2: this.level_image = this.image_level_2; break;
        }

        // Draw level
        await this.c.drawImage(
            this.level_image,
            -this.game.player.x,
            -this.game.player.y 
        );
    }


    // Clear canvas
    clear_canvas = () => {
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    
    // Draw all gameplay components 
    render = async () => {
        // Clear canvas 
        this.clear_canvas();

        // Define player animation
        this.define_player_animation();
        
        // Draw level
        await this.draw_level()
        
        // Draw boundaries (test) and teleports
        if (this.need_to_draw_boundaries) 
            this.draw_boundaries();

        // Draw player
        await this.draw_player();
    }
}






