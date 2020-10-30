// This is the component to display the entire blog for readers.
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie'
import CircularProgress from '@material-ui/core/CircularProgress';
import { MarkdownParser, timeConversion } from '../../utils';
import useStyles from "./styles";

export default function BlogItem(props) {
    const classes = useStyles();
    console.log(props.match.params.host);
    console.log(props.match.params.id);
    const host = props.match.params.host;
    const id = props.match.params.id;
    const [blog, setBlog] = useState();
    const [loading, setLoading] = useState(true);
    
    const cmd = {
        host: 'lightapi.net',
        service: 'market',
        action: 'getBlogById',
        version: '0.1.0',
        data: { host, id }
    }
  
    const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
  
    const queryBlogFn = async (url, headers) => {
        try {
          setLoading(true);
          const response = await fetch(url, { headers, credentials: 'include'});
          //console.log(response);
          if (!response.ok) {
            const error = await response.json();
          } else {
            const data = await response.json();
            setBlog(data);
          }
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
    };
  
    useEffect(() => {
        const cookies = new Cookies();
        const headers = {'X-CSRF-TOKEN': cookies.get('csrf')};
        queryBlogFn(url, headers);
    }, []);
    
    let wait;
    if(loading) {
        wait = <div><CircularProgress/></div>;
    } else {
        console.log("blog = ", blog);
        wait = (
            <div>
                <h1 className={classes.title}>
                    {blog.title}
                </h1>
                Posted by <span className={classes.author}>{blog.author}</span> at {timeConversion((new Date()).getTime() - blog.publishDate)}
                <Content body={blog.body}/>
            </div>
        )
    }

    return (
        <div>
            {wait}  
        </div>
    )
}    

const Content = ({ body }) => {
    console.log("body = ", body);
    const classes = useStyles();
    const htmlOutput = MarkdownParser.render(body);
  
    const renderResult = {
      __html: htmlOutput
    };
  
    return (
      <div className={classes.content}>
        <div
          className={'markdown-body'}
          dangerouslySetInnerHTML={renderResult}
        />
      </div>
    );
  };
  