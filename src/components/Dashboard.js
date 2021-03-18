import React, { useState, useEffect } from 'react'
import SlotsInput from './SlotsInput'
import { useStyles } from '../style'

import { Grid, Card, CardContent } from '@material-ui/core'
import ParkingInput from './ParkingInput'
import TableComponent from './Table'
import Filter from './Filter'
import Notification from './Notification'

import { FREE_STATUS, OCCUPIED_STATUS, NOT_FOUND_STATUS } from '../constants'

let filterValueColor
let filterValuePlateNumber
const rawRows = []
const defaultValue = {
  plateNumber: '',
  color: '',
  status: FREE_STATUS,
}

function createData(slot) {
  return { slot, status: FREE_STATUS, plateNumber: '', color: '' }
}

function addRow(slots) {
  for (let slot = 0; slot < slots; slot++) {
    rawRows.splice(slot, 0, createData(slot + 1))
  }

  return rawRows
}

function Dashboard() {
  const classes = useStyles()

  const [slots, setSlots] = useState(0)
  const [hasSavedSlots, setHasSavedSlots] = useState(false)
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
    e.preventDefault()

    setSlots(e.target.value)
  }

  const saveSlots = (e) => {
    e.preventDefault()

    if (slots) {
      setHasSavedSlots(true)
    }
  }

  const park = (e) => {
    e.preventDefault()
    setIsOpen(true)

    if (details.plateNumber === '' || details.color === '') {
      setIsSuccess(false)
      setMessage('Please fill in plate number and car color')
      return
    }

    if (!rows.some((row) => row.status === FREE_STATUS)) {
      setDetails(defaultValue)
      setMessage('Sorry, parking lot is full')
      setIsSuccess(false)
      return
    }

    setDetails({ plateNumber: '', color: '', status: FREE_STATUS })

    const freeParkingSlots = rows.filter((row) => {
      return (
        row.status === FREE_STATUS && row.plateNumber === '' && row.color === ''
      )
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
      status: OCCUPIED_STATUS,
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
    setIsFiltered(false)
  }

  const filter = (e) => {
    e.preventDefault()

    let filteredRows

    const lowerCaseRows = rows.map((row) => {
      row[e.target.name] = row[e.target.name].toLowerCase()
      return row
    })

    if (e.target.value === '') {
      setIsFiltered(false)
    }

    if (e.target.name === 'color') {
      filterValueColor = e.target.value
    }

    if (e.target.name === 'plateNumber') {
      filterValuePlateNumber = e.target.value
    }

    if (filterValueColor && filterValuePlateNumber) {
      filteredRows = lowerCaseRows.filter((row) => {
        return (
          row.color.includes(filterValueColor.toLowerCase()) &&
          row.plateNumber.includes(filterValuePlateNumber.toLowerCase())
        )
      })
    } else {
      filteredRows = lowerCaseRows.filter((row) =>
        row[e.target.name].includes(e.target.value.toLowerCase())
      )
    }

    if (filteredRows.length === 0) {
      filteredRows = [
        {
          slot: 0,
          status: NOT_FOUND_STATUS,
          plateNumber: '',
          color: '',
        },
      ]

      setIsSuccess(false)
      setIsOpen(true)
      setMessage('Sorry, ' + e.target.value + ' not found')
    }

    setIsFiltered(true)
    setFilteredRows(filteredRows)
  }

  const closeNotification = (e) => setIsOpen(false)

  useEffect(() => {
    setRows(addRow(slots))
  }, [slots])

  return (
    <Grid container className={classes.gridContainer}>
      <Notification
        isOpen={isOpen}
        message={message}
        closeNotification={closeNotification}
        isSuccess={isSuccess}
      />
      {!hasSavedSlots ? (
        <SlotsInput
          slots={slots}
          updateSlots={updateSlots}
          saveSlots={saveSlots}
        />
      ) : (
        <Card className={classes.parkingCardRoot}>
          <CardContent className={classes.parkingCardContent}>
            <ParkingInput
              park={park}
              details={details}
              updateCarDetails={updateCarDetails}
            />
            <Filter filter={filter} />
            <TableComponent
              rows={isFiltered ? filteredRows : rows}
              leave={leave}
            />
          </CardContent>
        </Card>
      )}
    </Grid>
  )
}

export default Dashboard
