import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function TableForm(props) {
  const classes = useStyles();
  const [tableId, setTableId] = useState('');

  const onChange = (event) => {
    setTableId(event.target.value);
  }
  
  const getValues = () => {
    props.history.push({pathname: '/app/ref/value', state: { data : { tableId }}});
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="tableId" label="Table Id" onChange={onChange}/>
      <Button variant="contained" color="primary" onClick={getValues}>
        Get Values
      </Button>
    </form>
  );
}
