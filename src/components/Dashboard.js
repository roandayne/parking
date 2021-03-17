import React, { useState, useEffect } from 'react'
import SlotsInput from './SlotsInput'
import { useStyles } from '../style'

import { Grid, Card, CardContent, Typography, Paper } from '@material-ui/core'
import ParkingInput from './ParkingInput'
import TableComponent from './Table'

function createData(slot) {
  return { slot, status: 'free', plate: '', color: '' }
}

const rawRows = []

function addRow(slots) {
  for (let slot = 0; slot < slots; slot++) {
    rawRows.splice(slot, 0, createData(slot + 1))
  }

  return rawRows
}

// export const ParkingContext = React.createContext()

function Dashboard() {
  const classes = useStyles()

  const [slots, setSlots] = useState(6)
  const [hasSavedSlots, setHasSavedSlots] = useState(true)
  const [rows, setRows] = useState([])
  const [isParked, setIsParked] = useState(false)
  const [details, setDetails] = useState({
    plateNumber: '',
    color: '',
  })

  const updateCarDetails = (e) => {}

  const updateSlots = (e) => {
    setSlots(e.target.value)
    setHasSavedSlots(true)
  }

  const park = (e) => {
    e.preventDefault()
    console.log(rows)

    // setIsParked(true)
  }

  useEffect(() => {
    setRows(addRow(slots))
  }, [slots])

  return (
    // <ParkingContext.Provider value={{ rows }}>
    <Grid container className={classes.gridContainer}>
      {!hasSavedSlots ? (
        <SlotsInput slots={slots} updateSlots={updateSlots}></SlotsInput>
      ) : (
        <Card className={classes.parkingCardRoot}>
          <CardContent className={classes.parkingCardContent}>
            <ParkingInput
              park={park}
              details={details}
              isParked={isParked}
              updateCarDetails={updateCarDetails}
            ></ParkingInput>
            <TableComponent rows={rows}></TableComponent>
          </CardContent>
        </Card>
      )}
    </Grid>
    // </ParkingContext.Provider>
  )
}

export default Dashboard
