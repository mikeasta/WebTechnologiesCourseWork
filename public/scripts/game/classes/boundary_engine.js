// Import collisions data
import {
    level_1_collisions,
    level_2_collisions
} from "../data/level_collisions.js"


class Boundary {
    constructor (x, y, tile_size) {
        this.x = x;
        this.y = y;
        this.tile_size = tile_size;
    }

    draw = (context, offset_x=0, offset_y=0) => {
        context.fillStyle = "red";
        context.fillRect(this.x - offset_x, this.y - offset_y, this.tile_size, this.tile_size)
    }
}


// For checking collisions
export class BoundaryEngine {
    constructor (game) {
        this.game = game;

        this.level_1_boundaries = [];
        this.level_2_boundaries = [];

        level_1_collisions.forEach((row, i) => {
            row.forEach((symbol, j) => {
                // If there boundary
                if (symbol === 1) {
                    this.level_1_boundaries.push(
                        new Boundary(
                            j * this.game.tile_size,
                            i * this.game.tile_size,
                            this.game.tile_size
                        )
                    )
                }
            });
        });

        console.log(this.level_1_boundaries)

        level_2_collisions.forEach((row, i) => {
            row.forEach((symbol, j) => {
                // If there boundary
                if (symbol === 1) {
                    this.level_2_boundaries.push(
                        new Boundary(
                            j * this.game.tile_size,
                            i * this.game.tile_size,
                            this.game.tile_size
                        )
                    )
                }
            });
        });
    }

    collision_with_wall = (body_x, body_y, body_width, body_height) => {
        // Choose correct boundary object
        let boundary = [];
        switch(this.game.level) {
            case 1: boundary = this.level_1_boundaries; break;
            case 2: boundary = this.level_2_boundaries; break;
        }

        // Define offset
        const offset  = this.game.global_offset[String(this.game.level)]
        let collision = false

        // Check boundaries: if body collides with boundary, return true
        for (let block of boundary) {
            collision = (
                body_x + body_width >= block.x - offset.x &&
                body_x <= block.x + block.tile_size - offset.x &&
                body_y <= block.y + block.tile_size - offset.y &&
                body_y + body_height >= block.y - offset.y
            );

            if (collision) return true;
        }

        return collision;
    }
}  