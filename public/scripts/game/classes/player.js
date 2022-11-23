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
        this.resistance_acceleration = 7;
        this.max_velocity            = 20; // also in the other direction

    }

    // Changes player position according to his velocity
    // Performs each 0.1 sec in Game class.
    move = () => {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

    forward_animation = () => {
        this.animation_state = this.animation_state > 6 ? 0: this.animation_state + 1;
    }

    // Adds gotten acceleration to player speed
    speed_up = (accel_x, accel_y) => {
        if (accel_x > 0) {
            this.velocity_x = this.velocity_x + accel_x > this.max_velocity ?
                this.max_velocity :
                this.velocity_x + accel_x;
        } else {
            this.velocity_x = this.velocity_x + accel_x < -this.max_velocity ?
                -this.max_velocity :
                this.velocity_x + accel_x;
        }

        if (accel_y > 0) {
            this.velocity_y = this.velocity_y + accel_y > this.max_velocity ?
                this.max_velocity :
                this.velocity_y + accel_y;
        } else {
            this.velocity_y = this.velocity_y + accel_y < -this.max_velocity ?
                -this.max_velocity :
                this.velocity_y + accel_y;
        }

        // Player's sprite starts running
        if (this.velocity_x != 0 || this.velocity_y != 0)
            this.state = "run"
    }


    // Simulates force of resistance and stops player
    resist = () => {
        if (this.velocity_x < 0) {
            this.velocity_x = 
                this.velocity_x + this.resistance_acceleration > 0 ? 
                0 : 
                this.velocity_x + this.resistance_acceleration;
        } else {
            this.velocity_x = 
                this.velocity_x - this.resistance_acceleration < 0 ? 
                0 : 
                this.velocity_x - this.resistance_acceleration;
        }

        if (this.velocity_y < 0) {
            this.velocity_y = 
                this.velocity_y + this.resistance_acceleration > 0 ? 
                0 : 
                this.velocity_y + this.resistance_acceleration;
        } else {
            this.velocity_y = 
                this.velocity_y - this.resistance_acceleration < 0 ? 
                0 : 
                this.velocity_y - this.resistance_acceleration;
        }

        // "Calm down" player's sprite
        if (this.velocity_x === 0 && this.velocity_y === 0) 
            this.state = "idle";
    }
}