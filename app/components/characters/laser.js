import React, { Component, PropTypes } from 'react';
import { Body, Sprite } from 'react-game-kit';

export default class Laser extends Component {
    getWrapperStyles() {
        const { scale } = this.context;

        return {
            position: 'absolute',
            transform: `translate(${this.props.position.x * scale}px, ${this.props.position.y * scale}px)`,
            transformOrigin: 'left top'
        };
    }

    render() {
        return (
            <div style={this.getWrapperStyles()}>
                <Body
                    args={[this.props.position.x, this.props.position.y, 9, 33]}
                    inertia={Infinity}
                    ref={(b) => { this.body = b; }}
                >
                    <Sprite
                        repeat={false}
                        src="assets/v2/laser-green.png"
                        scale={this.context.scale}
                        state={0}
                        steps={[0, 0, 0, 0]}
                        tileWidth={9}
                        tileHeight={33}
                    />
                </Body>
            </div>
        );
    }
}

Laser.contextTypes = {
    engine: PropTypes.object.isRequired,
    scale: PropTypes.number.isRequired
};

Laser.propTypes = {
    position: PropTypes.object.isRequired
};
