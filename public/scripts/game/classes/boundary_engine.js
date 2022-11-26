// Import collisions data
import {
    level_1_collisions,
    level_2_collisions
} from "../data/level_collisions.js"


// Import teleport info
import {
    teleport_from_1_to_2
} from "../data/level_teleports.js"


// Boundary object is a wall object (which player cannot go though)
class Boundary {
    constructor (x, y, tile_size) {
        this.x = x;
        this.y = y;
        this.tile_size = tile_size;
    }

    
    // Draw boundary in canvas with special context
    draw = (context, offset_x = 0, offset_y = 0, color = "red") => {
        context.fillStyle = color;
        context.fillRect(
            this.x - offset_x, 
            this.y - offset_y, 
            this.tile_size, 
            this.tile_size
        )
    }
}


// Teleport boundary - when player goes on
// this type of boundary, he makes tp to the next level.
class Teleport {
    constructor (x, y, tile_size, destination) {
        this.x = x;
        this.y = y;
        this.tile_size = tile_size;
        this.destination = destination;
    }


    // Draw teleport in canvas with special context
    draw = (context, offset_x = 0, offset_y = 0, color = "green") => {
        context.fillStyle = color;
        context.fillRect(this.x - offset_x, this.y - offset_y, this.tile_size, this.tile_size)
    }
}


// For checking collisions
export class BoundaryEngine {
    constructor (game) {
        this.game = game;

        // Load all boundaries
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

        // Load all teleports
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
        offset
    ) => {
        return (
            body_x + body_width >= block_tile.x - offset.x &&
            body_x <= block_tile.x + block_tile.tile_size - offset.x &&
            body_y <= block_tile.y + block_tile.tile_size - offset.y &&
            body_y + body_height >= block_tile.y - offset.y
        );
    }


    collision_with_wall = (body_x, body_y, body_width, body_height) => {
        // * WALLS
        // Choose correct boundary object (for current level)
        let boundary = [];
        switch(this.game.level) {
            case 1: boundary = this.level_1_boundaries; break;
            case 2: boundary = this.level_2_boundaries; break;
        }

        // Define offset
        const offset  = this.game.global_offset;

        // Check boundaries: if body collides with boundary, return true
        let collision = false
        for (let block of boundary) {
            collision = this.check_collision(
                body_x, 
                body_y, 
                body_width, 
                body_height, 
                block, 
                offset
            )

            // If we found collision, we have no 
            // need to check collision further - entity definately stop.
            if (collision) break;
        }

        // * TELEPORTS
        // Choose correct boundary object
        let teleports = [];
        switch(this.game.level) {
            case 1: teleports = this.level_1_teleports; break;
        }


        // Check teleport
        let on_teleport = false;
        for (let block of teleports) {
            on_teleport = this.check_collision(
                body_x, 
                body_y, 
                body_width, 
                body_height, 
                block, 
                offset
            )

            // If player goes on teleport
            // switch current level to teleport destination level.
            if (on_teleport) this.game.switch_to_level(block.destination);
        }

        // Return collision result: 
        // if true, entity collides with boundary and need to stop.
        // Else - can move to that point.
        return collision;
    }
}  