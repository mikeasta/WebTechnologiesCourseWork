export class Controller {
    constructor() {
        this.controller_keys = {
            "KeyA": { 
                pressed: false, 
                perform: (e) => this.moveLeft(e)
            },
            "KeyD": { 
                pressed: false, 
                perform: (e) => this.moveRight(e)
            },
            "KeyW": { 
                pressed: false, 
                perform: (e) => this.moveUp(e)
            },
            "KeyS": { 
                pressed: false, 
                perform: (e) => this.moveDown(e)
            }
        }
    }

    moveUp = entity => {
        // Move up event
        entity.speed_up(0, -entity.force_acceleration);
    }

    moveDown = entity => {
        // Move down event
        entity.speed_up(0, entity.force_acceleration);
    }

    moveLeft = entity => {
        // Move up event
        entity.speed_up(-entity.force_acceleration, 0);
        entity.direction = "left"
    }

    moveRight = entity => {
        // Move up event
        entity.speed_up(entity.force_acceleration, 0);
        entity.direction = "right"
    }

    setupKeyboardListener = game => {

        // On button click
        document.addEventListener("keydown", (e) => {
            // Check if game is over
            if (game.gameover) return;
    
            // Code of the pressed key (common for upper- and lowercase)
            const keyCode = e.code;

            // Change key info
            if (this.controller_keys[keyCode])
                this.controller_keys[keyCode].pressed = true

            // Perform all buttons
            Object.keys(this.controller_keys).forEach( key => {
                if (this.controller_keys[key].pressed) 
                    this.controller_keys[key].perform(game.player)
            })
        });


        // On button un-click
        document.addEventListener("keyup", (e) => {
            // Check if game is over
            if (game.gameover) return;
    
            // Code of the pressed key (common for upper- and lowercase)
            const keyCode = e.code;

            // Change key info
            if (this.controller_keys[keyCode])
                this.controller_keys[keyCode].pressed = false

            // Perform all buttons
            Object.keys(this.controller_keys).forEach( key => {
                if (this.controller_keys[key].pressed) 
                    this.controller_keys[key].perform(game.player)
            })
        });


        const keyCheck = setInterval(() => {
            // Check if game is over
            if (game.gameover) clearInterval(keyCheck);

            // Perform all buttons
            Object.keys(this.controller_keys).forEach( key => {
                if (this.controller_keys[key].pressed) 
                    this.controller_keys[key].perform(game.player)
            })
        }, 50)
    }
}
