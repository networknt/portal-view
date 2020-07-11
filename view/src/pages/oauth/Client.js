import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablePagination from '@material-ui/core/TablePagination';  
import Cookies from 'universal-cookie'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useUserState } from "../../context/UserContext";
import useStyles from "./styles";
import ClientList from "./ClientList";

export default function Client(props) {
  const classes = useStyles();
  const { email, host } = useUserState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [count, setCount] = useState(0);
  const [clients, setClients] = useState([]);
  
  const url = '/oauth2/client?page=' + page + '&pageSize=' + rowsPerPage + (host ? ('&host=' + host) : '');
  console.log(url);
  const headers = {};

  const queryClients = async (url, headers) => {
    try {
      setLoading(true);
      const response = await fetch(url, { headers, credentials: 'include'});
      if (!response.ok) {
        const error = await response.json();
        setError(error.description);
        setClients([]);
      } else {
        const data = await response.json();
        setClients(data.clients);
        setCount(data.total)
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
      setClients([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
    queryClients(url, headers);
  }, [page, rowsPerPage]);
  
  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  

  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);
  };      

  const handleCreate = () => {
    props.history.push('/app/form/createClient');
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
          <ClientList {...props} clients={clients}/>
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
