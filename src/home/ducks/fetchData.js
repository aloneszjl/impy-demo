import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import get from 'lodash/get';
import {
  createRequestByKeyEpicDucks,
  createNamePrefix
} from 'redux-observable-utils';
import { PARENT_NAME } from '../constants';
import * as api from '../api';
export const NAME = 'FETCH_DATA';
const PREFIXED_NAME = createNamePrefix(NAME, PARENT_NAME);

export const mapGithubUserNameToKey = action => get(action, 'params.userName');

export const {
  ducks: githubUserDucks,
  epic: githubUserEpic
} = createRequestByKeyEpicDucks({
  moduleName: PREFIXED_NAME,
  reducerName: 'GET_GITHUB_USER',
  api: api.getGithubUser,
  mapActionToKey: mapGithubUserNameToKey
});

export const getGithubUserDataByName = createSelector(
  githubUserDucks.selector,
  (state, params) => mapGithubUserNameToKey({ params }),
  (githubUserDucks, userName) => get(githubUserDucks, userName)
);

export const getGithubUserInfo = createSelector(
  getGithubUserDataByName,
  githubUserData => get(githubUserData, 'payload')
);

export const isFetchingData = createSelector(
  getGithubUserDataByName,
  githubUserData => get(githubUserData, 'isFetching')
);

export default combineReducers({
  [githubUserDucks.reducerName]: githubUserDucks.reducer
});
