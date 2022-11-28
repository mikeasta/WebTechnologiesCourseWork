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
            enemy.stalking ? this.move_stalking(enemy) : this.move_randomly(enemy);
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

    }
}