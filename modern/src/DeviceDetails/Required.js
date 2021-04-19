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
      width: 300,
    },
  },
}));

export default function Required() {
    const classes = useStyles();
    const [error, setError] = useState(false);
    return (
      <div>
        <h3>Primary</h3>
       <form className={classes.root} noValidate autoComplete="off">
        <TextField
          error={error}
          required
          id="outlined-error-helper-text"
          label="Name"
          variant="outlined"
        />
        <TextField
          error={error}
          required
          id="outlined-error-helper-text"
          label="Identifier"
          variant="outlined"
        />   
      </form>
      </div>
    )
}