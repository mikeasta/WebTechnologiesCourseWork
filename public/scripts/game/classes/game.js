import { Player } from "./player.js"
import { Controller } from "./controller.js"
import { Render } from "./render.js"

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
        this.finished = false

        // Game loop update frequency (ms)
        this.render_frequency = 100
    }

    start = () => {
        // Game start
        // Check if game is already started
        if (this.started) return

        // Change flag
        this.started = true;

        // Game managers setup
        this.player        = new Player();
        this.render_engine = new Render(this);
        this.controller    = new Controller();

        // Keyboard listener setup
        this.controller.setupKeyboardListener(this, this.player, this.render_engine);

        // Start game loop
        this.loop();
    }

    loop = () => {
        // Define loop interval
        this.auto_render_loop = setInterval(this.render_engine.render, this.render_frequency);

        // Clock update interval
        this.auto_clock_loop  = setInterval(this.clock_tick, 1000);
    }

    clock_tick = () => {
        const cur  = new Date().getTime();
        const diff = cur - this.startTime;

        let diffInSec = Math.floor(diff / 1000);
        let diffInMin = Math.floor(diffInSec / 60);
        diffInSec     = diffInSec - diffInMin * 60;

        if (diffInSec < 10) diffInSec = "0" + diffInSec;
        if (diffInMin < 10) diffInMin = "0" + diffInMin;

        this.clock.innerHTML = `Score: ${diffInMin}:${diffInSec}`
    }

    finish = () => {

        // Clear current loops
        clearInterval(this.auto_render_loop)
        clearInterval(this.auto_clock_loop)

        // if game over
        if (this.gameover) {

        }

        // If game finished
        if (this.finished) {
            
        }
    }
}