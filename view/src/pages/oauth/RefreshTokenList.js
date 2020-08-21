import React, { useState } from 'react';
import Cookies from 'universal-cookie'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { useUserState } from "../../context/UserContext";
import { timeConversion } from '../../Utils';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

function Row(props) {
    const { row, history, email, roles, host } = props;
    const refreshToken = row.substring(0, row.indexOf('|'));
    const timestamp = timeConversion((new Date()).getTime() - Number(row.substring(row.indexOf('|') + 1)));
    const classes = useRowStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();


    const handleDetail = (refreshToken) => {
      const cmd = {
          host: 'lightapi.net',
          service: 'market',
          action: 'getRefreshTokenDetail',
          version: '0.1.0',
          data: { refreshToken }
      }
      const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
      const cookies = new Cookies();
      const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
      const callback = (data) => {
          console.log("data = ", data);
          history.push({pathname: '/app/refreshTokenDetail', state: { data }});
      }
      
      const queryRefreshToken = async (url, headers, callback) => {
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
      queryRefreshToken(url, headers, callback);
    };

    const handleDelete = (refreshToken) => {
        if (window.confirm("Are you sure you want to delete the refreshToken?")) {
            history.push({pathname: '/app/oauth/deleteRefreshToken', state: { data : { refreshToken }}});
        } 
    };

    return (
        <TableRow className={classes.root}>
          <TableCell align="left">{refreshToken}</TableCell>
          <TableCell align="left">{host}</TableCell>
          <TableCell align="left">{timestamp}</TableCell>
          <TableCell align="right">
              <AddToQueueIcon onClick={() => handleDetail(refreshToken)} />
          </TableCell>
          <TableCell align="right">
              <DeleteForeverIcon onClick={() => handleDelete(refreshToken)} />
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
              <TableCell align="left">Timestamp</TableCell>
              <TableCell align="right">Detail</TableCell>
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
