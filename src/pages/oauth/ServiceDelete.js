import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useApiDelete } from '../../hooks/useApiDelete';

export default function ServiceDelete(props) {
  console.log(props.location.state.data);
  const serviceId = props.location.state.data.serviceId;
  const url = '/oauth2/service/' + serviceId;
  const headers = {};
  const { isLoading, data, error } = useApiDelete({ url, headers });
  console.log(isLoading, data, error);
  let wait;
  if (isLoading) {
    wait = (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    wait = (
      <div>
        <pre>{data ? JSON.stringify(data, null, 2) : error}</pre>
      </div>
    );
  }

  return <div>{wait}</div>;
}
