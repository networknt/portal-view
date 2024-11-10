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

  const handleUpdate = (row) => {
    props.history.push({
      pathname: '/app/form/updateRefRelation',
      state: { data: row },
    });
  };

  const handleDelete = (row) => {
    if (window.confirm('Are you sure you want to delete the relation?')) {
      props.history.push({
        pathname: '/app/ref/deleteRelation',
        state: { data: row },
      });
    }
  };

  return (
    <TableRow className={classes.root}>
      <TableCell align="left">{row.relationId}</TableCell>
      <TableCell align="left">{row.valueIdFrom}</TableCell>
      <TableCell align="left">{row.valueIdTo}</TableCell>
      <TableCell align="left">{row.active}</TableCell>
      <TableCell align="right">
        <SystemUpdateIcon onClick={() => handleUpdate(row)} />
      </TableCell>
      <TableCell align="right">
        <DeleteForeverIcon onClick={() => handleDelete(row)} />
      </TableCell>
    </TableRow>
  );
}

export default function RelationList(props) {
  const { relations } = props;
  console.log(relations);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Relation Id</TableCell>
            <TableCell align="left">Value Id From</TableCell>
            <TableCell align="left">Value Id To</TableCell>
            <TableCell align="left">Active</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {relations.map((relation, index) => (
            <Row history={props.history} key={index} row={relation} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
