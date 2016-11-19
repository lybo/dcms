// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from '../reducers'
//
// export default function configureStore(initialState) {
//     const createStoreWithMiddleware = applyMiddleware(
//         thunk
//     )(createStore);
//     const store = createStoreWithMiddleware(rootReducer, initialState)
//     // const store = applyMiddleware(thunk)(createStore(rootReducer, initialState))
//
//     if (module.hot) {
//         // Enable Webpack hot module replacement for reducers
//         module.hot.accept('../reducers', () => {
//             const nextReducer = require('../reducers')
//             store.replaceReducer(nextReducer)
//         })
//     }
//
//     return store
// }

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk'
import DevTools from '../containers/DevTools';
import { persistState } from 'redux-devtools';

const finalCreateStore = compose(
    // Middleware you want to use in development:
    applyMiddleware(
        thunk
    ),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument(),
    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
        );
    }

    return store;
}
