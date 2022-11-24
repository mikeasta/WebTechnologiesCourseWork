import { MovementEngine } from "./movement_engine.js";

const movement_engine = new MovementEngine();

export class Player {
    constructor() {
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
        this.x = 0;
        this.y = 0;

        // Player physics params 
        this.velocity_x              = 0;
        this.velocity_y              = 0;
        this.force_acceleration      = 5;
        this.resistance_acceleration = 5;
        this.max_velocity            = 20; // also in the other direction
    }

    // Changes player position according to his velocity
    // Performs each 0.1 sec in Game class.
    move = () => {
        movement_engine.move(this)
    }

    // Perform a shoot
    shoot = () => {
        // Start shoot animation
        this.animation_state = 0;
        this.state           = 'shoot';

        // Create bullet
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
        movement_engine.accelerate(this, accel_x, accel_y);
    }


    // Simulates force of resistance and stops player
    resist = () => {
        movement_engine.resist(this)
    }
}