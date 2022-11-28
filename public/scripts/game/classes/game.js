import { Player } from "./player.js"
import { Controller } from "./controller.js"
import { Render } from "./render.js"
import { BoundaryEngine } from "./boundary_engine.js";
import { BulletEngine } from "./bullet_engine.js";
import { EnemyManager } from "./enemy_manager.js";

export class Game {
    constructor () {
        // Level num
        this.level = 1;

        // Start timestamp
        this.startTime = new Date().getTime();

        // Clock DOM element
        this.clock = document.getElementById("playerScore")

        // Game started
        this.started = false;

        // Game over flag
        this.gameover = false;

        // Game finished flag
        this.finished = false;

        // Game loop update frequency (ms)
        this.render_frequency = 50;

        // Game animation frequency (ms)
        this.animation_frequency = 250;

        // Player reload update frequency
        this.player_reload_frequency = this.render_frequency * 1.5;

        // Enemy reload update frequency
        this.enemy_reload_frequency = this.render_frequency * 3.5;

        // Tile size (for collisions check)
        this.tile_size = 64;

        // Offset 
        this.global_offset = { x: 750, y: 400 }

        // Start point
        this.start_coordinates = {
            "1": { x: 0, y: 0 },
            "2": { x: 150, y: 2600 }
        }
    }


    // Game start func
    start = () => {
        // Game start
        // Check if game is already started
        if (this.started) return

        // Change flag
        this.started = true;

        // Game managers setup
        this.player = new Player(
            this, 
            this.start_coordinates[this.level].x,
            this.start_coordinates[this.level].y,
        );
        this.render_engine = new Render(this);
        this.controller    = new Controller();
        this.boundary      = new BoundaryEngine(this);
        this.bullet_engine = new BulletEngine(this)
        this.enemy_manager = new EnemyManager(this);

        // Keyboard listener setup
        this.controller.setupKeyboardListener(this);

        // Start game loop
        this.loop();
    }


    // Starting game loops
    loop = () => {
        // Define rule loop interval
        this.auto_rule_loop = setInterval(
            this.check_ending, 
            this.render_frequency
        );

        // Define loop interval
        this.auto_render_loop = setInterval(
            this.render_engine.render, 
            this.render_frequency
        );

        // Define player move loop
        this.auto_player_move = setInterval(
            this.move_player, 
            this.render_frequency
        );

        // Define enemies move loop
        this.auto_enemy_move = setInterval(
            this.move_enemies, 
            this.render_frequency
        );

        // Define enemy check range loop
        this.auto_enemy_range_check = setInterval(
            this.enemy_manager.all_check_range,
            this.render_frequency
        )

        // Define enemy shoot ability loop
        this.auto_enemy_shoot = setInterval(
            this.enemy_manager.all_shoot,
            this.render_frequency
        )

        // Define bullet move loop
        this.auto_bullets_move = setInterval(
            this.bullet_engine.move_bullets, 
            this.render_frequency
        );

        // Define player reload stage loop
        this.auto_player_reload = setInterval(
            this.player_reload, 
            this.player_reload_frequency
        );

        // Define enemy reload stage loop
        this.auto_enemy_reload = setInterval(
            this.enemy_manager.all_reload,
            this.enemy_reload_frequency
        )

        // Clock update interval
        this.auto_clock_loop = setInterval(this.clock_tick, 1000);

        // Set player animation
        this.auto_player_forward_animation = setInterval(
            this.player.forward_animation, 
            this.animation_frequency
        );
    
        // Set enemy animation
        this.auto_enemy_forward_animation = setInterval(
            this.enemy_manager.all_forward_animation, 
            this.animation_frequency
        );
    }


    // Move player
    move_player = () => {
        this.player.move();
        this.player.resist();
    }

    
    // Move enemies
    move_enemies = () => {
        this.enemy_manager.enemy_movement_manager.speed_up_all_enemies()
    }


