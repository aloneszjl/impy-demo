import { combineReducers } from 'redux';
import get from 'lodash/get';
import { createAction } from 'redux-observable-utils';

export const NAME = 'AUTH';

export const LOGIN = `${NAME}/LOGIN`;
export const login = params => createAction(LOGIN, { params });

export const LOGOUT = `${NAME}/LOGOUT`;
export const logout = () => createAction(LOGOUT);

export const SET_ACCOUNT = `${NAME}/SET_ACCOUNT`;
export const setAcount = params => createAction(SET_ACCOUNT, { params });

const account = (state = null, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return action.params.account;
    default:
      return state;
  }
};

export const getAccount = state => get(state, `${NAME}.account`);
export const isAuthenticated = state => !!getAccount(state);

export default combineReducers({
  account
});
