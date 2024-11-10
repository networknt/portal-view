import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useApiPost } from '../../hooks/useApiPost';
import { useUserState } from '../../contexts/UserContext';

export default function SubmitSpec(props) {
  console.log(props.location.state);
  const serviceId = props.location.state.serviceId;
  const style = props.location.state.style;
  const spec = props.location.state.spec;
  const { host } = useUserState();

  const body = {
    host: 'lightapi.net',
    service: 'market',
    action: 'updateServiceSpec',
    version: '0.1.0',
    data: { host, serviceId, style, spec },
  };
  const url = '/portal/command';
  const headers = {};
  const { isLoading, data, error } = useApiPost({ url, headers, body });
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
        <pre>{data ? JSON.stringify(data, null, 2) : 'Unauthorized'}</pre>
      </div>
    );
  }

  return <div>{wait}</div>;
}
