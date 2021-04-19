import React from 'react';
import Required from './Required';
import Extra from './Extra';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function DeviceDetails() {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" spacing={1}>
      <Grid item xs={4}>
          <Required />  
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
              value="top"
              control={<Switch size="medium" color="primary" />}
              label={<h4>Disabled</h4>}
              labelPlacement="top"
            />
              </FormGroup>
       </FormControl> 
        </Grid>
      <Grid item xs={3}>
           <Extra />
        </Grid>
      
      
    </Grid>
    
  )
}