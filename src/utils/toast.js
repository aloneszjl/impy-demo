import wepy from 'wepy';

const toast = config =>
  wepy.showToast({
    title: config.message,
    icon: config.icon,
    duration: 500
  });

const success = message =>
  toast({
    message,
    icon: 'success'
  });

const loading = message =>
  toast({
    message,
    icon: 'loading'
  });

const failure = loading;

export { success, failure, loading };
