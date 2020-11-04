import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import TablePagination from '@material-ui/core/TablePagination';  
import Cookies from 'universal-cookie'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useUserState } from "../../context/UserContext";

import useStyles from "./styles";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { history, email, roles, host, errorCode } = props;
  const classes = useRowStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleUpdate = () => {
      const cmd = {
          host: 'lightapi.net',
          service: 'market',
          action: 'getErrorByCode',
          version: '0.1.0',
          data: { host, errorCode }
      }
      const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
      const cookies = new Cookies();
      const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
      const callback = (data) => {
          console.log("data = ", data);
          history.push({pathname: '/app/form/updateError', state: { data }});
      }
      
      const query = async (url, headers, callback) => {
          try {
            setLoading(true);
            const response = await fetch(url, { headers, credentials: 'include'});
            if (!response.ok) {
              const error = await response.json();
              setLoading(false);
              setError(error.description);
            } else {
              const data = await response.json();
              setLoading(false);
              callback(data);
            }
          } catch (e) {
            console.log(e);
            setError(e);
            setLoading(false);
          }
      };
      query(url, headers, callback);
  };

  const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete the error?")) {
          history.push({pathname: '/app/error/deleteError', state: { data : { host, errorCode }}});
      } 
  };

  return (
      <TableRow className={classes.root}>
        <TableCell align="left">{host}</TableCell>
        <TableCell align="left">{errorCode}</TableCell>
        <TableCell align="right">
            <SystemUpdateIcon onClick={handleUpdate} />
        </TableCell>
        <TableCell align="right">
            <DeleteForeverIcon onClick={handleDelete} />
        </TableCell>
      </TableRow>
  );
}

function ErrorAdminList(props) {
  const { history, errors } = props;
  const { email, roles, host } = useUserState();
  console.log(errors);
  return (
    <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
        <TableHead>
        <TableRow>
            <TableCell align="left">Host</TableCell>
            <TableCell align="left">Error Code</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {errors.map((item, index) => (
            <Row history={history} email={email} roles={roles} host={host} key={index} errorCode={item} />
        ))}
        </TableBody>
    </Table>
  </TableContainer>
);
}

export default function ErrorAdmin(props) {
  const classes = useStyles();
  const { host } = useUserState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState([]);

  const cmd = {
    host: 'lightapi.net',
    service: 'market',
    action: 'getError',
    version: '0.1.0',
    data: { host, offset: page * rowsPerPage, limit: rowsPerPage }
  }
  
  const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
  const query = async (url, headers) => {
    try {
      setLoading(true);
      const response = await fetch(url, { headers, credentials: 'include'});
      if (!response.ok) {
        const error = await response.json();
        setError(error.description);
        setErrors([]);
      } else {
        const data = await response.json();
        setErrors(data.errors);
        setCount(data.total)
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
      setErrors([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
    query(url, headers);
  }, [page, rowsPerPage]);
  
  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  

  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);
  };

  const handleCreate = () => {
    props.history.push('/app/form/createError');
  }

  let wait;
  if(loading) {
    wait = <div><CircularProgress/></div>;
  } else if(error) {
    wait = (
        <div>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )  
  } else {
    wait = (
        <div>
          <ErrorAdminList {...props} errors={errors}/>
          <TablePagination  
            rowsPerPageOptions={[10, 25, 100]}  
            component="div"  
            count={count}  
            rowsPerPage={rowsPerPage}  
            page={page}  
            onChangePage={handleChangePage}  
            onChangeRowsPerPage={handleChangeRowsPerPage}  
          />          
          <AddBoxIcon onClick={() => handleCreate()} />
        </div>
    )
  }

  return (
    <div className="App">
      {wait}
    </div>
  );
}
