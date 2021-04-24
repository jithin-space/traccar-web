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
        width: 220,
        
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
    unitToMeasureUtilization: yup
      .string(''),
    currentReading: yup
      .string(''),
    averageUsagePerDay: yup
      .string(),
    fuelUnit: yup
      .string(),
    measurementUnits: yup
      .string(),  
    
 
  });
  

export default function AddSettings({handleFormSave, handleBack, activeStep}) {
    const classes = useStyles();
    const formik = useFormik({
      initialValues: {
        unitToMeasureUtilization: '',
        currentReading: '',
        averageUsagePerDay: '',
        fuelUnit: '',
        measurementUnits: '',
       
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
           id="unitToMeasureUtilization"
           label="Unit to measure utilization"
           name="unitToMeasureUtilization"
           value={formik.values.unitToMeasureUtilization}
           onChange={formik.handleChange}
           error={formik.touched.unitToMeasureUtilization && Boolean(formik.errors.unitToMeasureUtilization)}
           helperText={formik.touched.unitToMeasureUtilization && formik.errors.unitToMeasureUtilization}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          id="currentReading"
          name="currentReading"
          label="Current Reading"
          variant="outlined"
          size="small"
          value={formik.values.currentReading}
          onChange={formik.handleChange}
          error={formik.touched.currentReading && Boolean(formik.errors.currentReading)}
          helperText={formik.touched.currentReading && formik.errors.currentReading}

        />
         <TextField
          fullWidth
          id="averageUsagePerDay"
          name="averageUsagePerDay"
          label="Average usage per day"
          variant="outlined"
          size="small"
          value={formik.values.averageUsagePerDay}
          onChange={formik.handleChange}
          error={formik.touched.averageUsagePerDay && Boolean(formik.errors.averageUsagePerDay)}
          helperText={formik.touched.averageUsagePerDay && formik.errors.averageUsagePerDay}

        />
           <TextField
          fullWidth
          id="fuelUnit"
          name="fuelUnit"
          label="Fuel Unit"
          variant="outlined"
          size="small"
          value={formik.values.fuelUnit}
          onChange={formik.handleChange}
          error={formik.touched.fuelUnit && Boolean(formik.errors.fuelUnit)}
          helperText={formik.touched.fuelUnit && formik.errors.fuelUnit}

        />
          <TextField
          fullWidth
          id="measurementUnit"
          name="measurementUnit"
          label="Measurement Unit"
          variant="outlined"
          size="small"
          value={formik.values.measurementUnit}
          onChange={formik.handleChange}
          error={formik.touched.measurementUnit && Boolean(formik.errors.measurementUnit)}
          helperText={formik.touched.measurementUnit && formik.errors.measurementUnit}

        />
      
        
        <div className={classes.actionsContainer}>
                
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
                      Finish
                    </Button>
                  
                
         </div>     
      </form>
    </div>
    )
}