import React, { useState } from 'react';
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

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

function Row(props) {
    const { history, email, roles, host, id } = props;
    const classes = useRowStyles();
 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
  
    const handleUpdate = () => {
        const cmd = {
            host: 'lightapi.net',
            service: 'market',
            action: 'getBlogById',
            version: '0.1.0',
            data: { host, id }
        }
        const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
        const cookies = new Cookies();
        const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
        const callback = (data) => {
            console.log("data = ", data);
            history.push({pathname: '/app/form/updateBlog', state: { data }});
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
        if (window.confirm("Are you sure you want to delete the client?")) {
            history.push({pathname: '/app/oauth/deleteClient', state: { data : { host, id }}});
        } 
    };

    return (
        <TableRow className={classes.root}>
          <TableCell align="left">{host}</TableCell>
          <TableCell align="left">{id}</TableCell>
          <TableCell align="right">
              <SystemUpdateIcon onClick={handleUpdate} />
          </TableCell>
          <TableCell align="right">
              <DeleteForeverIcon onClick={handleDelete} />
          </TableCell>
        </TableRow>
    );
}

export default function BlogList(props) {
    const { history, blogs } = props;
    const { email, roles, host } = useUserState();
    console.log(blogs);
    return (
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
          <TableHead>
          <TableRow>
              <TableCell align="left">Host</TableCell>
              <TableCell align="left">Id</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {blogs.map((blog, index) => (
              <Row history={history} email={email} roles={roles} host={host} key={index} id={blog} />
          ))}
          </TableBody>
      </Table>
    </TableContainer>
  );
}
