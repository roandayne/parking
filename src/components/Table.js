import React from 'react'
import { useStyles } from '../style'

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@material-ui/core'

import { FREE_STATUS, OCCUPIED_STATUS, NOT_FOUND_STATUS } from '../constants'

function TableComponent({ rows, leave }) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.alignCenter}>Slot Number</TableCell>
            <TableCell className={classes.alignCenter} align='right'>
              Plate Number
            </TableCell>
            <TableCell className={classes.alignCenter} align='right'>
              Color
            </TableCell>
            <TableCell className={classes.alignCenter} align='right'>
              Action/Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className={classes.alignCenter} align='right'>
                {row.slot}
              </TableCell>
              <TableCell
                className={classes.alignCenter}
                align='right'
                style={{ textTransform: 'uppercase' }}
              >
                {row.plateNumber}
              </TableCell>
              <TableCell
                className={classes.alignCenter}
                align='right'
                style={{ textTransform: 'uppercase' }}
              >
                {row.color}
              </TableCell>
              <TableCell
                className={classes.alignCenter}
                align='right'
                style={{ textTransform: 'uppercase' }}
              >
                {row.status === FREE_STATUS ||
                row.status === NOT_FOUND_STATUS ? (
                  row.status
                ) : (
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={(e) => {
                      if (window.confirm('Are you sure the car is leaving?')) {
                        leave(e, row)
                      }
                    }}
                  >
                    Leave
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent
