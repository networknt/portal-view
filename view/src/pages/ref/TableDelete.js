import React from 'react';
import { useApiPost } from '../../hooks/useApiPost';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function TableDelete(props) {
	console.log(props.location.state.data);
	const tableId = props.location.state.data.tableId;
	const body = {
		host: 'lightapi.net',
		service: 'ref',
		action: 'deleteTable',
		version: '0.1.0',
		data: { tableId }
	};
	const url = '/portal/command';
	const headers = {};
	const { isLoading, data, error } = useApiPost({url, headers, body});
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
