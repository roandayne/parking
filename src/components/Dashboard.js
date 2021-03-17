import React, { useState, useEffect } from 'react'
import SlotsInput from './SlotsInput'
import { useStyles } from '../style'

import { Grid, Card, CardContent } from '@material-ui/core'
import ParkingInput from './ParkingInput'
import TableComponent from './Table'
import Filter from './Filter'
import Notification from './Notification'

const rawRows = []
const defaultValue = {
  plateNumber: '',
  color: '',
  status: 'free',
}

function createData(slot) {
  return { slot, status: 'free', plateNumber: '', color: '' }
}

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
  const [details, setDetails] = useState(defaultValue)
  const [filteredRows, setFilteredRows] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

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
    setIsOpen(true)

    if (!rows.some((row) => row.status === 'free')) {
      setMessage('Sorry, parking lot is full')
      setIsSuccess(false)
      return
    }

    setDetails({ plateNumber: '', color: '', status: 'free' })

    const freeParkingSlots = rows.filter((row) => {
      return row.status === 'free' && row.plateNumber === '' && row.color === ''
    })

    const leastSlotNumber = Math.min.apply(
      Math,
      freeParkingSlots.map(function (slot) {
        return slot.slot
      })
    )

    const rowsCopy = [...rows]
    const index = rows.findIndex((row) => row.slot === leastSlotNumber)
    const newParkedCar = {
      slot: rows[index].slot,
      ...details,
      status: 'occupied',
    }
    rowsCopy.splice(index, 1, newParkedCar)

    setIsSuccess(true)
    setMessage(
      details.plateNumber + ' can now park at slot number ' + rows[index].slot
    )
    setRows(rowsCopy)
  }

  const leave = (e, car) => {
    e.preventDefault()

    const rowsCopy = [...rows]
    const index = rows.findIndex((row) => row.slot === car.slot)
    rowsCopy.splice(index, 1, { slot: rows[index].slot, ...defaultValue })

    setIsSuccess(true)
    setMessage(car.plateNumber + ' has left the parking lot.')
    setIsOpen(true)
    setRows(rowsCopy)
  }

  const filter = (e) => {
    e.preventDefault()
    const rowsCopy = [...rows]

    if (e.target.value === '') {
      setIsFiltered(false)
    }

    const lowerCaseRows = rowsCopy.map((row) => {
      row[e.target.name] = row[e.target.name].toLowerCase()
      return row
    })

    const filteredRows = lowerCaseRows.filter((row) =>
      row[e.target.name].includes(e.target.value.toLowerCase())
    )

    setIsFiltered(true)
    setFilteredRows(filteredRows)
  }

  const closeNotification = (e) => setIsOpen(false)

  useEffect(() => {
    setRows(addRow(slots))
    // setRows([
    //   { slot: 1, status: 'occupied', plateNumber: 'ABC-1234', color: 'white' },
    //   { slot: 2, status: 'occupied', plateNumber: 'ABC-9999', color: 'white' },
    //   { slot: 3, status: 'occupied', plateNumber: 'ABC-0001', color: 'black' },
    //   { slot: 4, status: 'free', plateNumber: '', color: '' },
    //   { slot: 5, status: 'occupied', plateNumber: 'ABC-2701', color: 'blue' },
    //   { slot: 6, status: 'occupied', plateNumber: 'ABC-3141', color: 'black' },
    // ])
  }, [slots])

  return (
    <Grid container className={classes.gridContainer}>
      <Notification
        isOpen={isOpen}
        message={message}
        closeNotification={closeNotification}
      ></Notification>
      {!hasSavedSlots ? (
        <SlotsInput slots={slots} updateSlots={updateSlots}></SlotsInput>
      ) : (
        <Card className={classes.parkingCardRoot}>
          <CardContent className={classes.parkingCardContent}>
            <ParkingInput
              park={park}
              details={details}
              updateCarDetails={updateCarDetails}
              isSuccess={isSuccess}
            ></ParkingInput>
            <Filter filter={filter}></Filter>
            <TableComponent
              rows={isFiltered ? filteredRows : rows}
              leave={leave}
            ></TableComponent>
          </CardContent>
        </Card>
      )}
    </Grid>
  )
}

export default Dashboard
