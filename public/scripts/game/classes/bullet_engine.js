import { MovementEngine } from "./movement_engine.js";

// Bullet object 
class Bullet {
    constructor (
        start_x, 
        start_y, 
        angle, 
        source,
        accel_x  = 0,
        accel_y  = 0,
        velocity = 30,
    ) {
        this.id     = new Date().getTime() 
        this.x      = start_x;
        this.y      = start_y;
        this.angle  = angle;
        this.source = source;

        this.velocity_x = Math.cos(angle * Math.PI / 180) * velocity + accel_x;
        this.velocity_y = Math.sin(angle * Math.PI / 180) * velocity + accel_y;

        this.width  = 32;
        this.height = 32;
        this.tile_size = 32;
    }

    // Move bullet
    move = (movement_engine, bullet_engine) => {
        movement_engine.move_bullet(this, bullet_engine)
    }
}

// Bullet control object
export class BulletEngine {
    constructor (game) {
        // Game class
        this.game = game;

        // Bullets list
        this.bullets = []

        // Movement engine
        this.movement_engine = new MovementEngine(game)
    }

    // Create bullet and add it to the bullet list
    create_bullet = (
        source_x, 
        source_y, 
        angle,
        accel_x,
        accel_y, 
        source = "player") => {
        this.bullets.push(new Bullet(source_x, source_y, angle, source, accel_x, accel_y))
    }

    // Move bullets
    move_bullets = () => {
        this.bullets.forEach(bullet => bullet.move(this.movement_engine, this))
    }
}