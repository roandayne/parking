import React from 'react'
import { useStyles } from '../style'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

function Notification({ message, closeNotification, isOpen, isSuccess }) {
  const classes = useStyles()
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClick={closeNotification}>
      <Alert onClose={closeNotification} severity='success'>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
