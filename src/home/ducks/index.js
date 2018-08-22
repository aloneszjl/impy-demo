import { combineReducers } from 'redux';
import fetchDataReducer, { NAME as fetchDataName } from './fetchData';

export default combineReducers({
  [fetchDataName]: fetchDataReducer
});
