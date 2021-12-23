import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

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
  };

  const getLocales = () => {
    props.history.push({
      pathname: '/app/ref/locale',
      state: { data: { valueId } },
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="valueId" label="Value Id" onChange={onChange} />
      <Button variant="contained" color="primary" onClick={getLocales}>
        Get Locales
      </Button>
    </form>
  );
}
