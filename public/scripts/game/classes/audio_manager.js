export class AudioManager {
    constructor (game) {
        // Game
        this.game = game;

        // Play music
        this.music_able = true

        // * AUDIO SOUNDS
        this.background   = new Audio("assets/sound/background.mp3")
        this.boss_fight   = new Audio("assets/sound/boss_fight.mp3")
        this.player_death = new Audio("assets/sound/player_death.mp3")
        this.player_hurt  = new Audio("assets/sound/player_hurt.mp3")
        this.run_sound    = new Audio("assets/sound/run_sound.ogg")

        this.audio_run_list = {}
    }


    // Turn on audio manager
    turn_on = () => {
        this.music_able = true;
        this.background.play();
    }


    // Turn off audio manager
    turn_off = () => {
        this.music_able = false;
        this.background.pause();
        this.boss_fight.pause();
        this.player_death.pause();
        this.player_hurt.pause();
        this.run_sound.pause();
        this.shoot.pause();
    }


    // Play boss fight
    play_boss_fight = () => {
        if (this.music_able) this.boss_fight.play();
    }


    // Play player death
    play_player_death = () => {
        if (this.music_able) this.player_death.play();
    }

    // Play player hurt
    play_player_hurt = () => {
        if (this.music_able) this.player_hurt.play();
    }

    // Play run sound
    play_run_sound = source => {
        if (this.music_able) {
            if (!this.audio_run_list[source]) {
                this.audio_run_list[source] = true;
                new Audio("assets/sound/run_sound.ogg").play()
                setTimeout(
                    () => {
                        this.audio_run_list[source] = false;
                    }, 670)
            }
        }
    }

    // Play shoot
    play_shoot = () => {
        if (this.music_able) { 
            new Audio("assets/sound/shoot.mp3").play() 
        };
    }
}