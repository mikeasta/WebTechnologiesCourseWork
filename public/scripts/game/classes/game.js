export class Game {
    constructor () {
        // Level num
        this.level = 1;

        // Start timestamp
        this.startTime = new Date();

        // Game over flag
        this.gameover = false;

        // Game finished flag
        this.finished = false
    }

    start = () => {
        // Game start
    }

    loop = () => {
        // Game loop
    }

    finish = () => {
        // if game over
        if (this.gameover) {

        }

        // If game finished
        if (this.finished) {
            
        }
    }
}