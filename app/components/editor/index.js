import React, { PureComponent, PropTypes } from 'react';

import '!style!css!sass!./index.scss';

import Controls from './controls';

export default class Editor extends PureComponent {
    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if (e.keyCode === 13) {
            this.props.onNext();
        }
    }

    render() {
        return (
            <div className="editor-container">
                <div className="editor-area">
                    <strong>Algorithm</strong>
                </div>
                <Controls />
            </div>
        );
    }
}

Editor.propTypes = {
    onNext: PropTypes.func.isRequired
};
