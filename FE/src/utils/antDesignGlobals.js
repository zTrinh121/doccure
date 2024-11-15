import { App } from 'antd';

let message;
let notification;
let modal;

const AntDesignGlobals = () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

export default AntDesignGlobals

export { message, modal, notification };