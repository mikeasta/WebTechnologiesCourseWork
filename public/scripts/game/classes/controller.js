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
        // Move left event
        entity.speed_up(-entity.force_acceleration, 0);
        entity.direction = "left"
    }

    moveRight = entity => {
        // Move right event
        entity.speed_up(entity.force_acceleration, 0);
        entity.direction = "right"
    }

    // Shoot
    shoot = entity => {
        entity.shoot()
    }

    // Setting up keyboard event listeners
    setupKeyboardListener = game => {
        // On mouse click
        document.addEventListener("click", (e) => {
            // Check if game is over
            if (game.gameover || game.finished) return;

            this.shoot(game.player)
        })

        // On button click
        document.addEventListener("keydown", (e) => {
            // Check if game is over
            if (game.gameover || game.finished) return;
    
            // Code of the pressed key (common for upper- and lowercase)
            const keyCode = e.code;
            console.log(keyCode)

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
            if (game.gameover || game.finished) return;
    
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


        // Interval for automatic key pressing
        const keyCheck = setInterval(() => {
            // Check if game is over
            if (game.gameover || game.finished) clearInterval(keyCheck);

            // Perform all buttons
            Object.keys(this.controller_keys).forEach( key => {
                if (this.controller_keys[key].pressed) 
                    this.controller_keys[key].perform(game.player)
            })
        }, 25)
    }
}
