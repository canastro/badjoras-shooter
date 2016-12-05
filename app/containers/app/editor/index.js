import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { goToNextAppStep } from '../../../actions/app';
import { submitCode } from '../../../actions/editor';

import Editor from '../../../components/editor';

class EditorContainer extends PureComponent {
    render() {
        return (
            <Editor
                onSubmit={this.props.submitCode}
                onNext={this.props.goToNextAppStep}
            />
        );
    }
}

EditorContainer.propTypes = {
    submitCode: PropTypes.func.isRequired,
    goToNextAppStep: PropTypes.func.isRequired
};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, {
    goToNextAppStep,
    submitCode
})(EditorContainer);
