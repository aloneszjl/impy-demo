import wepy from 'wepy';
import config from '../config';
import { paramsSerializer } from './url';

export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.referral = 'IFA';
  }

  getUrl(url, params) {
    let requestUrl = `${this.baseUrl}${url}`;
    if (params) {
      requestUrl = `${requestUrl}?${paramsSerializer(params)}&referral=${
        this.referral
      }`;
    }
    return requestUrl;
  }

  fetch(url, data, config) {
    const { params, ...rest } = config;
    return new Promise((resolve, reject) => {
      wepy.request({
        url: this.getUrl(url, params),
        data,
        success: response => {
          if (response.statusCode === 200) {
            resolve(response);
          } else {
            reject(response);
          }
        },
        ...rest
      });
    });
  }

  get(url, config = {}) {
    return this.fetch(url, null, { method: 'GET', ...config });
  }

  post(url, data, config = {}) {
    return this.fetch(url, data, { method: 'POST', ...config });
  }
}

const api = new Api(config.DOMAIN);
const gatewayApi = new Api(config.GATEWAY_DOMAIN);

export { api, gatewayApi };