    // Reload player gun
    player_reload = () => {
        if (this.player.on_reload)
            this.player.reload_stage++;

        if (this.player.reload_stage > 6) {
            this.player.on_reload    = false;
            this.player.reload_stage = 0;
        }
    }

    
    // UI timer 
    clock_tick = () => {
        this.clock.innerHTML = `Score: ${this.get_current_timer()}`
    }


    // Get current score (timer)
    get_current_timer = () => {
        const cur  = new Date().getTime();
        const diff = cur - this.startTime;

        let diffInSec = Math.floor(diff / 1000);
        let diffInMin = Math.floor(diffInSec / 60);
        diffInSec     = diffInSec - diffInMin * 60;

        if (diffInSec < 10) diffInSec = "0" + diffInSec;
        if (diffInMin < 10) diffInMin = "0" + diffInMin;

        return `${diffInMin}:${diffInSec}`
    }


    // Check ending
    check_ending = () => {
        if (this.gameover || this.finished) this.finish(true);
    }


    // Clear all first-order loops
    clear_first_order_loops = () => {
        clearInterval(this.auto_rule_loop)
        clearInterval(this.auto_player_move)
        clearInterval(this.auto_enemy_move)
        clearInterval(this.auto_enemy_range_check)
        clearInterval(this.auto_enemy_shoot)
        clearInterval(this.auto_bullets_move)
        clearInterval(this.auto_player_reload)
        clearInterval(this.auto_enemy_reload)
        clearInterval(this.auto_clock_loop)
    }

    // Clear all second-order loops (rendering and animation)
    clear_second_order_loops = () => {
        clearInterval(this.auto_player_forward_animation)
        clearInterval(this.auto_enemy_forward_animation)
        clearInterval(this.auto_render_loop)
    }


    // Ending of game
    finish = (need_to_ending_block = false) => {
        // Clear current loops
        this.clear_first_order_loops()

        // Save data in localStorage
        let leaderboards = JSON.parse(localStorage["leaderboards"]);
        let nickname = JSON.parse(localStorage["player.nickname"]);

        // New record object
        const newScore = {
            name: nickname.nickname, 
            score: this.get_current_timer()
        }

        // Check if there are already record with this name
        let filtered = leaderboards.leaderboards.filter(record => record.name === newScore.name)
        if (filtered.length) {
            leaderboards.leaderboards.forEach(record => {
                if (record.name === newScore.name) {
                    if (record.score > newScore.score) 
                        record.score = newScore.score
                }
            })
        } else {
            leaderboards.leaderboards.push(newScore)
        }

        // Saving and updatin data
        localStorage["leaderboards"] = JSON.stringify(leaderboards);
        localStorage["player.nickname"] = JSON.stringify({});

        // DOM elements for final result
        const endingBlock = document.getElementById("ending_flag");
        const endingCause = document.getElementById("ending_cause");
        const endingScore = document.getElementById("ending_score");

        // If there is need to show ending block
        if (need_to_ending_block) {
            endingBlock.style.display = "flex";
            endingScore.innerHTML = `Name: ${newScore.name}, score: ${newScore.score}`;

            // if game over
            if (this.gameover) {
                endingBlock.style.backgroundColor = "#e74c3c";
                endingCause.innerHTML = "Game over!"
            }

            // If game finished
            if (this.finished) {
                endingBlock.style.backgroundColor = "#1abc9c";
                endingCause.innerHTML = "Finish!"
            }
        } 
    }

    
    // Switch to the special level
    switch_to_level = (level_number) => {
        // Change level parameter
        this.level    = level_number;

        // Change player coords to start of the next level
        this.player.x = this.start_coordinates[this.level].x;
        this.player.y = this.start_coordinates[this.level].y;

        // Change interface level flag
        const level_html_el = document.getElementById("playerLevel");
        level_html_el.innerHTML = `Level: ${this.level}`;

        // Change enemies set
        this.enemy_manager.update_enemies();
    }
}