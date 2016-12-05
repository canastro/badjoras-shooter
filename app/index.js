import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/root';
import configureStore from './store/config-store';

const store = configureStore();
const rootEl = document.getElementById('root');

render(
    <AppContainer><Root store={store} /></AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./containers/root', () => {
        const RootContainer = require('./containers/root').default;
        render(
            <AppContainer>
                <RootContainer store={store} />
            </AppContainer>,
            rootEl
        );
    });
}
