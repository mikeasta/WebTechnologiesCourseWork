export class EnemyMovementManager {
    constructor (game) {
        // Game
        this.game = game;
    }

    // Move all enemies (according to their behavior)
    speed_up_all_enemies = () => {
        // Get current enemies list
        const enemies = this.game.enemy_manager.current_enemies;

        // Check if they are waiting or stalking
        enemies.forEach(enemy => {
            if (enemy.stalking) {
                this.move_stalking(enemy)
            } else if (!enemy.attacking) {
                this.move_randomly(enemy);
            }
        }); 
    }

    // Enemy moves randomly
    move_randomly = enemy => {
        if (enemy.state === "death") return;

        // Chance to random move lower than chance to just stay
        if (Math.random() > 0.95) {
            const accel_x = enemy.max_velocity * Math.random() * (Math.random() > 0.5 ? 1: -1);
            const accel_y = enemy.max_velocity * Math.random() * (Math.random() > 0.5 ? 1: -1);
            enemy.speed_up(accel_x, accel_y);
            enemy.move()
        } else {
            enemy.resist();
        }
    }

    // Enemy is stalking player
    move_stalking = enemy => {
        if (enemy.state === "death") return;
        
        // Initialize acceleration variables
        let accel_x, accel_y;

        // Define check sources object (in deg)
        const sources = {
            "0"  : {x: enemy.x + 64, y: enemy.y,      accel_x: 5,  accel_y: 0},
            "45" : {x: enemy.x + 64, y: enemy.y + 64, accel_x: 5,  accel_y: 5},
            "90" : {x: enemy.x,      y: enemy.y + 64, accel_x: 0,   accel_y: 5},
            "135": {x: enemy.x - 64, y: enemy.y + 64, accel_x: -5, accel_y: 5},
            "180": {x: enemy.x - 64, y: enemy.y,      accel_x: -5, accel_y: 0},
            "225": {x: enemy.x - 64, y: enemy.y - 64, accel_x: -5, accel_y: -5},
            "270": {x: enemy.x,      y: enemy.y - 64, accel_x: 0,   accel_y: -5},
            "315": {x: enemy.x + 64, y: enemy.y - 64, accel_x: 5,  accel_y: -5},
        }

        // Best direction
        let best_angle = {angle: undefined, range: 0};
        let buf_range  = 0;

        // Find best range
        for (let key in sources) {
            buf_range = this.check_distance_to_player(sources[key].x, sources[key].y)
            if (!best_angle.angle || best_angle.range > buf_range) {
                best_angle.angle = key;
                best_angle.range = buf_range;
            }
        }

        // Initialize accel for current angle
        accel_x = sources[best_angle.angle].accel_x;
        accel_y = sources[best_angle.angle].accel_y;

        // Speed up enemy
        enemy.speed_up(accel_x, accel_y)
        enemy.move()
    }

    // Check distance to player from source
    check_distance_to_player = (source_x, source_y) => {
        return Math.sqrt(
            Math.pow(this.game.player.x + this.game.global_offset.x - source_x, 2) + 
            Math.pow(this.game.player.y + this.game.global_offset.y - source_y, 2)
        )
    }
}