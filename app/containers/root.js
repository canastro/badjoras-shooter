import React, { PureComponent, PropTypes } from 'react';
import { Provider } from 'react-redux';

import '!style!css!sass!./root.scss';

import Presentation from './app/presentation';

export default class Root extends PureComponent {
    render() {
        return (
            <Provider store={this.props.store}>
                <Presentation />
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};
