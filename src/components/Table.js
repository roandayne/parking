import React, { useContext } from 'react'

import {
  Card,
  CardContent,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { useStyles } from '../style'

function TableComponent({ rows }) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Slot Number</TableCell>
            <TableCell align='right'>Plate Number</TableCell>
            <TableCell align='right'>Color</TableCell>
            <TableCell align='right'>Action/Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align='right'>{row.slot}</TableCell>
              <TableCell align='right'>{row.plate}</TableCell>
              <TableCell align='right'>{row.color}</TableCell>
              <TableCell align='right'>
                {row.status !== 'free' ? <Button>Leave</Button> : row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent
