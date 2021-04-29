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
import ProductTypesList from './productTypes';
import { Input } from '@material-ui/core';
import productTypes from './productTypes';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: 200,
        
      }
     },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 200,
      maxHeight: '100px'
    },
    photoContainer: {
      margin: theme.spacing(2),
      width: 300,
      
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
      calibrationDate   : yup.date(),
      vinSerialNumber   : yup.string().required(),
      model             : yup.string().required(),
      year              : yup.string().required(),
      trim              : yup.string(),  
      productType       : yup.string(),
      speedLimit        : yup.string().required(),
      registrationState : yup.string(),
      photo             : yup.mixed(),
      //img               : yup.mixed(),
  });
  

export default function AddIdentification({handleFormSave, activeStep, editItem}) {
    const classes = useStyles();
    const [photoLoaded, setPhoto] = useState(false);
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
      vehicleType: '',
      vinSerialNumber   : '',
      model             : '',
      year              : '',
      trim              : '',
      productType       : '',
      speedLimit        : '',
      registrationState : '',
      photo             : null,
      //img               : '',
    
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
        //alert(JSON.stringify(values), null, 2);

        setLocalSave(values); // value should be saved at local storage for displaying it 
                            // while user jumps back to completed form or while reloading
        handleFormSave(values);
      }

    });
    
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
        <TextField
          fullWidth
          id="vinSerialNumber"
          name="vinSerialNumber"
          label="VIN Serial Number *"
          variant="outlined"
          size="small"
          value={formik.values.vinSerialNumber}
          onChange={formik.handleChange}
          error={formik.touched.vinSerialNumber && Boolean(formik.errors.vinSerialNumber)}
          helperText={formik.touched.vinSerialNumber && formik.errors.vinSerialNumber}

        />
         <TextField
          fullWidth
          id="model"
          name="model"
          label="Model *"
          variant="outlined"
          size="small"
          value={formik.values.model}
          onChange={formik.handleChange}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}

        />
          <TextField
          fullWidth
          id="year"
          name="year"
          label="Year *"
          variant="outlined"
          size="small"
          value={formik.values.year}
          onChange={formik.handleChange}
          error={formik.touched.year && Boolean(formik.errors.year)}
          helperText={formik.touched.year && formik.errors.year}

        />
          <TextField
          fullWidth
          id="trim"
          name="trim"
          label="Trim"
          variant="outlined"
          size="small"
          value={formik.values.trim}
          onChange={formik.handleChange}
          error={formik.touched.trim && Boolean(formik.errors.trim)}
          helperText={formik.touched.trim && formik.errors.trim}

        />
            <TextField
          fullWidth
          id="speedLimit"
          name="speedLimit"
          label="Speed Limit *"
          variant="outlined"
          size="small"
          value={formik.values.speedLimit}
          onChange={formik.handleChange}
          error={formik.touched.speedLimit && Boolean(formik.errors.speedLimit)}
          helperText={formik.touched.speedLimit && formik.errors.speedLimit}

        />
            <TextField
          fullWidth
          id="registrationState"
          name="registrationState"
          label="Registration State"
          variant="outlined"
          size="small"
          value={formik.values.registrationState}
          onChange={formik.handleChange}
          error={formik.touched.registrationState && Boolean(formik.errors.registrationState)}
          helperText={formik.touched.registrationState && formik.errors.registrationState}

        />

        <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Vehicle Type *</InputLabel>
                  <Select
                    id="vehicleType"
                    name="vehicleType"
                    value={formik.values.vehicleType}
                    onChange={formik.handleChange}
                    label="Vehicle Type *"
                    error={formik.touched.vehicleType && Boolean(formik.errors.vehicleType)}
                    helperText={formik.touched.vehicleType && formik.errors.vehicleType}
                   >
                   {vehicleTypesList.map((item) => 
                    <MenuItem value={item}>{item}</MenuItem>
                   )}
                  </Select>
            </FormControl>
           <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Product Type *</InputLabel>
                  <Select
                    id="productType"
                    name="productType"
                    value={formik.values.productType}
                    onChange={formik.handleChange}
                    label="Product Type *"
                    error={formik.touched.productType && Boolean(formik.errors.productType)}
                    helperText={formik.touched.productType && formik.errors.productType}
                   >
                   {ProductTypesList.map((item) => 
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