import { combineReducers } from 'redux';
import auth from '../containers/auth';
import home from '../home';

const appReducer = combineReducers({
  [home.NAME]: home.reducer,
  [auth.ducks.NAME]: auth.reducer
});

const reducer = (state, action) => {
  if (action.type === auth.ducks.LOGOUT) {
    state = {};
  }
  return appReducer(state, action);
};

export default reducer;
