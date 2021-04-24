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
        width: 200,
        
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
      vehicleName: yup
      .string('Enter device name')
      .required('required'),
      deviceId: yup
      .string('')
      .required('required'),
      deviceSIMNumber: yup
      .string()
      .required('required'),
      dateOfFitting: yup
      .string(),
      deviceExpiryDate: yup
      .string(),  
      engineNumber: yup
      .string(),
 
  });
  

export default function AddIdentification({handleFormSave, activeStep}) {
    const classes = useStyles();
    const formik = useFormik({
      initialValues: {
        vehicleName: '',
        deviceId: '',
        deviceSIMNumber: '',
        dateOfFitting: '',
        deviceExpiryDate: '',
        engineNumber: ''
       
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
       //alert(JSON.stringify(values, null, 2))
        handleFormSave(values);
      }

    })
    
    return (
     <div>
     <form className={classes.root} onSubmit={formik.handleSubmit}>
        <TextField
           fullWidth
           required
           id="vehicleName"
           label="Vehicle Name"
           name="vehicleName"
           value={formik.values.vehicleName}
           onChange={formik.handleChange}
           error={formik.touched.vehicleName && Boolean(formik.errors.vehicleName)}
           helperText={formik.touched.vehicleName && formik.errors.vehicleName}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          required
          id="deviceId"
          name="deviceId"
          label="Device Id"
          variant="outlined"
          size="small"
          value={formik.values.deviceId}
          onChange={formik.handleChange}
          error={formik.touched.deviceId && Boolean(formik.errors.deviceId)}
          helperText={formik.touched.deviceId && formik.errors.deviceId}

        />
         <TextField
          fullWidth
          required
          id="deviceSIMNumber"
          name="deviceSIMNumber"
          label="Device SIM Number"
          variant="outlined"
          size="small"
          value={formik.values.deviceSIMNumber}
          onChange={formik.handleChange}
          error={formik.touched.deviceSIMNumber && Boolean(formik.errors.deviceSIMNumber)}
          helperText={formik.touched.deviceSIMNumber && formik.errors.deviceSIMNumber}

        />
           <TextField
          fullWidth
          id="dateOfFitting"
          name="dateOfFitting"
          label="Date of Fitting"
          variant="outlined"
          size="small"
          value={formik.values.dateOfFitting}
          onChange={formik.handleChange}
          error={formik.touched.dateOfFitting && Boolean(formik.errors.dateOfFitting)}
          helperText={formik.touched.dateOfFitting && formik.errors.dateOfFitting}

        />
          <TextField
          fullWidth
          id="deviceExpiryDate"
          name="deviceExpiryDate"
          label="Device Expiry Date"
          variant="outlined"
          size="small"
          value={formik.values.deviceExpiryDate}
          onChange={formik.handleChange}
          error={formik.touched.deviceExpiryDate && Boolean(formik.errors.deviceExpiryDate)}
          helperText={formik.touched.deviceExpiryDate && formik.errors.deviceExpiryDate}

        />
           <TextField
          fullWidth
          id="engineNumber"
          name="engineNumber"
          label="Engine Number"
          variant="outlined"
          size="small"
          value={formik.values.engineNumber}
          onChange={formik.handleChange}
          error={formik.touched.engineNumber && Boolean(formik.errors.engineNumber)}
          helperText={formik.touched.engineNumber && formik.errors.engineNumber}

        />
        
        <div className={classes.actionsContainer}>
                
                   <Button
                      disabled={activeStep === 0}
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
                      Save
                    </Button>
                  
                
         </div>     
      </form>
    </div>
    )
}