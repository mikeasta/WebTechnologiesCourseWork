// For controlling movement rules
export class MovementEngine{
    constructor(game) {
        // Game object
        this.game = game;
    }


    // Move entity
    move = entity => {
        // Check if we can move in direction
        const collision = 
            this.game.boundary
                .collision_with_wall(
                    entity.x + entity.velocity_x,
                    entity.y + entity.velocity_y,
                    entity.width,
                    entity.height,
                    this.game.global_offset
                )

        // If collision take place
        // try to lower speed to move player a little further
        if (collision) {
            entity.velocity_x = 
                entity.velocity_x > 0 ? entity.velocity_x -1: 
                    entity.velocity_x < 0 ? entity.velocity_x + 1: 0;
            entity.velocity_y = 
                entity.velocity_y > 0 ? entity.velocity_y -1: 
                    entity.velocity_y < 0 ? entity.velocity_y + 1: 0;
            this.move(entity);
        } else {
            // If there are no collision, move entity
            entity.x += entity.velocity_x;
            entity.y += entity.velocity_y;
        }
    }


    // Move enemy
    move_enemy = enemy => {
        // Check if we can move in direction
        const collision = 
            this.game.boundary
                .collision_with_wall(
                    enemy.x + enemy.velocity_x,
                    enemy.y + enemy.velocity_y,
                    enemy.width,
                    enemy.height
                )

        // If collision take place
        // try to lower speed to move player a little further
        if (!collision) {
            // If there are no collision, move enemy
            enemy.x += enemy.velocity_x;
            enemy.y += enemy.velocity_y;
        }
    }

    // Bullet move method
    move_bullet = (bullet, bullet_engine) => {
        // Check if bullet can move in direction
        const collision = 
            this.game.boundary  
                .collision_with_wall(
                    bullet.x + bullet.velocity_x,
                    bullet.y + bullet.velocity_y,
                    bullet.width,
                    bullet.height
                )
            ||
            this.game.boundary.bullet_to_entity_collision(bullet)  
        
        if (collision) {
            // Delete bullet
            bullet_engine.bullets = bullet_engine.bullets.filter(b => b.id != bullet.id);
        } else {
            // If there are no collision, move bullet
            bullet.x += bullet.velocity_x;
            bullet.y += bullet.velocity_y;
        }
    }


    // Accelerate entity
    accelerate = (entity, accel_x, accel_y) => {
        // Change X axis velocity parameter
        if (accel_x > 0) {
            entity.velocity_x = 
                entity.velocity_x + accel_x > entity.max_velocity ?
                    entity.max_velocity : entity.velocity_x + accel_x;
        } else {
            entity.velocity_x = 
                entity.velocity_x + accel_x < -entity.max_velocity ?
                    -entity.max_velocity : entity.velocity_x + accel_x;
        }

        // Change Y axis velocity parameter
        if (accel_y > 0) {
            entity.velocity_y = 
                entity.velocity_y + accel_y > entity.max_velocity ?
                    entity.max_velocity : entity.velocity_y + accel_y;
        } else {
            entity.velocity_y = 
                entity.velocity_y + accel_y < -entity.max_velocity ?
                    -entity.max_velocity : entity.velocity_y + accel_y;
        }

        // Entity's sprite starts running
        if ((entity.velocity_x != 0 || entity.velocity_y != 0) && entity.state != "shoot") {
            entity.state = "run"
            entity.direction = entity.velocity_x > 0 ? "right" : "left";
        }


    }


    // Simulates force of resistance and stops entity
    resist = entity => {
        // Change X axis velocity parameter
        if (entity.velocity_x < 0) {
            entity.velocity_x = 
                entity.velocity_x + entity.resistance_acceleration > 0 ? 
                    0 : entity.velocity_x + entity.resistance_acceleration;
        } else {
            entity.velocity_x = 
                entity.velocity_x - entity.resistance_acceleration < 0 ? 
                    0 : entity.velocity_x - entity.resistance_acceleration;
        }

        // Change Y axis velocity parameter
        if (entity.velocity_y < 0) {
            entity.velocity_y = 
                entity.velocity_y + entity.resistance_acceleration > 0 ? 
                    0 : entity.velocity_y + entity.resistance_acceleration;
        } else {
            entity.velocity_y = 
                entity.velocity_y - entity.resistance_acceleration < 0 ? 
                    0 : entity.velocity_y - entity.resistance_acceleration;
        }

        // "Calm down" player's sprite
        if ((entity.velocity_x === 0 && entity.velocity_y === 0) && entity.state != "shoot")
            entity.state = "idle";
    }
}