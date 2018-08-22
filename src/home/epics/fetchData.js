import { combineEpics } from 'redux-observable';
import { githubUserEpic } from '../ducks/fetchData';

export default combineEpics(githubUserEpic);
