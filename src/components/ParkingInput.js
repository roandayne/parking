import React, { useContext } from 'react'
import { useStyles } from '../style'

import { Button, TextField, Typography } from '@material-ui/core'

function ParkingInput({ park, details, updateCarDetails }) {
  const classes = useStyles()

  return (
    <div className={classes.parkingInput}>
      <Typography>Fill in car details</Typography>
      <div className={classes.parkingInputGroup}>
        <TextField
          name='plateNumber'
          className={classes.parkingTextField}
          label='Plate Number'
          value={details.plateNumber}
          variant='outlined'
          onChange={updateCarDetails}
        />
        <TextField
          name='color'
          className={classes.parkingTextField}
          label='Color'
          value={details.color}
          variant='outlined'
          onChange={updateCarDetails}
        />
        <Button
          variant='contained'
          color='primary'
          className={`${classes.parkingTextField} ${classes.parkingButton}`}
          onClick={(e) => park(e)}
        >
          PARK
        </Button>
      </div>
    </div>
  )
}

export default ParkingInput
