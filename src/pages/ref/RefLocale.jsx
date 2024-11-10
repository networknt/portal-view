import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useUserState } from '../../contexts/UserContext';
import { useApiGet } from '../../hooks/useApiGet';
import useStyles from './styles';

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
    props.history.push({
      pathname: '/app/form/updateRefLocale',
      state: { data: row },
    });
  };

  const handleDelete = (valueId, language) => {
    if (window.confirm('Are you sure you want to delete the locale?')) {
      props.history.push({
        pathname: '/app/ref/deleteLocale',
        state: { data: { valueId, language } },
      });
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
        <DeleteForeverIcon
          onClick={() => handleDelete(row.valueId, row.language)}
        />
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
    data: { email, valueId },
  };

  const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
  const headers = {};
  const callback = (data) => {
    console.log('data = ', data);
    setLocales(data);
  };

  const { isLoading, data, error } = useApiGet({ url, headers, callback });

  const handleCreate = () => {
    props.history.push({
      pathname: '/app/form/createRefLocale',
      state: { data: { valueId } },
    });
  };

  let wait;
  if (isLoading) {
    wait = (
      <div>
        <CircularProgress />
      </div>
    );
  } else if (error) {
    wait = (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
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
    );
  }

  return <div className="App">{wait}</div>;
}
