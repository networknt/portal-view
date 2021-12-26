import Button from '@mui/material/Button';
import React from 'react';
import { useUserState } from '../../context/UserContext';

export default function Header(props) {
  const { isAuthenticated } = useUserState();

  return (
    <div>
      <h2>
        {props.title}
        {isAuthenticated ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.pm(props.userId)}
          >
            Private Message
          </Button>
        ) : null}
      </h2>
    </div>
  );
}
