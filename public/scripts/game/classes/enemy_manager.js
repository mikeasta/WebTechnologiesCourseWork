import { Enemy } from "./enemy.js"
import {
    level_1_enemies,
    level_2_enemies
} from "../data/level_enemies.js"

export class EnemyManager {
    constructor (game) {
        // Game 
        this.game = game

        // Enemies
        this.level_1_enemies = [];
        this.level_2_enemies = [];

        level_1_enemies.forEach((row, i) => {
            row.forEach((symbol, j) => {
                // If there enemy
                if (symbol === 1) {
                    this.level_1_enemies.push(
                        new Enemy(
                            game,
                            j * this.game.tile_size,
                            i * this.game.tile_size,
                        )
                    )
                }
            })
        });

        level_2_enemies.forEach((row, i) => {
            row.forEach((symbol, j) => {
                // If there enemy
                if (symbol === 1) {
                    this.level_2_enemies.push(
                        new Enemy(
                            game,
                            j * this.game.tile_size,
                            i * this.game.tile_size,
                        )
                    )
                }
            })
        });

        // Current enemies list
        this.current_enemies = this.choose_current_enemy_list()
    }

    
    // Chooses current enemy list (according to game level)
    choose_current_enemy_list = () => {
        switch (this.game.level) {
            case 1: return this.level_1_enemies;
            case 2: return this.level_2_enemies;
        }
    }


    // Forward all enemy animations
    all_forward_animation = () => {
        this.current_enemies.forEach(enemy => enemy.forward_animation());
    }


    // Update enemies
    update_enemies = () => {
        // Current enemies list
        this.current_enemies = this.choose_current_enemy_list()
    }


    // Kill enemy
    kill = enemy => {
        this.current_enemies = this.current_enemies.filter(el => el.id != enemy.id);
    }
}