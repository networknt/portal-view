// this is a component to fetch a list of schemas and display them in pagination in marketplace
import React, { useState, useEffect } from 'react';
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
import Cookies from 'universal-cookie'
import TablePagination from '@material-ui/core/TablePagination';  
import { useUserState } from "../../context/UserContext";
import SchemaListItem from "./SchemaListItem";
import useStyles from "./styles";

export default function SchemaList(props) {
    const classes = useStyles();
    const { email, roles, host } = useUserState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [count, setCount] = useState(0);
    const [schemas, setSchemas] = useState([]);
  
    const cmd = {
      host: 'lightapi.net',
      service: 'market',
      action: 'getJsonSchemaList',
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
          setSchemas([]);
        } else {
          const data = await response.json();
          console.log("data", data);
          setSchemas(data.schemas);
          setCount(data.total)
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(e);
        setSchemas([]);
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
  
    console.log(schemas);
    let Schemas = undefined;
    if (Array.isArray(schemas)) {
      Schemas = schemas.map(data => (
        <SchemaListItem 
          {...props}
          data={data}
          key={data.id}
        />
      ));
    }
  
    return (
      <div>
        {Schemas}        
        <TablePagination  
            rowsPerPageOptions={[10, 25, 100]}  
            component="div"  
            count={count}  
            rowsPerPage={rowsPerPage}  
            page={page}  
            onChangePage={handleChangePage}  
            onChangeRowsPerPage={handleChangeRowsPerPage}  
          />          
      </div>      
    );
}
