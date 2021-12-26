import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  //console.log(props);
  const { row } = props;
  const classes = useRowStyles();

  const handleValue = (tableId) => {
    props.history.push({
      pathname: '/app/ref/value',
      state: { data: { tableId } },
    });
  };

  const handleUpdate = (row) => {
    props.history.push({
      pathname: '/app/form/updateRefTable',
      state: { data: row },
    });
  };

  const handleDelete = (tableId) => {
    if (window.confirm('Are you sure you want to delete the table?')) {
      props.history.push({
        pathname: '/app/ref/deleteTable',
        state: { data: { tableId } },
      });
    }
  };

  return (
    <TableRow className={classes.root}>
      <TableCell align="left">{row.tableId}</TableCell>
      <TableCell align="left">{row.tableName}</TableCell>
      <TableCell align="left">{row.tableDesc}</TableCell>
      <TableCell align="left">{row.host}</TableCell>
      <TableCell align="left">{row.active}</TableCell>
      <TableCell align="left">{row.editable}</TableCell>
      <TableCell align="left">{row.common}</TableCell>
      <TableCell align="right">
        <AccountTreeIcon onClick={() => handleValue(row.tableId)} />
      </TableCell>
      <TableCell align="right">
        <SystemUpdateIcon onClick={() => handleUpdate(row)} />
      </TableCell>
      <TableCell align="right">
        <DeleteForeverIcon onClick={() => handleDelete(row.tableId)} />
      </TableCell>
    </TableRow>
  );
}

export default function TableList(props) {
  const { tables } = props;
  console.log('tables = ', tables);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Table Id</TableCell>
            <TableCell align="left">Table Name</TableCell>
            <TableCell align="left">Table Desc</TableCell>
            <TableCell align="left">Host</TableCell>
            <TableCell align="left">Active</TableCell>
            <TableCell align="left">Editable</TableCell>
            <TableCell align="left">Common</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tables.map((table, index) => (
            <Row history={props.history} key={index} row={table} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
