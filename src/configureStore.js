import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'impy-storage';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import rootReducer from './ducks';
import rootEpic from './epics';
import auth from './containers/auth';

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];

// eslint-disable-next-line
if (NODE_ENV !== 'production') {
  const createLogger = require('redux-logger').createLogger;
  middlewares.push(createLogger());
}

const enhancer = compose(applyMiddleware(...middlewares));

const persistConfig = {
  key: 'root',
  whitelist: [auth.ducks.NAME],
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(persistedReducer, enhancer);
  const epic$ = new BehaviorSubject(rootEpic);
  const hotReloadingEpic = (...args) =>
    epic$.pipe(switchMap(epic => epic(...args)));

  epicMiddleware.run(hotReloadingEpic);

  persistStore(store);

  return store;
};

export default configureStore;
