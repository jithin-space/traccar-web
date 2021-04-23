import React,{useState} from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: 200,
      },
    },
  }));

export default function AddIdentification() {
    const classes = useStyles();
    const [error, setError] = useState(false);
    return (
     <div>
     <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          id="outlined-error-helper-text"
          label="Status"
          variant="outlined"
          size="small"
        />
        <TextField
          required
          id="outlined-error-helper-text"
          label="Company"
          variant="outlined"
          size="small"
        />
        <TextField
          required
          id="outlined-error-helper-text"
          label="Department"
          variant="outlined"
          size="small"
        />
         <TextField
          required
          id="outlined-error-helper-text"
          label="Operator"
          variant="outlined"
          size="small"
        />
         <TextField
          required
          id="outlined-error-helper-text"
          label="Assign User"
          variant="outlined"
          size="small"
        />
         <TextField
          required
          id="outlined-error-helper-text"
          label="Ownership"
          variant="outlined"
          size="small"
        />
      </form>
    </div>
    )
}