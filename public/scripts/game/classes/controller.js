export class Controller {
    constructor() {
        // Pressed shows if current button pressed
        // Perform is a function that need to be performed
        // if key is pressed
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


    // Move up event
    moveUp = entity => {
        entity.speed_up(0, -entity.force_acceleration);
    }


    // Move down event
    moveDown = entity => {
        entity.speed_up(0, entity.force_acceleration);
    }


    // Move left event
    moveLeft = entity => {
        entity.speed_up(-entity.force_acceleration, 0);
        if (entity.state != "shoot")
            entity.direction = "left"
    }


    // Move right event
    moveRight = entity => {
        entity.speed_up(entity.force_acceleration, 0);
        if (entity.state != "shoot")
            entity.direction = "right"
    }


    // Shoot
    shoot = (entity, coords) => {
        entity.shoot(coords.x, coords.y)
    }

    
    // Setting up keyboard event listeners
    setupKeyboardListener = game => {
        // On mouse click
        document.addEventListener("click", (e) => {
            // Check if game is over
            if (game.gameover || game.finished) return;

            // Mouse click - player shoot
            this.shoot(game.player)
        })

        // On button click
        document.addEventListener("keydown", (e) => {
            // Check if game is over
            if (game.gameover || game.finished) return;
    
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
            // Check if game is over to stop key check
            if (game.gameover || game.finished) clearInterval(keyCheck);

            // Perform all buttons
            Object.keys(this.controller_keys).forEach( key => {
                if (this.controller_keys[key].pressed) 
                    this.controller_keys[key].perform(game.player)
            })
        }, 25)
    }
}
