import wepy from 'wepy';
import get from 'lodash/get';

const Page = wepy.page;

export const getCurrentPage = () => {
  const pages = new Page().getCurrentPages() || [];
  return pages[(pages, pages.length - 1)];
};

export const getCurrentRoute = get(getCurrentPage(), 'route');

export const isLoginPage = () => getCurrentRoute() === 'pages/auth/login';
