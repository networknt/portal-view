// this is a component to render an item in the BlogList component.
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import useStyles from "./styles";

export default function RuleListItem(props) {
    const classes = useStyles();
    console.log(props);
    const { data, host, history } = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const handleUpdate = (ruleId) => {
        const cmd = {
            host: 'lightapi.net',
            service: 'market',
            action: 'getRuleById',
            version: '0.1.0',
            data: { host, ruleId }
        }
        const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
        const cookies = new Cookies();
        const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
        const callback = (data) => {
            console.log("data = ", data);
            history.push({pathname: '/app/form/updateRule', state: { data }});
        }
        
        const queryRules = async (url, headers, callback) => {
            try {
              setLoading(true);
              const response = await fetch(url, { headers, credentials: 'include'});
              if (!response.ok) {
                const error = await response.json();
                setError(error.description);
              } else {
                const data = await response.json();
                callback(data);
              }
              setLoading(false);
            } catch (e) {
              console.log(e);
              setError(e);
              setLoading(false);
            }
        };
        queryRules(url, headers, callback);
    };

    const handleDelete = (ruleId) => {
        if (window.confirm("Are you sure you want to delete the rule?")) {
            history.push({pathname: '/app/rule/deleteRule', state: { data : { ruleId, host }}});
        } 
    };

    return (
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
                    <TableRow className={classes.title}>
                        <TableCell align="left">{data}</TableCell>
                        <TableCell align="left">{host}</TableCell>
                        <TableCell align="right">
                            <SystemUpdateIcon onClick={() => handleUpdate(data)} />
                        </TableCell>
                        <TableCell align="right">
                            <DeleteForeverIcon onClick={() => handleDelete(data)} />
                        </TableCell>
                    </TableRow>
                    </TableBody>    
                </Table>
            </TableContainer>
        </div>
    )
}
