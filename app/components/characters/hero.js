import React, { PureComponent, PropTypes } from 'react';
import Gamepad from 'html5-gamepad';
import Matter from 'matter-js';
import { Body, Sprite } from 'react-game-kit';
import { throttle } from 'throttle-debounce';

import KeyListener from '../../utils/key-listener';

const gamepad = new Gamepad();

export default class Hero extends PureComponent {
    constructor(props) {
        super(props);

        this.canShoot = 0;

        this.state = {
            playerState: 0
        };

        this.keys = new KeyListener();

        this.update = throttle(20, true, this.update).bind(this);
        this.move = this.move.bind(this);
    }

    componentDidMount() {
        this.context.loop.subscribe(this.update);

        this.keys.subscribe([
            this.keys.LEFT,
            this.keys.RIGHT,
            this.keys.UP,
            this.keys.DOWN,
            this.keys.SPACE,
            this.keys.SHIFT
        ]);
    }

    componentWillUnmount() {
        this.context.loop.unsubscribe(this.update);
        this.keys.unsubscribe();
    }

    onFire() {
        if (this.canShoot === 0) {
            this.props.onFire({
                x: this.props.heroPosition.x + (82 * this.context.scale),
                y: this.props.heroPosition.y + (30 * this.context.scale)
            });
            this.canShoot = 5;

            return;
        }

        this.canShoot -= 1;
    }

    getHeroStyles() {
        const { scale } = this.context;

        return {
            position: 'absolute',
            left: `${scale * 25}px`,
            top: '40px'
        };
    }

    getWrapperStyles() {
        const { scale } = this.context;
        const { x, y } = this.props.heroPosition;

        return {
            position: 'absolute',
            transform: `translate(${x * scale}px, ${y * scale}px)`,
            transformOrigin: 'left top'
        };
    }

    getShield() {
        if (!this.props.isShieldActivated) {
            return null;
        }

        return (
            <Sprite
                style={{ position: 'absolute' }}
                repeat={false}
                src="assets/v2/shield.png"
                scale={this.context.scale}
                state={0}
                steps={[0]}
                tileHeight={118}
                tileWidth={151}
            />
        );
    }

    move(x, y) {
        this.props.onMove(x, y);
        Matter.Body.setVelocity(this.body.body, { x, y });
    }

    update() {
        if (this.keys.isDown(this.keys.SHIFT)) {
            if (this.props.isShieldActivated) {
                return;
            }

            this.props.onSetShield(true);

            setTimeout(() => {
                this.props.onSetShield(false);
            }, 5000);
        }

        if (this.keys.isDown(this.keys.SPACE)) {
            this.onFire();
        }

        let playerState = 0;
        if (this.keys.isDown(this.keys.LEFT) || gamepad.button(0, 'button 14')) {
            playerState = 2;
            this.move(-10, 0);
        }

        if (this.keys.isDown(this.keys.RIGHT) || gamepad.button(0, 'button 15')) {
            playerState = 3;
            this.move(10, 0);
        }

        if (this.keys.isDown(this.keys.UP) || gamepad.button(0, 'button 12')) {
            playerState = 0;
            this.move(0, -10);
        }

        if (this.keys.isDown(this.keys.DOWN) || gamepad.button(0, 'button 13')) {
            playerState = 0;
            this.move(0, 10);
        }

        if (playerState === this.state.playerState) {
            return;
        }

        this.setState({ playerState });
    }

    render() {
        return (
            <div style={this.getWrapperStyles()}>
                <Body
                    args={[this.props.heroPosition.x, this.props.heroPosition.y, 99, 75]}
                    inertia={Infinity}
                    ref={(b) => { this.body = b; }}
                >
                    <div>
                        <Sprite
                            style={this.getHeroStyles()}
                            repeat={false}
                            src="assets/v2/player-sprite.png"
                            scale={this.context.scale}
                            state={this.state.playerState}
                            steps={[0, 0, 0, 0]}
                            tileHeight={75}
                            tileWidth={99}
                        />

                        {this.getShield()}
                    </div>
                </Body>
            </div>
        );
    }
}

Hero.contextTypes = {
    loop: PropTypes.object.isRequired,
    engine: PropTypes.object.isRequired,
    scale: PropTypes.number.isRequired
};

Hero.propTypes = {
    isShieldActivated: PropTypes.bool.isRequired,
    heroPosition: PropTypes.object.isRequired,
    onMove: PropTypes.func.isRequired,
    onFire: PropTypes.func.isRequired,
    onSetShield: PropTypes.func.isRequired
};
