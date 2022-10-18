import React from 'react'
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (!notification || notification.message === null) {
    return <div id='no-notification-component'></div>;
  }

  const notificationStyle = notification.type
    ? 'success'
    : 'error'

  return (
    <Snackbar open={notification} autoHideDuration={6000}>
        <Alert severity={notificationStyle} sx={{ width: '100%' }}>
        {notification.message}
        </Alert>
      </Snackbar>
  );
};

export default Notification;
