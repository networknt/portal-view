// this is a component to fetch a list of blog and display them in pagination
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
import { useUserState } from "../../context/UserContext";
import BlogListItem from "./BlogListItem";
import useStyles from "./styles";

export default function BlogList(props) {
    const classes = useStyles();
    const { email, roles, host } = useUserState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [count, setCount] = useState(0);
    const [blogs, setBlogs] = useState([]);
  
    const cmd = {
      host: 'lightapi.net',
      service: 'market',
      action: 'getBlogList',
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
          setBlogs([]);
        } else {
          const data = await response.json();
          setBlogs(data.blogs);
          setCount(data.total)
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(e);
        setBlogs([]);
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
  
    console.log(blogs);
    return (
      <div>Blog List</div>      
    );
}
