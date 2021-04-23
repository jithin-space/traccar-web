import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useFormik } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 250,
    },
  },
  main: {
    margin: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    marginBottom: theme.spacing(2),
    
  }, 
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }, 
}));

const validationSchema = yup.object({
  group: yup
    .string(),
  phone: yup
    .number()
    .min(10, 'Number should be of minimum 10 characters length'),
  model: yup
     .string(),
  contact: yup
     .string(),
  category: yup
     .string(),

});

export default function Extra({handleFormSave, handleBack, submitButton, activeStep }) {
    const classes = useStyles();
    const formik = useFormik({
      initialValues: {
        group: '',
        phone: '',
        model: '',
        contact: '',
        category: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
       
        handleFormSave(values);
      }

    })
    return (
      <div className={classes.main}>
        <form className={classes.root} noValidate autoComplete="off">
        
        
        <div className={classes.actionsContainer}>
                  <div >
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Prev
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"   
                      type="submit"
                      className={classes.button}
                    >
                      {submitButton}
                    </Button>
                  </div>
         </div>     
      </form>
      </div>
    )
}