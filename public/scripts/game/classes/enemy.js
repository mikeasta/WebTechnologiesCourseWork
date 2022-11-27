import { MovementEngine } from "./movement_engine.js";

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
        this.id = new Date().getTime();

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
        this.health = 50;

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
    }

    // Increase animation step
    forward_animation = () => {
        if (this.state === "shoot" && this.animation_state > 2) {
            this.state = "idle";
        } else if (this.animation_state > 6) {
            this.animation_state = 0;
        } else  {
            this.animation_state += 1;
        }
    }

    // Changes enemy position according to his velocity
    // Performs each 0.1 sec in Game class.
    move = () => {
        this.movement_engine.move(this)
    }
    

    // Adds gotten acceleration to enemy speed
    speed_up = (accel_x, accel_y) => {
        this.movement_engine.accelerate(this, accel_x, accel_y);
    }


    // Simulates force of resistance and stops enemy
    resist = () => {
        this.movement_engine.resist(this)
    }
}