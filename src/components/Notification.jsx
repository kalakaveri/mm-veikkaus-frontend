import React from 'react'
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (!notification || notification.message === null) {
    return <div id='no-notification-component'></div>;
  }

  const open = notification.message !== null
    ? true
    : false

  return (
    <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity={notification.style} sx={{ width: '100%' }}>
          <AlertTitle />
          {notification.message}
        </Alert>
    </Snackbar>
  );
};

export default Notification;
