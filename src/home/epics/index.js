import { combineEpics } from 'redux-observable';
import fetchDataEpic from './fetchData';

export default combineEpics(fetchDataEpic);
