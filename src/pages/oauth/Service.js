import AddBoxIcon from '@mui/icons-material/AddBox';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useUserState } from '../../context/UserContext';
import ServiceList from './ServiceList';
import useStyles from './styles';

export default function Service(props) {
  const classes = useStyles();
  const { email, host } = useUserState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [count, setCount] = useState(0);
  const [services, setServices] = useState([]);

  const url =
    '/oauth2/service?page=' +
    page +
    '&pageSize=' +
    rowsPerPage +
    (host ? '&host=' + host : '');
  console.log(url);
  const headers = {};

  const queryServices = async (url, headers) => {
    try {
      setLoading(true);
      const response = await fetch(url, { headers, credentials: 'include' });
      if (!response.ok) {
        const error = await response.text();
        console.log(response.status);
        setError(error);
        setServices([]);
      } else {
        const data = await response.json();
        setServices(data.services);
        setCount(data.total);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
      setServices([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    const headers = { 'X-CSRF-TOKEN': cookies.get('csrf') };
    queryServices(url, headers);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreate = () => {
    props.history.push('/app/form/createService');
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
        <ServiceList {...props} services={services} />
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
    );
  }

  return <div className="App">{wait}</div>;
}
