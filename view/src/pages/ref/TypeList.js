import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

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

    const handleValue = (relationId) => {
        props.history.push({pathname: '/app/ref/relation', state: { data : { relationId }}});
    };

    const handleUpdate = (row) => {
        props.history.push({pathname: '/app/form/updateRefRelaType', state: { data : row}});
    };

    const handleDelete = (relationId) => {
        if (window.confirm("Are you sure you want to delete the relation type?")) {
            props.history.push({pathname: '/app/ref/deleteRelaType', state: { data : { relationId }}});
        } 
    };

    return (
        <TableRow className={classes.root}>
          <TableCell align="left">{row.relationId}</TableCell>
          <TableCell align="left">{row.relationName}</TableCell>
          <TableCell align="left">{row.relationDesc}</TableCell>
          <TableCell align="right">
              <AccountTreeIcon onClick={() => handleValue(row.relationId)} />
          </TableCell>
          <TableCell align="right">
              <SystemUpdateIcon onClick={() => handleUpdate(row)} />
          </TableCell>
          <TableCell align="right">
              <DeleteForeverIcon onClick={() => handleDelete(row.relationId)} />
          </TableCell>
        </TableRow>
    );
}

export default function TypeList(props) {
    const { types } = props;
    console.log("types = ", types);
    return (
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
          <TableHead>
          <TableRow>
              <TableCell align="left">Relation Id</TableCell>
              <TableCell align="left">Relation Name</TableCell>
              <TableCell align="left">Relation Desc</TableCell>
              <TableCell align="right">Relation</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {props.types.map((type, index) => (
              <Row history={props.history} key={index} row={type} />
          ))}
          </TableBody>
      </Table>
    </TableContainer>
  );
}
