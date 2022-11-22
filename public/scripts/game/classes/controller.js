export class Controller {
    constructor() {}

    moveUp = (entity) => {
        // Move up event
        entity.y -= 1;
    }

    moveDown = (entity) => {
        // Move down event
        entity.y += 1;
    }

    moveleft = (entity) => {
        // Move up event
        entity.x -= 1;
    }

    moveRight = (entity) => {
        // Move up event
        entity.x += 1;
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

            // Render
            render_engine.render()
        });
    }
}
