import React, { useState } from 'react'
import SlotsInput from './SlotsInput'
import { useStyles } from '../style'

import { Grid } from '@material-ui/core'

function Dashboard() {
  const classes = useStyles()

  const [slots, setSlots] = useState(0)

  const updateSlots = (e) => setSlots(e.target.value)
  
  return (
    <Grid container className={classes.gridContainer}>
      <SlotsInput slots={slots} updateSlots={updateSlots}></SlotsInput>
    </Grid>
  )
}

export default Dashboard
