import { MovementEngine } from "./movement_engine.js";
import { tilt_angle } from "../utils/tilt_angle.js"

export class Player {
    constructor(game, x, y) {
        // Game
        this.game = game;

        // Direction of player model: "left" or "right"
        this.direction = "right";

        // Player state: "idle", "run", "shoot", "death"
        this.state = "idle"

        // Animation tick
        this.animation_state = 0;

        // Player start health (in DMG)
        this.health = 100;

        // Player start damage (in DMG)
        this.damage = 10;

        // Player start perks
        this.perks = [];

        // Player position
        this.x = x;
        this.y = y;

        // Player physics params 
        this.velocity_x              = 0;
        this.velocity_y              = 0;
        this.force_acceleration      = 5;
        this.resistance_acceleration = 5;
        this.max_velocity            = 20; // also in the other direction

        // Player size
        this.width  = 64;
        this.height = 64;

        // Movement engine
        this.movement_engine = new MovementEngine(game);
    }


    // Changes player position according to his velocity
    // Performs each 0.1 sec in Game class.
    move = () => {
        this.movement_engine.move(this)
    }


    // Perform a shoot
    shoot = (shoot_x, shoot_y) => {
        // Start shoot animation
        this.animation_state = 0;
        this.state           = 'shoot';

        // Rotate player
        this.direction  = shoot_x < this.game.global_offset.x ? "left" : "right";

        // Define source coordinates
        const source_x = this.x + this.game.global_offset.x + this.width / 2;
        const source_y = this.y + this.game.global_offset.y + this.height / 2;

        // Calc angle
        const angle = tilt_angle(
            this.game.global_offset.x + 160,
            this.game.global_offset.y,
            shoot_x,
            shoot_y
        )

        console.log(this.game.global_offset.x + 160,
            this.game.global_offset.y,
            shoot_x,
            shoot_y)
            
        console.log(angle);

        // Create bullet
        this.game.bullet_engine.create_bullet(source_x, source_y, angle)
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

    
    // Adds gotten acceleration to player speed
    speed_up = (accel_x, accel_y) => {
        this.movement_engine.accelerate(this, accel_x, accel_y);
    }


    // Simulates force of resistance and stops player
    resist = () => {
        this.movement_engine.resist(this)
    }
}