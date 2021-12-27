import AddBoxIcon from '@mui/icons-material/AddBox';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useUserState } from '../../context/UserContext';
import useStyles from './styles';
import TableList from './TableList';

export default function RefTable(props) {
  const classes = useStyles();
  const { email } = useUserState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [count, setCount] = useState(0);
  const [tables, setTables] = useState([]);

  const cmd = {
    host: 'lightapi.net',
    service: 'ref',
    action: 'getTable',
    version: '0.1.0',
    data: { email, offset: page * rowsPerPage, limit: rowsPerPage },
  };

  const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
  const headers = {};

  const queryTables = async (url, headers) => {
    try {
      setLoading(true);
      const response = await fetch(url, { headers, credentials: 'include' });
      if (!response.ok) {
        const error = await response.json();
        setError(error.description);
        setTables([]);
      } else {
        const data = await response.json();
        setTables(data.tables);
        setCount(data.total);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
      setTables([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    const headers = { 'X-CSRF-TOKEN': cookies.get('csrf') };
    queryTables(url, headers);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreate = () => {
    props.history.push('/app/form/createRefTable');
  };

  let wait;
  if (loading) {
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
    wait = (
      <div>
        <TableList {...props} tables={tables} />
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AddBoxIcon onClick={() => handleCreate()} />
      </div>
    );
  }

  return <div className="App">{wait}</div>;
}
