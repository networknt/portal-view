import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablePagination from '@material-ui/core/TablePagination';  
import Cookies from 'universal-cookie'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useParams } from 'react-router-dom'
import { useUserState } from "../../context/UserContext";
import useStyles from "./styles";
import ServiceList from "./ServiceList";

export default function Service(props) {
  const classes = useStyles();
  const { email, host } = useUserState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [count, setCount] = useState(0);
  const [services, setServices] = useState([]);
  let { style } = useParams();

  const cmd = {
    host: 'lightapi.net',
    service: 'market',
    action: 'getService',
    version: '0.1.0',
    data: { host, style, offset: page * rowsPerPage, limit: rowsPerPage }
  }
  console.log("cmd = ", cmd);
  const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
  const headers = {};
  const queryServices = async (url, headers) => {
    try {
      setLoading(true);
      const response = await fetch(url, { headers, credentials: 'include'});
      if (!response.ok) {
        const error = await response.text();
        setError(error.description);
        setServices([]);
      } else {
        const data = await response.json();
        setServices(data.services);
        setCount(data.total)
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
    const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
    queryServices(url, headers);
  }, [page, rowsPerPage]);
  
  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  

  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);
  };

  const handleCreate = () => {
    props.history.push('/app/form/createService');
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
          <ServiceList {...props} services={services}/>
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
