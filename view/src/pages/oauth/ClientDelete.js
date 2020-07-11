import React from 'react';
import { useApiDelete } from '../../hooks/useApiDelete';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function ClientDelete(props) {
	console.log(props.location.state.data);
	const clientId = props.location.state.data.clientId;
	const url = '/oauth2/client/' + clientId;
	const headers = {};
	const { isLoading, data, error } = useApiDelete({url, headers});
  	console.log(isLoading, data, error);
	let wait;
	if(isLoading) {
		wait = <div><CircularProgress/></div>;
	} else {
		wait = (
		<div>
	    	<pre>{ data ? JSON.stringify(data, null, 2) : error }</pre>
		</div>
		)  
	}	

	return (
	<div>
		{wait}
	</div>
	);
}
