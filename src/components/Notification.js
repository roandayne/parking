import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}
function Notification({ message, closeNotification, isOpen, isSuccess }) {
  console.log(isSuccess)
  return (
    <Snackbar open={isOpen} autoHideDuration={4000} onClick={closeNotification}>
      <Alert
        onClose={closeNotification}
        severity={isSuccess ? 'success' : 'error'}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
