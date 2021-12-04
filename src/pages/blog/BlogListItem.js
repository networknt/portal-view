// this is a component to render an item in the BlogList component.
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import useStyles from "./styles";
import { validateImageUrl, timeConversion } from "../../utils";

export default function BlogListItem(props) {
    const classes = useStyles();
    console.log(props);
    const {data} = props;
    const [imageUrlValid, setImageUrlValid] = useState(false);

    useEffect(() => {
        // Create an scoped async function in the hook
        async function checkImageUrl() {
            await validateImageUrl(data.featuredImageUrl);
            setImageUrlValid(true);
        }
        // Execute the created function directly
        checkImageUrl();                    
    }, []);
  
    const toReadPage = {
        pathname: `/app/blog/${data.host}/${data.id}`,
        state: {
          isFrom: 'blogs'
        }
      };
  
    return (
        <div className={classes.itemWrapper}>
            {
                imageUrlValid
                ? (
                <div className={classes.imageWrapper}>
                    <div className={classes.image} 
                        style={{backgroundImage: `url(${data.featuredImageUrl})`}}
                    />
                </div>
                ) : (
                null
                )
            }

            <TableContainer component={Paper}>
                <Table size="small" aria-label="table">
                    <TableRow className={classes.title}>
                        <h2>
                            <Link to={toReadPage}>{data.title}</Link>
                        </h2>
                    </TableRow>
                    <TableRow className={classes.infoWrapper}>
                        <TableCell align="left">
                            Posted by <span className={classes.author}>{data.author}</span>
                        </TableCell>
                        <TableCell align="right" className={classes.timeConversion}>
                            {timeConversion((new Date()).getTime() - data.publishDate)}
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.root}>
                        {
                        data.summary.length > 300
                            ? (
                            <span>
                                {data.summary.slice(0, 300) + ' ... '}
                                <span className={classes.readMoreLink}>
                                <Link to={toReadPage}>
                                    Read More
                                </Link>
                                </span>
                            </span>
                            ) : (
                            <span>
                                {data.summary + ' '} &nbsp;
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

  

