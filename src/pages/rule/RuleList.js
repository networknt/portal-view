// this is a component to fetch a list of schemas and display them in pagination in marketplace
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';  
import { useUserState } from "../../context/UserContext";
import RuleListItem from "./RuleListItem";
import useStyles from "./styles";

export default function RuleList(props) {
    const classes = useStyles();
    const { email, roles, host } = useUserState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [count, setCount] = useState(0);
    const [rules, setRules] = useState([]);
  
    const cmd = {
      host: 'lightapi.net',
      service: 'market',
      action: 'getRuleByHost',
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
          setRules([]);
        } else {
          const data = await response.json();
          console.log("data", data);
          setRules(data.rules);
          setCount(data.total)
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(e);
        setRules([]);
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
  
    console.log(rules);
    let Rules = undefined;
    if (Array.isArray(rules)) {
      Rules = rules.map(data => (
        <RuleListItem 
          {...props}
          data={data}
          key={data}
          host={host}
        />
      ));
    }
  
    return (
      <div>
        <div className={classes.itemWrapper}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">Rule Id</TableCell>
                        <TableCell align="left">Host</TableCell>
                        <TableCell align="right">Update</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {Rules}        
                    </TableBody>    
                </Table>
            </TableContainer>
        </div>
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
