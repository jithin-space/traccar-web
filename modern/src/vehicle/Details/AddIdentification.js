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
import vehicleTypesList from './vehicleTypes';

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
    formControl: {
      margin: theme.spacing(2),
      minWidth: 220,
      maxHeight: '100px'
    },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right',
      marginBottom: theme.spacing(2),
      
    },
  }));

  const validationSchema = yup.object({

      vehicleName: yup.string('value must be a string').required('required'),
      deviceId: yup.string('value must be a string').required('required'),
      deviceSIMNumber: yup.string('value must be a string'),
      dateOfFitting: yup.string('value must be a string'),
      deviceExpiryDate: yup.string('value must be a string'),  
      engineNumber: yup.string('value must be a string'),
      vehicleType: yup.string('value must be a string').required('required'),
      chasisNumber: yup.string('value must be a string'),
      licensePlate: yup.string('value must be a string').required('required'),
      make: yup.string('value must be a string').required('required'),
      calibrationDate: yup.date(),
  });
  

export default function AddIdentification({handleFormSave, activeStep, editItem}) {
    const classes = useStyles();
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
      vehicleName: '',
      deviceId: '',
      deviceSIMNumber: '',
      dateOfFitting: '',
      deviceExpiryDate: '',
      engineNumber: '',
      chasisNumber: '',
      licensePlate: '',
      make: '',
      calibrationDate: '',
      vehicleType: ''
    
    };

  if(editItem){
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
    const data = localStorage.getItem('identification-form');
    if(data) {
      setLocalSave(JSON.parse(data));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('identification-form', JSON.stringify(localSave));
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
           id="vehicleName"
           label="Vehicle Name *"
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
          id="deviceId"
          name="deviceId"
          label="Device Id *"
          variant="outlined"
          size="small"
          value={formik.values.deviceId}
          onChange={formik.handleChange}
          error={formik.touched.deviceId && Boolean(formik.errors.deviceId)}
          helperText={formik.touched.deviceId && formik.errors.deviceId}

        />
         <TextField
          fullWidth
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
            <TextField
          fullWidth
          id="chasisNumber"
          name="chasisNumber"
          label="Chasis Number"
          variant="outlined"
          size="small"
          value={formik.values.chasisNumber}
          onChange={formik.handleChange}
          error={formik.touched.chasisNumber && Boolean(formik.errors.chasisNumber)}
          helperText={formik.touched.chasisNumber && formik.errors.chasisNumber}

          
        />
          <TextField
          fullWidth
   
          id="licensePlate"
          name="licensePlate"
          label="License Plate *"
          variant="outlined"
          size="small"
          value={formik.values.licensePlate}
          onChange={formik.handleChange}
          error={formik.touched.licensePlate && Boolean(formik.errors.licensePlate)}
          helperText={formik.touched.licensePlate && formik.errors.licensePlate}

        />
        <TextField
          fullWidth
          id="make"
          name="make"
          label="Make *"
          variant="outlined"
          size="small"
          value={formik.values.make}
          onChange={formik.handleChange}
          error={formik.touched.make && Boolean(formik.errors.make)}
          helperText={formik.touched.make && formik.errors.make}

        />
        <TextField
          fullWidth
          id="calibrationDate"
          name="calibrationDate"
          label="Calibration Date"
          variant="outlined"
          size="small"
          value={formik.values.calibrationDate}
          onChange={formik.handleChange}
          error={formik.touched.calibrationDate && Boolean(formik.errors.calibrationDate)}
          helperText={formik.touched.calibrationDate && formik.errors.calibrationDate}

        />
        <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                  <Select
                    id="vehicleType"
                    name="vehicleType"
                    value={formik.values.vehicleType}
                    onChange={formik.handleChange}
                    label="Type *"
                    error={formik.touched.vehicleType && Boolean(formik.errors.vehicleType)}
                    helperText={formik.touched.vehicleType && formik.errors.vehicleType}
                   >
                   {vehicleTypesList.map((item) => 
                    <MenuItem value={item}>{item}</MenuItem>
                   )}
                  </Select>
              </FormControl> 
        
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