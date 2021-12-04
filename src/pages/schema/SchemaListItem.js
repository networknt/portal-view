// this is a component to render an item in the BlogList component.
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import useStyles from "./styles";

export default function SchemaListItem(props) {
    const classes = useStyles();
    console.log(props);
    const { data } = props;
    const toReadPage = {
        pathname: `/app/schema/${data.host}/${data.id}`,
        state: {
          isFrom: 'schemas'
        }
      };
  
    return (
        <div className={classes.itemWrapper}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="table">
                    <TableRow className={classes.title}>
                        <h2>
                            <Link to={toReadPage}>{data.name}</Link>
                        </h2>
                    </TableRow>
                    <TableRow className={classes.root}>
                        {
                            data.description.length > 300
                            ? (
                            <span>
                                {data.description.slice(0, 300) + ' ... '}
                                <span className={classes.readMoreLink}>
                                <Link to={toReadPage}>
                                    Read More
                                </Link>
                                </span>
                            </span>
                            ) : (
                            <span>
                                {data.description + ' '} &nbsp;
                                <span className={classes.readMoreLink}>
                                <Link to={toReadPage}>
                                    Read More
                                </Link>
                                </span>
                            </span>
                            )
                        }
                    </TableRow>
                    <TableRow className={classes.root}>
                        <TableCell align="left">                        
                            <TagGroup tags = {data.tags}/>
                        </TableCell>
                    </TableRow>    
                </Table>
            </TableContainer>
        </div>
    )
}    

const TagGroup = ({ tags }) => (
    <div>
      {
        tags.map((tag) => {
          return <Button key={tag}>{tag}</Button>;
        })
      }
    </div>
);
