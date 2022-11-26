import { Player } from "./player.js"
import { Controller } from "./controller.js"
import { Render } from "./render.js"
import { BoundaryEngine } from "./boundary_engine.js";

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

        // Keyboard listener setup
        this.controller.setupKeyboardListener(this);

        // Start game loop
        this.loop();
    }


    // Starting game loops
    loop = () => {
        // Define loop interval
        this.auto_render_loop = setInterval(this.render_engine.render, this.render_frequency);

        // Define player move loop
        this.auto_player_move = setInterval(this.move_player, this.render_frequency)

        // Clock update interval
        this.auto_clock_loop = setInterval(this.clock_tick, 1000);

        // Set player animation
        this.auto_player_forward_animation = setInterval(this.player.forward_animation, this.animation_frequency)
    }


    // Move player
    move_player = () => {
        this.player.move();
        this.player.resist();
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


    // Ending of game
    finish = () => {

        // Clear current loops
        clearInterval(this.auto_render_loop)
        clearInterval(this.auto_clock_loop)
        clearInterval(this.auto_player_move)

        // if game over
        if (this.gameover) {

        }

        // If game finished
        if (this.finished) {
            
        }
    }

    
    // Switch to the special level
    switch_to_level = (level_number) => {
        this.level = level_number;
        this.player.x = this.start_coordinates[this.level].x;
        this.player.y = this.start_coordinates[this.level].y;
    }
}