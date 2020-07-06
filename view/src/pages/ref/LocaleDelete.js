import React from 'react';
import { useApiPost } from '../../hooks/useApiPost';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function ValueDelete(props) {
	console.log(props.location.state.data);
    const valueId = props.location.state.data.valueId;
    const language = props.location.state.data.language;
	const body = {
		host: 'lightapi.net',
		service: 'ref',
		action: 'deleteLocale',
		version: '0.1.0',
		data: { valueId, language }
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
