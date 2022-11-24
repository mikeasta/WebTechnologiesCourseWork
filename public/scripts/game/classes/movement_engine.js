// For controlling movement rules
export class MovementEngine{
    constructor(game) {
        // Game object
        this.game = game;
    }

    // Move entity
    move = entity => {
        // Check if we can move in direction
        // ..

        // Move entity
        entity.x += entity.velocity_x;
        entity.y += entity.velocity_y;
    }

    // Accelerate entity
    accelerate = (entity, accel_x, accel_y) => {
        if (accel_x > 0) {
            entity.velocity_x = entity.velocity_x + accel_x > entity.max_velocity ?
                entity.max_velocity :
                entity.velocity_x + accel_x;
        } else {
            entity.velocity_x = entity.velocity_x + accel_x < -entity.max_velocity ?
                -entity.max_velocity :
                entity.velocity_x + accel_x;
        }

        if (accel_y > 0) {
            entity.velocity_y = entity.velocity_y + accel_y > entity.max_velocity ?
                entity.max_velocity :
                entity.velocity_y + accel_y;
        } else {
            entity.velocity_y = entity.velocity_y + accel_y < -entity.max_velocity ?
                -entity.max_velocity :
                entity.velocity_y + accel_y;
        }

        // Entity's sprite starts running
        if ((entity.velocity_x != 0 || entity.velocity_y != 0) && entity.state != "shoot")
            entity.state = "run"
    }


    // Simulates force of resistance and stops entity
    resist = entity => {
        if (entity.velocity_x < 0) {
            entity.velocity_x = 
                entity.velocity_x + entity.resistance_acceleration > 0 ? 
                0 : 
                entity.velocity_x + entity.resistance_acceleration;
        } else {
            entity.velocity_x = 
                entity.velocity_x - entity.resistance_acceleration < 0 ? 
                0 : 
                entity.velocity_x - entity.resistance_acceleration;
        }

        if (entity.velocity_y < 0) {
            entity.velocity_y = 
                entity.velocity_y + entity.resistance_acceleration > 0 ? 
                0 : 
                entity.velocity_y + entity.resistance_acceleration;
        } else {
            entity.velocity_y = 
                entity.velocity_y - entity.resistance_acceleration < 0 ? 
                0 : 
                entity.velocity_y - entity.resistance_acceleration;
        }

        // "Calm down" player's sprite
        if ((entity.velocity_x === 0 && entity.velocity_y === 0) && entity.state != "shoot")
            entity.state = "idle";
    }
}