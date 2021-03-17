import React from 'react'
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { useStyles } from '../style'

function Navigation() {
  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          PARKING
        </Typography>
        <Button color='inherit' component={Link} to='/'>
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
