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

export default function RelationForm(props) {
  const classes = useStyles();
  const [relationId, setRelationId] = useState('');

  const onChange = (event) => {
    setRelationId(event.target.value);
  };

  const getRelations = () => {
    props.history.push({
      pathname: '/app/ref/relation',
      state: { data: { relationId } },
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="relationId" label="Relation Id" onChange={onChange} />
      <Button variant="contained" color="primary" onClick={getRelations}>
        Get Relations
      </Button>
    </form>
  );
}
