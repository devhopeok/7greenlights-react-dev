import './styles/index.scss';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import axios from 'axios';
import Config from 'Config';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import { reducer as burgerMenu } from 'redux-burger-menu';
import CookieStorage from 'redux-persist-cookie-storage';
import localForage from 'localForage';

import { Router, browserHistory } from 'react-router';
import { getRoutes } from './routes';

const reducer = combineReducers({ ...reducers, form: formReducer, burgerMenu });
const logger = createLogger(
  { predicate: () => process.env.NODE_ENV !== 'production' }
);

const persistWhiteList = ['loginReducer', 'commonReducer'];
const loginReducerFilter = createFilter(
  'loginReducer',
  ['user', 'authenticated']
);

const tooltipsFilter = createFilter(
  'commonReducer',
  ['showTooltips']
);

const enhancer = compose(
  autoRehydrate(),
  applyMiddleware(thunk, logger),
);

let persistor;
let store;

export function getPersistor() {
  return persistor;
}

/*Only for using in API service*/
export function getStore() {
  return store;
}

function configureStore() {
  return new Promise((resolve, reject) => {
    try {
      const store = createStore(
        reducer,
        undefined,
        enhancer,
      );

      let enableLocalStorage = true;
      try {
        window.localStorage.setItem('__u', 'u');
      } catch (e) {
        enableLocalStorage = false;
      }
      persistor = persistStore(
        store,
        {
          storage: enableLocalStorage ? localForage : new CookieStorage({
            expiration: {
              'default': null,
              'storeKey': 3600 * 24
            }
          }),
          whitelist: persistWhiteList,
          transforms: [loginReducerFilter, tooltipsFilter],
        },
        () => resolve(store)
      );
    } catch (e) {
      reject(e);
    }
  });
}

class ReduxAppWrapper extends Component {
  componentWillMount() {
    axios.defaults.headers.common['Content-Type'] = '*/*';
    axios.defaults.headers.common['Accept'] = '*/*';
    axios.defaults.baseURL = Config.serverUrl;
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          { getRoutes(store) }
        </Router>
      </Provider>
    );
  }

}

ReduxAppWrapper.propTypes = { store: PropTypes.object };

async function init() {
  store = await configureStore();
  ReactDOM.render(
    <ReduxAppWrapper store={store} />,
    document.getElementById('react-root')
  );
}

init();
