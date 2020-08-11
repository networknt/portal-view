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
import VpnKeyIcon from '@material-ui/icons/VpnKey';
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const handleDelete = (refreshToken) => {
        if (window.confirm("Are you sure you want to delete the refreshToken?")) {
            history.push({pathname: '/app/oauth/deleteRefreshToken', state: { data : { refreshToken }}});
        } 
    };

    return (
        <TableRow className={classes.root}>
          <TableCell align="left">{row.refreshToken}</TableCell>
          <TableCell align="left">{host}</TableCell>
          <TableCell align="left">{row.userId}</TableCell>
          <TableCell align="left">{row.userType}</TableCell>
          <TableCell align="left">{row.roles}</TableCell>
          <TableCell align="left">{row.clientId}</TableCell>
          <TableCell align="left">{row.scope}</TableCell>
          <TableCell align="left">{row.remember}</TableCell>
          <TableCell align="right">
              <DeleteForeverIcon onClick={() => handleDelete(row.refreshToken)} />
          </TableCell>
        </TableRow>
    );
}

export default function RefreshTokenList(props) {
    const { tokens } = props;
    const { email, roles, host } = useUserState();
    console.log(tokens);
    return (
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
          <TableHead>
          <TableRow>
              <TableCell align="left">Refresh Token</TableCell>
              <TableCell align="left">Host</TableCell>
              <TableCell align="left">User Id</TableCell>
              <TableCell align="left">User Type</TableCell>
              <TableCell align="left">Roles</TableCell>
              <TableCell align="left">Client Id</TableCell>
              <TableCell align="left">Scope</TableCell>
              <TableCell align="left">Remember</TableCell>
              <TableCell align="right">Delete</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {tokens.map((token, index) => (
              <Row history={props.history} email={email} roles={roles} host={host} key={index} row={token} />
          ))}
          </TableBody>
      </Table>
    </TableContainer>
  );
}
