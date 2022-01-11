import React, { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { useUserState } from '../../context/UserContext';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { history, service } = props;
    const classes = useRowStyles();

    const handleUpdate = () => {
        props.history.push({ pathname: '/app/form/updateConfigService', state: { data: service } });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete the service?')) {
            history.push({
                pathname: '/app/config/deleteService',
                state: { data: { service } },
            });
        }
    };

    return (
        <TableRow className={classes.root}>
            <TableCell align="left">{service.host}</TableCell>
            <TableCell align="left">{service.module}</TableCell>
            <TableCell align="left">{service.project}</TableCell>
            <TableCell align="left">{service.projver}</TableCell>
            <TableCell align="left">{service.service}</TableCell>
            <TableCell align="left">{service.servver}</TableCell>
            <TableCell align="left">{service.env}</TableCell>
            <TableCell align="right">
                <SystemUpdateIcon onClick={handleUpdate} />
            </TableCell>
            <TableCell align="right">
                <DeleteForeverIcon onClick={handleDelete} />
            </TableCell>
        </TableRow>
    );
}

function ServicesList(props) {
    const { history } = props;
    let services = props.location.state.data;
    console.log(services);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Host</TableCell>
                        <TableCell align="left">Module</TableCell>
                        <TableCell align="left">Project</TableCell>
                        <TableCell align="left">Project Version</TableCell>
                        <TableCell align="left">Service</TableCell>
                        <TableCell align="left">Service Version</TableCell>
                        <TableCell align="left">Environment</TableCell>
                        <TableCell align="right">Update</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services.map((service, index) => (
                        <Row
                            history={history}
                            key={index}
                            service={service}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default function Services(props) {
    console.log(props);
    let services = props.location.state.data;
    const { host } = useUserState();

    const handleCreate = () => {
        props.history.push({ pathname: '/app/form/createConfigService', state: { data: { host } } });
    };

    return <div><ServicesList {...props} /><AddBoxIcon onClick={() => handleCreate()} /></div>
}
