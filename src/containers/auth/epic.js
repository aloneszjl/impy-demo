import wepy from 'wepy';
import { combineEpics, ofType } from 'redux-observable';
import get from 'lodash/get';
import { filter, tap, ignoreElements, switchMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ducks from './ducks';
import { success, failure } from '../../utils/toast';

const loginSuccessEpic = action$ =>
  action$.pipe(
    ofType(ducks.LOGIN),
    filter(action => !!get(action, 'params.detail.userInfo')),
    tap(() => success('授权成功')),
    switchMap(action =>
      of(ducks.setAcount({ account: get(action, 'params.detail.userInfo') }))
    ),
    delay(500),
    tap(() => wepy.navigateBack())
  );

const loginFailureEpic = action$ =>
  action$.pipe(
    ofType(ducks.LOGIN),
    filter(action => !get(action, 'params.detail.userInfo')),
    tap(() => failure('授权失败')),
    ignoreElements()
  );

const logoutEpic = action$ =>
  action$.pipe(
    ofType(ducks.LOGOUT),
    tap(() => success('登出成功')),
    ignoreElements()
  );

export default combineEpics(loginSuccessEpic, loginFailureEpic, logoutEpic);
