import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageAspectRatioIcon from '@mui/icons-material/ImageAspectRatio';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InputIcon from '@mui/icons-material/Input';
import BugReportIcon from '@mui/icons-material/BugReport';
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
            history.push({pathname: '/app/deleteService', state: { data : { serviceId }}});
        } 
    };

    const handleSpec = (serviceId, style, name) => {
      switch (style) {
        case 'openapi':
          history.push({pathname: '/app/openapiEditor', state: { data : { serviceId, style, name }}});
          break;
        case 'hybrid':
          history.push({pathname: '/app/hybridEditor', state: { data : { serviceId, style, name }}});
          break;
        case 'graphql':
          history.push({pathname: '/app/graphqlEditor', state: { data : { serviceId, style, name }}});
          break;
      }
    };

    const handleEndpoint = (serviceId, style, name) => {
      history.push({pathname: '/app/serviceEndpoint', state: { data : { serviceId, style, name }}});
    };

    const handleCodegen = (serviceId, style, name) => {
      history.push({pathname: '/app/serviceCodegen', state: { data : { serviceId, style, name }}});
    };

    const handleDeploy = (serviceId, style, name) => {
      history.push({pathname: '/app/serviceDeploy', state: { data : { serviceId, style, name }}});
    };

    const handleTest = (serviceId, style, name) => {
      history.push({pathname: '/app/serviceTest', state: { data : { serviceId, style, name }}});
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
              <ImageAspectRatioIcon onClick={() => handleSpec(serviceId, serviceSytle, name)} />
          </TableCell>
          <TableCell align="right">
              <FormatListBulletedIcon onClick={() => handleEndpoint(serviceId, serviceSytle, name)} />
          </TableCell>
          <TableCell align="right">
              <InputIcon onClick={() => handleCodegen(serviceId, serviceSytle, name)} />
          </TableCell>
          <TableCell align="right">
              <SettingsIcon onClick={() => handleDeploy(serviceId, serviceSytle, name)} />
          </TableCell>
          <TableCell align="right">
              <BugReportIcon onClick={() => handleTest(serviceId, serviceSytle, name)} />
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
              <TableCell align="right">Spec</TableCell>
              <TableCell align="right">Endpoint</TableCell>
              <TableCell align="right">Codegen</TableCell>
              <TableCell align="right">Deploy</TableCell>
              <TableCell align="right">Test</TableCell>
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
