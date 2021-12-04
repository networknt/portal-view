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

export default function RelationForm(props) {
  const classes = useStyles();
  const [relationId, setRelationId] = useState('');

  const onChange = (event) => {
    setRelationId(event.target.value);
  }
  
  const getRelations = () => {
    props.history.push({pathname: '/app/ref/relation', state: { data : { relationId }}});
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="relationId" label="Relation Id" onChange={onChange}/>
      <Button variant="contained" color="primary" onClick={getRelations}>
        Get Relations
      </Button>
    </form>
  );
}
