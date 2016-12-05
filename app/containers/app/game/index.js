import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Matter from 'matter-js';
import { AudioPlayer, Loop, Stage, World } from 'react-game-kit';

import { goToPreviousAppStep } from '../../../actions/app';
import { requestNextAction, playAction, onTick, goToNextGameStep } from '../../../actions/game';
import { fire, move, setShield } from '../../../actions/hero';

import Level from '../../../components/level';
import Hero from '../../../components/characters/hero';
import Laser from '../../../components/characters/laser';

import { getNextAction } from '../../../reducers/editor';

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
        // this.playAction = throttle(this.playAction.bind(this), 1000);
        //
        // if (props.nextAction) {
        //     this.playAction(props.nextAction);
        // }
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

    update() {
        const tick = (this.state.tick + 1) % MAX_TICKS;

        this.setState({ tick });
        this.props.onTick();

        if (tick % 2 === 0) {
            this.props.playAction(this.props.nextAction);
        }

        this.animationFrame = requestAnimationFrame(this.update);
    }

    render() {
        return (
            <Loop>
                <Stage style={{ background: '#5e3f6b' }}>
                    <World onInit={physicsInit}>
                        <Level tick={this.state.tick} />
                        <Hero
                            heroState={this.props.heroState}
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

    heroState: PropTypes.number.isRequired,
    heroPosition: PropTypes.object.isRequired,
    goToNextGameStep: PropTypes.func.isRequired,
    goToPreviousAppStep: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired,
    fire: PropTypes.func.isRequired,
    setShield: PropTypes.func.isRequired,

    playAction: PropTypes.func.isRequired,
    requestNextAction: PropTypes.func.isRequired,
    nextAction: PropTypes.object,

    onTick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    nextAction: getNextAction(state),
    bullets: state.bullets.bullets,
    gameStep: state.game.gameStep,
    isShieldActivated: state.hero.isShieldActivated,
    heroState: state.hero.heroState,
    heroPosition: state.hero.position
});

export default connect(mapStateToProps, {
    goToPreviousAppStep,
    goToNextGameStep,
    requestNextAction,
    playAction,
    move,
    fire,
    setShield,
    onTick
})(GameContainer);
