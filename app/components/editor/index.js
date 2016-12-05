import React, { PureComponent, PropTypes } from 'react';

import '!style!css!sass!./index.scss';

import Controls from './controls';

export default class Editor extends PureComponent {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.textarea.value);
    }

    render() {
        const value = `
            MOVE_LEFT();
            MOVE_LEFT();
            MOVE_LEFT();
            MOVE_LEFT();
            MOVE_RIGHT();
            MOVE_RIGHT();
            MOVE_RIGHT();
            MOVE_RIGHT();
        `;

        return (
            <div className="editor-container">
                <div className="editor-area">
                    <strong>Algorithm</strong>
                    <form onSubmit={this.handleSubmit}>
                        <textarea
                            ref={(node) => { this.textarea = node; }}
                            id="algo"
                            name="algo"
                            value={value}
                            rows={30}
                        />
                        <input type="submit" value="Submit" />
                    </form>

                    <button onClick={this.props.onNext}>Play</button>
                </div>
                <Controls />
            </div>
        );
    }
}

Editor.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired
};
