import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';

// import DevTools from '../containers/dev-tools';
import rootReducer from '../reducers';

const finalCreateStore = compose(
    applyMiddleware(
        // createLogger(),
        thunk
    ),
    //DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers').default)
        );
    }

    return store;
}
