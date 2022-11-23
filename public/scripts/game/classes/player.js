export class Player {
    constructor() {
        // Direction of player model: "left" or "right"
        this.direction = "right";

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
        this.force_acceleration      = 3;
        this.resistance_acceleration = 5;
        this.max_velocity            = 30; // also in the other direction

    }

    move = () => {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

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
    }

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
    }
}