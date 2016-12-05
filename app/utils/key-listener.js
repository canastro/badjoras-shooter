export default class KeyListener {
    constructor() {
        this.keys = {};

        this.LEFT = 37;
        this.RIGHT = 39;
        this.UP = 38;
        this.DOWN = 40;
        this.SPACE = 32;
        this.SHIFT = 16;

        this.down = this.down.bind(this);
        this.up = this.up.bind(this);
    }

    down(event) {
        if (event.keyCode in this.keys) {
            event.preventDefault();
            this.keys[event.keyCode] = true;
        }
    }

    up(event) {
        if (event.keyCode in this.keys) {
            event.preventDefault();
            this.keys[event.keyCode] = false;
        }
    }

    isDown(keyCode) {
        return this.keys[keyCode] || false;
    }

    subscribe(keys) {
        window.addEventListener('keydown', this.down);
        window.addEventListener('keyup', this.up);

        keys.forEach((key) => {
            this.keys[key] = false;
        });
    }

    unsubscribe() {
        window.removeEventListener('keydown', this.down);
        window.removeEventListener('keyup', this.up);
        this.keys = {};
    }
}
