import React,{useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: 230,
        
      },
     },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 230,
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
    measurementUnit: yup
      .string(),  
    
 
  });
  

export default function AddSettings({handleFormSave, handleBack, activeStep, editItem}) {
    const classes = useStyles();
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
      unitToMeasureUtilization: '',
      currentReading: '',
      averageUsagePerDay: '',
      fuelUnit: '',
      measurementUnit: '',
     
    };
    if (editItem) {
      Object.keys(editItem).map(item => 
        Object.keys(initialValues).map(function(key, index) {
          if(key === item) {
           initialValues[key] = editItem[key];
          }   
        })
      );
     }
     if (localSave) 
     {
       Object.keys(localSave).map(item => 
         Object.keys(initialValues).map(function(key, index) {
             if(key === item) {
               initialValues[key] = localSave[key];
              }   
         })
       );
     }
     useEffect(() => {
       const data = localStorage.getItem('settings-form');
       if(data) {
         setLocalSave(JSON.parse(data));
       }
     }, []);
     
     useEffect(() => {
       localStorage.setItem('settings-form', JSON.stringify(localSave));
     });
   
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
       //alert(JSON.stringify(values, null, 2))
        setLocalSave(values); // value should be saved at local storage for displaying it 
                            // while user jumps back to completed form or while reloading
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
        <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Unit to measure utilization</InputLabel>
                  <Select    
                    id="unitToMeasureUtilization"
                    label="Unit to measure utilization"
                    name="unitToMeasureUtilization"
                    value={formik.values.unitToMeasureUtilization}
                    onChange={formik.handleChange}
                    error={formik.touched.unitToMeasureUtilization && Boolean(formik.errors.unitToMeasureUtilization)}
                    helperText={formik.touched.unitToMeasureUtilization && formik.errors.unitToMeasureUtilization}
                   >
                   
                   <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="miles">Miles</MenuItem>
                    <MenuItem value="kilometers">Kilometers</MenuItem>  
                    <MenuItem value="Hours">Hours</MenuItem>  
                   
                  </Select>
            </FormControl>
  
        <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Fuel Unit</InputLabel>
                  <Select    
                    id="fuelUnit"
                    name="fuelUnit"
                    label="Fuel Unit"
                    value={formik.values.fuelUnit}
                    onChange={formik.handleChange}
                    error={formik.touched.fuelUnit && Boolean(formik.errors.fuelUnit)}
                    helperText={formik.touched.fuelUnit && formik.errors.fuelUnit}
                   >
                   
                   <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Gallons(US)">Gallons(US)</MenuItem>
                    <MenuItem value="Gallons(UK)">Gallons(UK)</MenuItem>  
                    <MenuItem value="Litres">Litres</MenuItem>  
                   
                  </Select>
            </FormControl>
  
      
      <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Measurement Unit</InputLabel>
                  <Select    
                    id="measurementUnit"
                    name="measurementUnit"
                    label="Measurement Unit"                 
                    value={formik.values.measurementUnit}
                    onChange={formik.handleChange}
                    error={formik.touched.measurementUnit && Boolean(formik.errors.measurementUnit)}
                    helperText={formik.touched.measurementUnit && formik.errors.measurementUnit}
                   >
                     
                   <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Imperial">Imperial</MenuItem>
                    <MenuItem value="Metric">Metric</MenuItem>  
                  
                  </Select>
            </FormControl>
        
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