export class Player {
    constructor() {
        // Direction of player model: "left" or "right"
        this.direction = "right";

        // Player start health (in DMG)
        this.health = 100;

        // Player start damage (in DMG)
        this.damage = 10;

        // Player start perks
        this.perks = [];

        // Player position
        this.x = 0;
        this.y = 0;
    }

    
}