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
import { useUserState } from '../../context/UserContext';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  //console.log(props);
  const { row, history, email, roles } = props;
  const classes = useRowStyles();

  const handleUpdate = (row) => {
    history.push({ pathname: '/app/form/updateService', state: { data: row } });
  };

  const handleDelete = (serviceId) => {
    if (window.confirm('Are you sure you want to delete the service?')) {
      history.push({
        pathname: '/app/oauth/deleteService',
        state: { data: { serviceId } },
      });
    }
  };

  return (
    <TableRow className={classes.root}>
      <TableCell align="left">{row.serviceId}</TableCell>
      <TableCell align="left">{row.serviceType}</TableCell>
      <TableCell align="left">{row.serviceName}</TableCell>
      <TableCell align="left">{row.serviceDesc}</TableCell>
      <TableCell align="left">{row.scope}</TableCell>
      <TableCell align="left">{row.ownerId}</TableCell>
      <TableCell align="left">{row.host}</TableCell>
      <TableCell align="right">
        <SystemUpdateIcon onClick={() => handleUpdate(row)} />
      </TableCell>
      <TableCell align="right">
        <DeleteForeverIcon onClick={() => handleDelete(row.serviceId)} />
      </TableCell>
    </TableRow>
  );
}

export default function ServiceList(props) {
  const { services } = props;
  const { email, roles } = useUserState();
  console.log(services);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Service Id</TableCell>
            <TableCell align="left">Service Type</TableCell>
            <TableCell align="left">Service Name</TableCell>
            <TableCell align="left">Service Desc</TableCell>
            <TableCell align="left">Scope</TableCell>
            <TableCell align="left">Owner Id</TableCell>
            <TableCell align="left">Host</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service, index) => (
            <Row
              history={props.history}
              email={email}
              roles={roles}
              key={index}
              row={service}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
