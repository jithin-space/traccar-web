import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 300,
    },
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
}));

const validationSchema = yup.object({
  name: yup
    .string('Enter device name')
    .required('required'),
  uniqueId: yup
    .number('Enter a uniqueId')
    .min(8, 'uniqueId should be of minimum 8 characters length')
    .required('required')
});

export default function Required({ handleFormSave, handleBack, submitButton, activeStep }) {
    const classes = useStyles();
    const formik = useFormik({
      initialValues: {
        name: '',
        uniqueId: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
       
        handleFormSave(values);
      }

    })
 
    return (
      <div>
       <form className={classes.root} onSubmit={formik.handleSubmit}>
       <TextField
          fullWidth
          required
          id="name"
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          id="uniqueId"
          label="Identifier"
          name="uniqueId"
          value={formik.values.uniqueId}
          onChange={formik.handleChange}
          error={formik.touched.uniqueId && Boolean(formik.errors.uniqueId)}
          helperText={formik.touched.uniqueId && formik.errors.uniqueId}
          variant="outlined"
        />   
        <div className={classes.actionsContainer}>
                  <Grid container direction="row">
                   <Grid xs={6}>
                   <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                      fullWidth
                    >
                      Prev
                    </Button>
                   </Grid>
                    <Grid xs={6}>
                    <Button
                      variant="contained"
                      color="secondary"   
                      type="submit"
                      className={classes.button}
                      fullWidth
                    >
                      {submitButton}
                    </Button>
                    </Grid>
                  </Grid> 
                
         </div>     
      </form>
      
      </div>
    )
}