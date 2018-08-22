import { combineEpics } from 'redux-observable';
import auth from '../containers/auth';
import home from '../home';

export default combineEpics(auth.epic, home.epic);
