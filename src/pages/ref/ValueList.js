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
  console.log(props);
  const { row } = props;
  const classes = useRowStyles();

  const handleLocale = (valueId) => {
    props.history.push({
      pathname: '/app/ref/locale',
      state: { data: { valueId } },
    });
  };

  const handleUpdate = (row) => {
    props.history.push({
      pathname: '/app/form/updateRefValue',
      state: { data: row },
    });
  };

  const handleDelete = (valueId) => {
    if (window.confirm('Are you sure you want to delete the value?')) {
      props.history.push({
        pathname: '/app/ref/deleteValue',
        state: { data: { valueId } },
      });
    }
  };

  return (
    <TableRow className={classes.root}>
      <TableCell align="left">{row.valueId}</TableCell>
      <TableCell align="left">{row.tableId}</TableCell>
      <TableCell align="left">{row.valueCode}</TableCell>
      <TableCell align="left">{row.displayOrder}</TableCell>
      <TableCell align="left">{row.active}</TableCell>
      <TableCell align="right">
        <AccountTreeIcon onClick={() => handleLocale(row.valueId)} />
      </TableCell>
      <TableCell align="right">
        <SystemUpdateIcon onClick={() => handleUpdate(row)} />
      </TableCell>
      <TableCell align="right">
        <DeleteForeverIcon onClick={() => handleDelete(row.valueId)} />
      </TableCell>
    </TableRow>
  );
}

export default function ValueList(props) {
  const { values } = props;
  console.log(values);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Value Id</TableCell>
            <TableCell align="left">Table Id</TableCell>
            <TableCell align="left">Value Code</TableCell>
            <TableCell align="left">Display Order</TableCell>
            <TableCell align="left">Active</TableCell>
            <TableCell align="right">Locale</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value, index) => (
            <Row history={props.history} key={index} row={value} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
