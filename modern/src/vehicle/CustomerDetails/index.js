import React from 'react';
import ProofOfAddress from './proofOfAddress';
import ProofOfIdentity from './proofOfIdentity';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));


export default function Details() {
    const classes = useStyles();
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          id="outlined-error-helper-text"
          label="Name"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-error-helper-text"
          label="Mobile"
          variant="outlined"
        />
         <TextField
          required
          id="outlined-error-helper-text"
          label="Address"
          variant="outlined"
        />
      </form>
            <ProofOfAddress />
            <ProofOfIdentity />
        </div>
    )
}