import React,{useState} from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

export default function ProofOfAddress() {
    const classes = useStyles();
    const [error, setError] = useState(false);
    return (
     <div>
     <h3>Proof of Address</h3>   
     <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          id="outlined-error-helper-text"
          label="Address Proof Type"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-error-helper-text"
          label="Address Proof Number"
          variant="outlined"
        />
      </form>
    </div>
    )
}