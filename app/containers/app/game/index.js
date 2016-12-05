import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Matter from 'matter-js';
import { AudioPlayer, Loop, Stage, World } from 'react-game-kit';

import { goToPreviousAppStep } from '../../../actions/app';
import { onTick, goToNextGameStep } from '../../../actions/game';
import { fire, move, setShield } from '../../../actions/hero';

import Level from '../../../components/level';
import Hero from '../../../components/characters/hero';
import Laser from '../../../components/characters/laser';

const MAX_TICKS = 100;

const physicsInit = (engine) => {
    const ground = Matter.Bodies.rectangle(
        512 * 3, 448,
        1024 * 3, 64,
        {
            render: { visible: true, strokeStyle: '#ffffff' },
            isStatic: true
        },
    );

    const leftWall = Matter.Bodies.rectangle(
        10, 10,
        10, 576,
        {
            render: { visible: true, strokeStyle: '#ffffff' },
            isStatic: true
        },
    );

    const rightWall = Matter.Bodies.rectangle(
        3008, 288,
        64, 576,
        {
            render: { visible: true, strokeStyle: '#ffffff' },
            isStatic: true
        },
    );

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
};

class GameContainer extends PureComponent {
    constructor(props) {
        super(props);

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.context = window.context || new AudioContext();

        this.state = {
            tick: 0
        };

        this.update = this.update.bind(this);
        // this._onCollision = this._onCollision.bind(this);
    }

    componentDidMount() {
        this.player = new AudioPlayer('/assets/music.wav', () => {
            this.stopMusic = this.player.play({ loop: true, offset: 1, volume: 0.35 });
        });

        this.animationFrame = requestAnimationFrame(this.update);
    }

    componentWillUnmount() {
        this.stopMusic();

        cancelAnimationFrame(this.animationFrame);
    }

    // _onCollision(key) {
    //     console.log('_onCollision 1');
    //
    //     return () => {
    //         console.log('_onCollision 2');
    //         const bullets = { ...this.state.bullets };
    //         delete bullets[key];
    //         console.log('bullets: ', bullets);
    //
    //         this.setState({
    //             bullets
    //         });
    //     };
    // }

    update() {
        const tick = (this.state.tick + 1) % MAX_TICKS;

        this.setState({ tick });
        this.props.onTick();
        this.animationFrame = requestAnimationFrame(this.update);
    }

    render() {
        return (
            <Loop>
                <Stage style={{ background: '#5e3f6b' }}>
                    <World onInit={physicsInit}>
                        <Level tick={this.state.tick} />
                        <Hero
                            heroPosition={this.props.heroPosition}
                            isShieldActivated={this.props.isShieldActivated}
                            onMove={this.props.move}
                            onFire={this.props.fire}
                            onSetShield={this.props.setShield}
                        />

                        {Object.keys(this.props.bullets).map((key) => {
                            const bullet = this.props.bullets[key];
                            return (
                                <Laser key={key} {...bullet} />
                            );
                        })}
                    </World>
                </Stage>
            </Loop>
        );
    }
}

GameContainer.propTypes = {
    gameStep: PropTypes.number.isRequired,
    bullets: PropTypes.object.isRequired,
    isShieldActivated: PropTypes.bool.isRequired,
    heroPosition: PropTypes.object.isRequired,
    goToNextGameStep: PropTypes.func.isRequired,
    goToPreviousAppStep: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired,
    fire: PropTypes.func.isRequired,
    setShield: PropTypes.func.isRequired,
    onTick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    bullets: state.bullets.bullets,
    gameStep: state.game.gameStep,
    isShieldActivated: state.hero.isShieldActivated,
    heroPosition: state.hero.position
});

export default connect(mapStateToProps, {
    goToPreviousAppStep,
    goToNextGameStep,
    move,
    fire,
    setShield,
    onTick
})(GameContainer);
