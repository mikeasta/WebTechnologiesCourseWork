import { Enemy } from "./enemy.js";
import {
    level_1_enemies,
    level_2_enemies,
    level_2_boss
} from "../data/level_enemies.js";
import { EnemyMovementManager } from "./enemy_movement_manager.js";

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

        level_2_boss.forEach((row, i) => {
            row.forEach((symbol, j) => {
                // If there enemy
                if (symbol === 1) {
                    const boss = new Enemy(
                        game,
                        j * this.game.tile_size,
                        i * this.game.tile_size,
                    )
                    boss.boss = true
                    this.level_2_enemies.push(boss)
                }
            })
        });

        // Current enemies list
        this.current_enemies = this.choose_current_enemy_list()

        // Enemies movement manager
        this.enemy_movement_manager = new EnemyMovementManager(game);

        // Aggro range
        this.aggro_range  = 750;
        this.attack_range = 300;
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

    // Check all distances
    all_check_range = () => {
        let distance = 0;
        this.current_enemies.forEach(enemy => {
            distance = Math.sqrt(
                Math.pow(this.game.player.x + this.game.global_offset.x - enemy.x, 2) + 
                Math.pow(this.game.player.y + this.game.global_offset.y - enemy.y, 2)
            )

            if (distance > this.aggro_range) {
                enemy.stalking  = false;
                enemy.attacking = false;
            } else if (distance <= this.aggro_range && distance > this.attack_range) {
                enemy.stalking  = true;
                enemy.attacking = false;
                
                // If its boss
                if(enemy.boss) {
                    this.game.audio_manager.play_boss_fight()
                }
            } else if (distance <= this.attack_range) {
                enemy.stalking  = false;
                enemy.attacking = true;
            }
        })
    }


    // Check all enemies to shoot
    all_shoot = () => {
        this.current_enemies.forEach(enemy => {
            if (enemy.attacking) {
                console.log("attacks");
                enemy.shoot(
                    this.game.player.x + this.game.global_offset.x,
                    this.game.player.y + this.game.global_offset.y
                )
            }
        });
    }

    
    // Check all enemies to reload
    all_reload = () => {
        this.current_enemies.forEach(enemy => {
            if (enemy.on_reload)
                enemy.reload_stage++;

            if (enemy.reload_stage > 6) {
                enemy.on_reload    = false;
                enemy.reload_stage = 0;
            }
        });
    }
}