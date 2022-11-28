import { MovementEngine } from "./movement_engine.js";
import { tilt_angle } from "../utils/tilt_angle.js";

export class Enemy {
    constructor (
        game, 
        spawn_x, 
        spawn_y
    ) {
        // Game
        this.game = game;

        // Ally
        this.player_ally = false;

        // Boss
        this.boss = false;

        // ID
        this.id = Math.random().toString(36).slice(2, 15);

        // Position
        this.x = spawn_x;
        this.y = spawn_y;

        // Direction
        this.direction = "right";

        // State
        this.state = "idle";

        // Animation
        this.animation_state = 0;

        // Enemy health (in DMG)
        this.health = 70;

        // Enemy damage (in DMG)
        this.damage = 10;

        // Enemy size
        this.width  = 64;
        this.height = 64;

        // Player physics params 
        this.velocity_x              = 0;
        this.velocity_y              = 0;
        this.force_acceleration      = 5;
        this.resistance_acceleration = 5;
        this.max_velocity            = 14; // also in the other direction
    
        // Shoot mechanics
        this.on_reload    = false;
        this.reload_stage = 0;

        // Found player
        this.found_player = false;

        // Movement engine
        this.movement_engine = new MovementEngine(game);

        // Attitude
        this.stalking = false;
        this.attacking = false;

        // Reload stat
        this.on_reload = false;
    }


    // Increase animation step
    forward_animation = () => {
        if (this.state === "shoot" && this.animation_state > 2) {
            this.state = "idle";
        } else if ((this.state == "death") && (this.animation_state > 5)) {
            this.game.enemy_manager.kill(this);
            this.state = "idle";
            this.animation_state = 0;
        } else if (this.animation_state > 6) {
            this.animation_state = 0;
        } else  {
            this.animation_state += 1;
        }
    }


    // Changes enemy position according to his velocity
    // Performs each 0.1 sec in Game class.
    move = () => {
        this.movement_engine.move_enemy(this)
    }
    

    // Adds gotten acceleration to enemy speed
    speed_up = (accel_x, accel_y) => {
        this.movement_engine.accelerate(this, accel_x, accel_y);
    }


    // Simulates force of resistance and stops enemy
    resist = () => {
        this.movement_engine.resist(this)
    }


    // Get damage
    hurt = damage => {
        this.health -= damage;
        if (this.health <= 0) this.die();
    }

    
    // Die
    die = () => {
        this.state = "death";
        this.animation_state = 0;
        this.game.player.increase_shields();
        if (this.boss) {
            this.game.finished = true;
        }
    }


    // Shoot
    shoot = (shoot_x, shoot_y) => {
        
        // If player already have made a shot
        if (this.on_reload || this.state == "death") return;

        // Block instant next shoot
        this.on_reload = true;

        // Start shoot animation
        this.animation_state = 0;
        this.state           = 'shoot';

        // Rotate player
        this.direction  = shoot_x < this.x ? "left" : "right";

        // Define source coordinates
        const source_x = this.x + this.width / 2;
        const source_y = this.y + this.height / 2;

        // Calc angle
        const angle = tilt_angle(
            this.x,
            this.y,
            shoot_x,
            shoot_y
        )

        // Shooting type define
        const shoot_type = Math.random();

        if (!this.boss || (this.boss && shoot_type < 0.3)) {
            // Create ordinary bullet
            this.game.bullet_engine.create_bullet(
                source_x, 
                source_y, 
                angle,
                this.velocity_x,
                this.velocity_y,
                "enemy"
            )
        } else if (this.boss && shoot_type >= 0.3 && shoot_type <= 0.65) {
            // Create "plus" bullet
            this.game.bullet_engine.create_bullet(
                source_x, 
                source_y, 
                0,
                this.velocity_x,
                this.velocity_y,
                "enemy"
            )

            this.game.bullet_engine.create_bullet(
                source_x, 
                source_y, 
                90,
                this.velocity_x,
                this.velocity_y,
                "enemy"
            )

            this.game.bullet_engine.create_bullet(
                source_x, 
                source_y, 
                180,
                this.velocity_x,
                this.velocity_y,
                "enemy"
            )

            this.game.bullet_engine.create_bullet(
                source_x, 
                source_y, 
                270,
                this.velocity_x,
                this.velocity_y,
                "enemy"
            )
        } else if (this.boss && shoot_type > 0.65) {
            // Create "cross" bullet
            this.game.bullet_engine.create_bullet(
                source_x, 
                source_y, 
                45,
                this.velocity_x,
                this.velocity_y,
                "enemy"
            )

            this.game.bullet_engine.create_bullet(
                source_x, 
                source_y, 
                135,
                this.velocity_x,
                this.velocity_y,
                "enemy"
            )

            this.game.bullet_engine.create_bullet(
                source_x, 
                source_y, 
                225,
                this.velocity_x,
                this.velocity_y,
                "enemy"
            )

            this.game.bullet_engine.create_bullet(
                source_x, 
                source_y, 
                315,
                this.velocity_x,
                this.velocity_y,
                "enemy"
            )
        }
    }
}