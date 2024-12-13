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
const addNotificationSuccess = (message, description) => {
  notification.success({
    message: message,
    description: description,
    style: {
      width: 300,
    },
  });
};

export default AntDesignGlobals;

export { message, modal, notification, addNotificationSuccess };
