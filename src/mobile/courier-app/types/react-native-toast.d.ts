declare module 'react-native-toast' {
  import * as React from 'react';

  export interface ToastProps {
    [key: string]: any;
  }

  const Toast: React.ComponentType<ToastProps>;
  export default Toast;
}
