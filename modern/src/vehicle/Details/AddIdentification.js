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

export default function AddIdentification() {
    const classes = useStyles();
    const [error, setError] = useState(false);
    return (
      <div>
        <h3>Identification</h3>
       <form className={classes.root} noValidate autoComplete="off">
        <TextField
          error={error}
          required
          id="outlined-error-helper-text"
          label="Vehicle Name"
          helperText="Incorrect entry."
          variant="outlined"
        />
        <TextField
          error={error}
          required
          id="outlined-error-helper-text"
          label="Device ID"
          helperText="Incorrect entry."
          variant="outlined"
        />
         <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Device SIM Number"
          helperText="Incorrect entry."
          variant="outlined"
        />
          <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Date of fitting"
          helperText="Incorrect entry."
          variant="outlined"
        />
      </form>
      </div>
    )
}