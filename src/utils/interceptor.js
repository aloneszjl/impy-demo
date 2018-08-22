import { failure } from './toast';

const defaultErrorMessage = '网络错误';
const errorMessage = {
  401: '用户名或密码错误',
  500: '请求错误',
  400: '请求参数错误'
};

const getErrorMessage = statusCode =>
  errorMessage[statusCode] || defaultErrorMessage;

class Interceptor {
  constructor(app, store) {
    this.app = app;
    this.store = store;
    this.init();
  }

  handleError = res => failure(getErrorMessage(res.statusCode));

  handleSuccess = res => res;

  handleRequest = config => config;

  init() {
    this.app.intercept('request', {
      config: this.handleRequest,
      success: res => {
        if (res.statusCode !== 200) {
          this.handleError(res);
        }
        return this.handleSuccess(res);
      },
      fail: res => {
        this.handleError(res);
        return res;
      },
      complete: res => res
    });
  }
}

export default (app, store) => new Interceptor(app, store);
