import React from 'react';
import { useApiGet } from '../../hooks/useApiGet';
import { useUserState } from "../../context/UserContext";
import Widget from "../../components/Widget";
import useStyles from "./styles";

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function ServiceDetail(props) {
  const serviceId = props.location.state.data.serviceId;
  const { history} = props;
  const classes = useStyles();
  const { host } = useUserState();
  const cmd = {
    host: 'lightapi.net',
    service: 'market',
    action: 'getServiceById',
    version: '0.1.0',
    data: { serviceId, host }
  }
  const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));
  console.log(url);
  const headers = {};

  const { isLoading, data } = useApiGet({url, headers});

  const uploadSpec = () => {
      props.history.push({pathname: '/app/uploadSpec', state: { data }});
  };

  const listEndpoint = () => {
    props.history.push({pathname: '/app/listEndpoint', state: { data }});
  };

  let wait;
  if(isLoading) {
    wait = <div><CircularProgress/></div>;
  } else {
    wait = (
      <Widget
        title="Service Detail"
        upperTitle
        bodyClass={classes.fullHeightBody}
        className={classes.card}
      >
        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={uploadSpec}>
            Upload Spec
          </Button>
          <Button variant="contained" color="primary" onClick={listEndpoint}>
            List Endpoint
          </Button>
        </div>  
        <pre>{ data ? JSON.stringify(data, null, 2) : 'Unauthorized' }</pre>
      </Widget>
    )
  }

  return (
    <div className="App">
      {wait}
    </div>
  );
}
