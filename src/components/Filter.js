import React from 'react'
import { useStyles } from '../style'
import { TextField, Typography } from '@material-ui/core'

function Filter({ filter }) {
  const classes = useStyles()

  return (
    <div className={classes.parkingInput}>
      <Typography>Filter by</Typography>
      <div className={classes.parkingInputGroup}>
        <TextField
          name='color'
          className={classes.parkingTextField}
          label='Color'
          variant='outlined'
          onChange={filter}
        />
        <TextField
          name='plateNumber'
          className={classes.parkingTextField}
          label='Plate Number'
          variant='outlined'
          onChange={filter}
        />
      </div>
    </div>
  )
}

export default Filter
