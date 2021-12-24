import React, { useState } from 'react';
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
import SettingsIcon from '@material-ui/icons/Settings';
import Cookies from 'universal-cookie'
import { useUserState } from "../../context/UserContext";

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

function Row(props) {
    const { row, history, email, roles, host } = props;
    const classes = useRowStyles();
    const fields = row.split("|");
    const serviceId = fields[0];
    const serviceSytle = fields[1];
    const name = fields[2];

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const handleUpdate = (serviceId) => {
        const cmd = {
            host: 'lightapi.net',
            service: 'market',
            action: 'getServiceById',
            version: '0.1.0',
            data: { serviceId }
        }
        const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
        const cookies = new Cookies();
        const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
        const callback = (data) => {
            console.log("data = ", data);
            history.push({pathname: '/app/form/updateService', state: { data }});
        }
        
        const queryServices = async (url, headers, callback) => {
            try {
              setLoading(true);
              const response = await fetch(url, { headers, credentials: 'include'});
              if (!response.ok) {
                const error = await response.json();
                setError(error.description);
              } else {
                const data = await response.json();
                callback(data);
              }
              setLoading(false);
            } catch (e) {
              console.log(e);
              setError(e);
              setLoading(false);
            }
        };
        queryServices(url, headers, callback);
    };

    const handleDelete = (serviceId) => {
        if (window.confirm("Are you sure you want to delete the service?")) {
            history.push({pathname: '/app/oauth/deleteService', state: { data : { serviceId }}});
        } 
    };

    const handleDetail = (serviceId, style, name) => {
      history.push({pathname: '/app/oauth/serviceDetail', state: { data : { serviceId, style, name }}});
    };

    return (
        <TableRow className={classes.root}>
          <TableCell align="left">{serviceId}</TableCell>
          <TableCell align="left">{serviceSytle}</TableCell>
          <TableCell align="left">{name}</TableCell>
          <TableCell align="left">{host}</TableCell>
          <TableCell align="right">
              <SystemUpdateIcon onClick={() => handleUpdate(serviceId)} />
          </TableCell>
          <TableCell align="right">
              <DeleteForeverIcon onClick={() => handleDelete(serviceId)} />
          </TableCell>
          <TableCell align="right">
              <SettingsIcon onClick={() => handleDetail(serviceId, serviceSytle, name)} />
          </TableCell>
        </TableRow>
    );
}

export default function ServiceList(props) {
    const { services } = props;
    const { email, roles, host } = useUserState();
    console.log(services);
    return (
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
          <TableHead>
          <TableRow>
              <TableCell align="left">Service Id</TableCell>
              <TableCell align="left">Service Style</TableCell>
              <TableCell align="left">Service Name</TableCell>
              <TableCell align="left">Host</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Detail</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {services.map((service, index) => (
              <Row history={props.history} email={email} roles={roles} host={host} key={index} row={service} />
          ))}
          </TableBody>
      </Table>
    </TableContainer>
  );
}
