import { MovementEngine } from "./movement_engine.js";

// Bullet object 
class Bullet {
    constructor (
        start_x, 
        start_y, 
        angle, 
        source,
        velocity = 20,
        accel_x  = 0,
        accel_y  = 0
    ) {
        this.x      = start_x;
        this.y      = start_y;
        this.angle  = angle
        this.source = source
    }

    // Move bullet
    move_bullet = movement_engine => {

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
    create_bullet = (source_x, source_y, angle, source = "player") => {
        this.bullets.push(new Bullet(source_x, source_y, angle, source))
    }

    // Move bullets
    move_bullets = () => {
        this.bullets.forEach(bullet => bullet.move(this.movement_engine))
    }
}