import wepy from 'wepy';
import { paramsSerializer } from './url';

/**
 * @function goLogin
 */
export const goLogin = parmas =>
  wepy.navigateTo({
    url: `/pages/login?${paramsSerializer(parmas)}`
  });
