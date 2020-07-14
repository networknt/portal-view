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
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useUserState } from "../../context/UserContext";

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
        history.push({pathname: '/app/form/updateClient', state: { data : row}});
    };

    const handleToken = (row) => {
        history.push({pathname: '/app/form/testTokenForm', state: { data : { client_id: row.clientId, user_id: email, roles }}});
    };

    const handleDelete = (clientId) => {
        if (window.confirm("Are you sure you want to delete the client?")) {
            history.push({pathname: '/app/oauth/deleteClient', state: { data : { clientId }}});
        } 
    };

    return (
        <TableRow className={classes.root}>
          <TableCell align="left">{row.clientId}</TableCell>
          <TableCell align="left">{row.clientType}</TableCell>
          <TableCell align="left">{row.clientProfile}</TableCell>
          <TableCell align="left">{row.clientName}</TableCell>
          <TableCell align="left">{row.clientDesc}</TableCell>
          <TableCell align="left">{row.scope}</TableCell>
          <TableCell align="left">{row.customClaim}</TableCell>
          <TableCell align="left">{row.redirectUri}</TableCell>
          <TableCell align="left">{row.authenticateClass}</TableCell>
          <TableCell align="left">{row.derefClientId}</TableCell>
          <TableCell align="left">{row.ownerId}</TableCell>
          <TableCell align="left">{row.host}</TableCell>
          <TableCell align="right">
              <VpnKeyIcon onClick={() => handleToken(row)} />
          </TableCell>
          <TableCell align="right">
              <SystemUpdateIcon onClick={() => handleUpdate(row)} />
          </TableCell>
          <TableCell align="right">
              <DeleteForeverIcon onClick={() => handleDelete(row.clientId)} />
          </TableCell>
        </TableRow>
    );
}

export default function ClientList(props) {
    const { clients } = props;
    const { email, roles } = useUserState();
    console.log(clients);
    return (
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
          <TableHead>
          <TableRow>
              <TableCell align="left">Client Id</TableCell>
              <TableCell align="left">Client Type</TableCell>
              <TableCell align="left">Client Profile</TableCell>
              <TableCell align="left">Client Name</TableCell>
              <TableCell align="left">Client Desc</TableCell>
              <TableCell align="left">Scope</TableCell>
              <TableCell align="left">Custom Claim</TableCell>
              <TableCell align="left">Redirect Uri</TableCell>
              <TableCell align="left">Authenticate Class</TableCell>
              <TableCell align="left">Deref Client Id</TableCell>
              <TableCell align="left">Owner Id</TableCell>
              <TableCell align="left">Host</TableCell>
              <TableCell align="right">Token</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {clients.map((client, index) => (
              <Row history={props.history} email={email} roles={roles} key={index} row={client} />
          ))}
          </TableBody>
      </Table>
    </TableContainer>
  );
}
