// * ASSETS PATH IMPORTS
import {
    playerHealthBar,
    playerShield,
    reloadIndicator,
    playerIdle,
    playerRun,
    playerShoot,
    playerDeath,
    enemyHealthBar,
    enemyIdle,
    enemyRun,
    enemyShoot,
    enemyDeath,
    bossIdle,
    bossRun,
    bossShoot,
    bossDeath,
    levels,
    playerBullet,
    enemyBullet
} from "../data/render_paths.js"


export class Render {
    constructor (game) {
        // Game object
        this.game = game;

        // Player centering parameters
        this.player_center_x = game.global_offset.x;
        this.player_center_y = game.global_offset.y;

        // * BOUNDARIES
        this.need_to_draw_boundaries = false;

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

        // ? Bullets
        this.player_bullet     = new Image();
        this.player_bullet.src = playerBullet.src;

        this.enemy_bullet     = new Image();
        this.enemy_bullet.src = enemyBullet.src;

        // ? Player
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

        // Player health bar 
        this.player_image_health_bar     = new Image();
        this.player_image_health_bar.src = playerHealthBar.src;

        // Player reload indicator
        this.player_image_reload_indicator     = new Image();
        this.player_image_reload_indicator.src = reloadIndicator.src;

        // Player shield indicator
        this.player_image_shield = new Image();
        this.player_image_shield.src = playerShield.src;
    
        // ? Enemy
        // Current enemy image
        this.enemy_image     = undefined;
        this.enemy_animation = undefined;

        // Idle sprite
        this.enemy_image_idle      = new Image();
        this.enemy_image_idle.src  = enemyIdle.right;

        // Run sprite
        this.enemy_image_run       = new Image();
        this.enemy_image_run.src   = enemyRun.right;

        // Shoot sprite
        this.enemy_image_shoot     = new Image();
        this.enemy_image_shoot.src = enemyShoot.right;

        // Death sprite
        this.enemy_image_death     = new Image();
        this.enemy_image_death.src = enemyDeath.right;

        // Enemy health bar 
        this.enemy_image_health_bar     = new Image();
        this.enemy_image_health_bar.src = enemyHealthBar.src;
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


    // Define enemy animation
    define_enemy_animation = enemy => {
        // Define enemy animation
        switch (enemy.state) {
            case "idle":  
                this.enemy_animation = enemyIdle; 
                this.enemy_image = this.enemy_image_idle;  
                break;
            case "run" :  
                this.enemy_animation = enemyRun;   
                this.enemy_image = this.enemy_image_run;  
                break;
            case "shoot": 
                this.enemy_animation = enemyShoot; 
                this.enemy_image = this.enemy_image_shoot; 
                break;
            case "death": 
                this.enemy_animation = enemyDeath; 
                this.enemy_image = this.enemy_image_death;
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


    // Draw bullets
    draw_bullets = async () => {
        this.game.bullet_engine.bullets.forEach( bullet => {
            // Draw boundaries
            if (this.need_to_draw_boundaries) {
                this.c.fillStyle = "blue";
                this.c.fillRect(
                    bullet.x - this.game.player.x,
                    bullet.y - this.game.player.y,
                    32, 32
                )
            }

            this.c.drawImage(
                bullet.source === "player" ? this.player_bullet: this.enemy_bullet,
                bullet.x - this.game.player.x,
                bullet.y - this.game.player.y,
            );
        })
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


    // Draw enemies
    draw_enemies = async () => {
        const enemies = this.game.enemy_manager.current_enemies;

        enemies.forEach(enemy => {
            // Boundary
            if (this.need_to_draw_boundaries) {
                this.c.fillStyle = "yellow";
                this.c.fillRect(
                    enemy.x - this.game.player.x, 
                    enemy.y - this.game.player.y, 
                    64, 64);
            }

            // Define current enemy animation
            this.define_enemy_animation(enemy)

            // Check enemy character direction
            this.enemy_image.src = 
                enemy.direction === "right" ? 
                    this.enemy_animation.right : this.enemy_animation.left;

            // Draw health par
            if (enemy.state != "death") {
                this.c.drawImage(
                    this.enemy_image_health_bar, 
                    this.enemy_image_health_bar.width / enemyHealthBar.frames * (
                        Math.round(enemy.health / enemyHealthBar.frames) - 1 < 0 ? 
                            0 : Math.round(enemy.health / enemyHealthBar.frames) - 1
                    ),
                    0,
                    this.enemy_image_health_bar.width / enemyHealthBar.frames,
                    this.enemy_image_health_bar.height,
                    enemy.x - this.game.player.x, 
                    enemy.y - this.game.player.y - this.enemy_image_health_bar.height,
                    this.enemy_image_health_bar.width / enemyHealthBar.frames,
                    this.enemy_image_health_bar.height,
                );
            }
        

            // Draw enemy
            this.c.drawImage(
                this.enemy_image, 
                this.enemy_image.width / this.enemy_animation.frames * (enemy.animation_state % this.enemy_animation.frames),
                0,
                this.enemy_image.width / this.enemy_animation.frames,
                this.enemy_image.height,
                enemy.x - this.game.player.x, 
                enemy.y - this.game.player.y, 
                this.enemy_image.width / this.enemy_animation.frames,
                this.enemy_image.height,
            );
        })
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

    
    // Draw player health bar
    draw_player_indicators = async () => {

        // Draw health par
        await this.c.drawImage(
            this.player_image_health_bar, 
            this.player_image_health_bar.width / playerHealthBar.frames * (
                Math.round(this.game.player.health / playerHealthBar.frames) - 1 < 0 ? 
                    0 : Math.round(this.game.player.health / playerHealthBar.frames) - 1
            ),
            0,
            this.player_image_health_bar.width / playerHealthBar.frames,
            this.player_image_health_bar.height,
            this.player_center_x, 
            this.player_center_y - this.player_image_health_bar.height,
            this.player_image_health_bar.width / playerHealthBar.frames,
            this.player_image_health_bar.height,
        );

        // Draw reload
        if (this.game.player.on_reload) {
            this.c.drawImage(
                this.player_image_reload_indicator, 
                this.player_image_reload_indicator.width / reloadIndicator.frames * this.game.player.reload_stage,
                0,
                this.player_image_reload_indicator.width / reloadIndicator.frames,
                this.player_image_reload_indicator.height,
                this.player_center_x, 
                this.player_center_y - this.player_image_reload_indicator.height - this.player_image_health_bar.height / 2,
                this.player_image_reload_indicator.width / reloadIndicator.frames,
                this.player_image_reload_indicator.height,
            );
        }
        

        // Draw indicator
        this.c.drawImage(
            this.player_image_shield, 
            this.player_image_shield.width / playerShield.frames * this.game.player.shields,
            0,
            this.player_image_shield.width / playerShield.frames,
            this.player_image_shield.height,
            this.player_center_x, 
            this.player_center_y + this.player_image.height,
            this.player_image_shield.width / playerShield.frames,
            this.player_image_shield.height,
        );
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

        // Draw player health bar
        await this.draw_player_indicators();

        // Draw bullets
        await this.draw_bullets();

        // Draw enemies
        await this.draw_enemies();
    }
}






