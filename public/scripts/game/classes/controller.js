export class Controller {
    constructor() {}

    moveUp = (entity) => {
        // Move up event
        entity.y -= 10;
    }

    moveDown = (entity) => {
        // Move down event
        entity.y += 10;
    }

    moveLeft = (entity) => {
        // Move up event
        entity.x -= 10;
        entity.direction = "left"
    }

    moveRight = (entity) => {
        // Move up event
        entity.x += 10;
        entity.direction = "right"
    }

    setupKeyboardListener = (game, movable_entity, render_engine) => {
        document.addEventListener("keydown", (e) => {
            // Check if game is over
            if (game.gameover) return;
    
            // Code of the pressed key (common for upper- and lowercase)
            const keyCode = e.code;

            // Initialize controller
            const controller = new Controller()
    
            // Move player
            switch (keyCode){
                case "KeyA": controller.moveLeft(movable_entity);  break;
                case "KeyD": controller.moveRight(movable_entity); break;
                case "KeyW": controller.moveUp(movable_entity);    break;
                case "KeyS": controller.moveDown(movable_entity);  break; 
            }

            console.log(keyCode)

            // Render
            render_engine.render()
        });
    }
}
