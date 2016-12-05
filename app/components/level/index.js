import React, { PureComponent, PropTypes } from 'react';

import LevelBackground from './background';

// const generateBackground = (n) => {
//     const stars = [];
//
//     for (let i = 0; i !== n; i += 1) {
//         stars.push(Math.random() > 0.9 ? 1 : 0);
//     }
//
//     return [stars];
// };

export default class Level extends PureComponent {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         stageY: -500,
    //         stars: generateBackground(1000)
    //     };
    //
    //     this.update = this.update.bind(this);
    // }
    //
    // componentDidMount() {
    //     this.animationFrame = requestAnimationFrame(this.update);
    // }
    //
    // componentWillUnmount() {
    //     cancelAnimationFrame(this.animationFrame);
    // }

    // getWrapperStyles() {
    //     return {
    //         position: 'absolute',
    //         transform: `translate(0px, ${this.state.stageY}px) translateZ(0)`,
    //         transformOrigin: 'top left'
    //     };
    // }

    // update() {
    //     this.setState({ stageY: this.state.stageY + 5 });
    //     this.animationFrame = requestAnimationFrame(this.update);
    // }

    render() {
        return (
            <div className="level-wrapper">
                <LevelBackground src={'assets/v2/background/black.png'} repeat position={this.props.tick} />
            </div>
        );
    }
}

Level.contextTypes = {
    scale: PropTypes.number.isRequired
};

Level.propTypes = {
    tick: PropTypes.number.isRequired
};
