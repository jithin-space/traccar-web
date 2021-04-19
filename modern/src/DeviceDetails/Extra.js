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

export default function Extra() {
    const classes = useStyles();
    const [error, setError] = useState(false);
    return (
      <div>
        <h3>Extra</h3>
       <form className={classes.root} noValidate autoComplete="off">
        <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Group"
          variant="outlined"
        />
        <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Phone"
          variant="outlined"
        />
        <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Model"
          variant="outlined"
        />
        <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Contact"
          variant="outlined"
        />
            <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Category"
          variant="outlined"
        />
      </form>
      </div>
    )
}