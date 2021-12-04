import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablePagination from '@material-ui/core/TablePagination';  
import Cookies from 'universal-cookie'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useUserState } from "../../context/UserContext";
import useStyles from "./styles";
import ValueList from "./ValueList";

export default function RefValue(props) {
  const classes = useStyles();
  const { email } = useUserState();
  const tableId = props.location.state.data.tableId;  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [count, setCount] = useState(0);
  const [values, setValues] = useState([]);

  const cmd = {
    host: 'lightapi.net',
    service: 'ref',
    action: 'getValueByTableId',
    version: '0.1.0',
    data: { email, tableId, offset: page * rowsPerPage, limit: rowsPerPage }
  }
  const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
  const headers = {};

  const queryValues = async (url, headers) => {
    try {
      setLoading(true);
      const response = await fetch(url, { headers, credentials: 'include'});
      if (!response.ok) {
        const error = await response.json();
        setError(error.description);
        setValues([]);
      } else {
        const data = await response.json();
        setValues(data.values);
        setCount(data.total)
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
      setValues([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
    console.log(cmd);
    queryValues(url, headers);
  }, [page, rowsPerPage]);
  
  const handleChangePage = (event, newPage) => {  
    setPage(newPage);  
  };  

  const handleChangeRowsPerPage = event => {  
    setRowsPerPage(+event.target.value);  
    setPage(0);
  };      

  const handleCreate = () => {
    props.history.push({pathname: '/app/form/createRefValue', state: { data : { tableId }}});
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
    console.log(values);
    wait = (
        <div>
          <ValueList {...props} values={values}/>
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
