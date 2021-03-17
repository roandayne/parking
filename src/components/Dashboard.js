import React, { useState, useEffect } from 'react'
import SlotsInput from './SlotsInput'
import { useStyles } from '../style'

import { Grid, Card, CardContent } from '@material-ui/core'
import ParkingInput from './ParkingInput'
import TableComponent from './Table'

function createData(slot) {
  return { slot, status: 'free', plateNumber: '', color: '' }
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
  const [details, setDetails] = useState({
    plateNumber: '',
    color: '',
    status: 'free',
  })

  const updateCarDetails = (e) => {
    e.preventDefault()

    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const updateSlots = (e) => {
    setSlots(e.target.value)
    setHasSavedSlots(true)
  }

  const park = (e) => {
    e.preventDefault()

    setDetails({ plateNumber: '', color: '', status: 'free' })

    const freeParkingSlots = rows.filter((row) => {
      return row.status === 'free' && row.plateNumber === '' && row.color === ''
    })

    const leastNumber = Math.min.apply(
      Math,
      freeParkingSlots.map(function (slot) {
        return slot.slot
      })
    )

    const rowsCopy = [...rows]
    const index = rows.findIndex((row) => row.slot === leastNumber)
    const newParkedCar = {
      slot: rows[index].slot,
      ...details,
      status: 'occupied',
    }
    rowsCopy.splice(index, 1, newParkedCar)

    setRows(rowsCopy)
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
