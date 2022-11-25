// Import collisions data
import {
    level_1_collisions,
    level_2_collisions
} from "../data/level_collisions.js"

// Import teleport info
import {
    teleport_from_1_to_2
} from "../data/level_teleports.js"

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


class Teleport {
    constructor (x, y, tile_size, destination) {
        this.x = x;
        this.y = y;
        this.tile_size = tile_size;
        this.destination = destination;
    }

    draw = (context, offset_x=0, offset_y=0) => {
        context.fillStyle = "green";
        context.fillRect(this.x - offset_x, this.y - offset_y, this.tile_size, this.tile_size)
    }
}

// For checking collisions
export class BoundaryEngine {
    constructor (game) {
        this.game = game;

        // Boundaries
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

        // Teleports
        this.level_1_teleports = [];
        teleport_from_1_to_2.forEach((row, i) => {
            row.forEach((symbol, j) => {
                // If there teleport
                if (symbol === 1) {
                    this.level_1_teleports.push(
                        new Teleport(
                            j * this.game.tile_size,
                            i * this.game.tile_size,
                            this.game.tile_size,
                            2
                        )
                    )
                }
            });
        });
    }

    // Check collision with whatever element
    check_collision = (
        body_x, 
        body_y, 
        body_width, 
        body_height, 
        block_tile, 
        global_offset
    ) => {
        return (
            body_x + body_width >= block_tile.x - global_offset.x &&
            body_x <= block_tile.x + block_tile.tile_size - global_offset.x &&
            body_y <= block_tile.y + block_tile.tile_size - global_offset.y &&
            body_y + body_height >= block_tile.y - global_offset.y
        );
    }

    collision_with_wall = (body_x, body_y, body_width, body_height) => {
        // * WALLS
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
            collision = this.check_collision(
                body_x, 
                body_y, 
                body_width, 
                body_height, 
                block, 
                offset
            )

            if (collision) break;
        }

        // * TELEPORTS
        // Choose correct boundary object
        let teleports = [];
        switch(this.game.level) {
            case 1: teleports = this.level_1_teleports; break;
        }

        let on_teleport = false;

        // Check teleport
        for (let block of teleports) {
            on_teleport = this.check_collision(
                body_x, 
                body_y, 
                body_width, 
                body_height, 
                block, 
                offset
            )

            if (on_teleport) this.game.switch_to_level(block.destination);
        }

        return collision;
    }
}  