import React from 'react'
import { useStyles } from '../style'
import { TextField, Typography } from '@material-ui/core'

function Filter({ filter, 
  // filteredByPlateNumber, 
  // filteredByColor 
}) {
  const classes = useStyles()

  return (
    <div className={classes.parkingInput}>
      <Typography>Filter by</Typography>
      <div className={classes.parkingInputGroup}>
        <TextField
          name='color'
          className={classes.parkingTextField}
          label='Color'
          // value={filteredByColor}
          variant='outlined'
          onChange={filter}
        />
        <TextField
          name='plateNumber'
          className={classes.parkingTextField}
          label='Plate Number'
          // value={filteredByPlateNumber}
          variant='outlined'
          onChange={filter}
          // onChange={updateCarDetails}
        />
      </div>
    </div>
  )
}

export default Filter
