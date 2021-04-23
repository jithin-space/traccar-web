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
          error={error}
          required
          id="outlined-error-helper-text"
          label="Vehicle Name"
          variant="outlined"
          size="small"
        />
        <TextField
          error={error}
          required
          id="outlined-error-helper-text"
          label="Device ID"
          variant="outlined"
          size="small"
        />
         <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Device SIM Number"
          variant="outlined"
          size="small"
        />
          <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Date of fitting"
          variant="outlined"
          size="small"
        />
           <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Device Expiry Date"
          variant="outlined"
          size="small"
        />
           <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Chasis Number"
          variant="outlined"
          size="small"
        />
            <TextField
          error={error}
          required
          id="outlined-error-helper-text"
          label="License Plate"
          variant="outlined"
          size="small"
        />
          <TextField
          required
          error={error}
          id="outlined-error-helper-text"
          label="Make"
          variant="outlined"
          size="small"
        />
         <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Calibration Date"
          variant="outlined"
          size="small"
        />
         <TextField
          required
          error={error}
          id="outlined-error-helper-text"
          label="VIN/Serial Number"
          variant="outlined"
          size="small"
        />
         <TextField
          required
          error={error}
          id="outlined-error-helper-text"
          label="Type"
          variant="outlined"
          size="small"
        />
         <TextField
          required
          error={error}
          id="outlined-error-helper-text"
          label="Model"
          variant="outlined"
          size="small"
        />
         <TextField
          required
          error={error}
          id="outlined-error-helper-text"
          label="Year"
          variant="outlined"
          size="small"
        />
         <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Trim"
          variant="outlined"
          size="small"
        />
         <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Product Type"
          variant="outlined"
          size="small"
        />
         <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Speed Limit/Set Speed"
          variant="outlined"
          size="small"
          helperText="Kmph"
        />
         <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Registation State/Province"
          variant="outlined"
          size="small"
          style={{width: 250}}
        />
         <TextField
          error={error}
          id="outlined-error-helper-text"
          label="Photo"
          variant="outlined"
          size="small"
        />
      </form>
      </div>
    )
}