import React from 'react'
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (!notification || notification.message === null) {
    return <div id='no-notification-component'></div>;
  }

  const notificationStyle = notification.type
    ? { backgroundColor: 'green' }
    : { backgroundColor: 'red' };

  return (
    <div id='notification-component' style={notificationStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;
