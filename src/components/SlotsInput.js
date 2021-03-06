import React from 'react'

import {
  Card,
  CardActions,
  CardContent,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from '@material-ui/core'
import { useStyles } from '../style'

function SlotsInput({ slots, updateSlots, saveSlots }) {
  const classes = useStyles()

  return (
    <Card className={classes.cardRoot}>
      <CardContent>
        <FormControl className={classes.margin}>
          <Typography variant='h5' className={classes.cardTitle}>
            How many parking slots do you have?
          </Typography>
          <OutlinedInput
            type='number'
            value={slots}
            className={classes.cardInput}
            onChange={updateSlots}
          />
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          className={classes.cardButton}
          variant='contained'
          color='primary'
          onClick={saveSlots}
        >
          SAVE
        </Button>
      </CardActions>
    </Card>
  )
}

export default SlotsInput
