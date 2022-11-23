export class Controller {
    constructor() {}

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
        document.addEventListener("keydown", (e) => {
            // Check if game is over
            if (game.gameover) return;
    
            // Code of the pressed key (common for upper- and lowercase)
            const keyCode = e.code;

            // Initialize controller
            const controller = new Controller()
    
            // Move player
            switch (keyCode){
                case "KeyA": controller.moveLeft(game.player);  break;
                case "KeyD": controller.moveRight(game.player); break;
                case "KeyW": controller.moveUp(game.player);    break;
                case "KeyS": controller.moveDown(game.player);  break; 
            }
        });
    }
}
