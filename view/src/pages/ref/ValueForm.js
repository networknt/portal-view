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

export default function ValueForm(props) {
  const classes = useStyles();
  const [valueId, setValueId] = useState('');

  const onChange = (event) => {
    setValueId(event.target.value);
  }
  
  const getLocales = () => {
    props.history.push({pathname: '/app/ref/locale', state: { data : { valueId }}});
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="valueId" label="Value Id" onChange={onChange}/>
      <Button variant="contained" color="primary" onClick={getLocales}>
        Get Locales
      </Button>
    </form>
  );
}
