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
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useApiGet } from '../../hooks/useApiGet';
import { useUserState } from "../../context/UserContext";
import useStyles from "./styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
});

function Row(props) {
    const { row } = props;
    const classes = useRowStyles();

    const handleUpdate = (row) => {
        props.history.push({pathname: '/app/form/updateRefLocale', state: { data : row}});
    };

    const handleDelete = (valueId, language) => {
        if (window.confirm("Are you sure you want to delete the locale?")) {
            props.history.push({pathname: '/app/ref/deleteLocale', state: { data : { valueId, language }}});
        } 
    };
    
    return (
        <TableRow className={classes.root}>
          <TableCell align="left">{row.valueId}</TableCell>
          <TableCell align="left">{row.language}</TableCell>
          <TableCell align="left">{row.valueDesc}</TableCell>
          <TableCell align="right">
              <SystemUpdateIcon onClick={() => handleUpdate(row)} />
          </TableCell>
          <TableCell align="right">
              <DeleteForeverIcon onClick={() => handleDelete(row.valueId, row.language)} />
          </TableCell>
        </TableRow>
    );
}

export default function RefLocale(props) {
  const classes = useStyles();
  const { email } = useUserState();
  const valueId = props.location.state.data.valueId;  
  const [locales, setLocales] = useState([]);

  const cmd = {
    host: 'lightapi.net',
    service: 'ref',
    action: 'getLocaleById',
    version: '0.1.0',
    data: { email, valueId }
  }

  const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
  const headers = {};
  const callback = (data) => {
    console.log("data = ", data);
    setLocales(data);
  }

  const { isLoading, data, error } = useApiGet({url, headers, callback});

  const handleCreate = () => {
    props.history.push({pathname: '/app/form/createRefLocale', state: { data : { valueId }}});
  }

  let wait;
  if(isLoading) {
    wait = <div><CircularProgress/></div>;
  } else if(error) {
    wait = (
        <div>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )  
  } else {
    console.log(locales);
    wait = (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell align="left">Value Id</TableCell>
                <TableCell align="left">Language</TableCell>
                <TableCell align="left">Value Desc</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Delete</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {locales.map((locale, index) => (
                <Row history={props.history} key={index} row={locale} />
            ))}
            </TableBody>
        </Table>
        <AddBoxIcon onClick={() => handleCreate()} />
      </TableContainer>
    )
  }

  return (
    <div className="App">
      {wait}
    </div>
  );
}
