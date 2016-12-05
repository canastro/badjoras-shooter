import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { goToNextAppStep } from '../../../actions/app';

import Intro from '../../../components/intro';
import GameContainer from '../game';

class Presentation extends PureComponent {
    render() {
        this.gameStates = [
            <Intro onStart={this.props.goToNextAppStep} />,
            <GameContainer />
        ];

        return this.gameStates[this.props.appStep];
    }
}

Presentation.propTypes = {
    appStep: PropTypes.number.isRequired,
    goToNextAppStep: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        appStep: state.app.appStep
    };
}

export default connect(mapStateToProps, { goToNextAppStep })(Presentation);
