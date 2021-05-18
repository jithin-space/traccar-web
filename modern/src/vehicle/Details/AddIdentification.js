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

      vehicle_name    :     yup.string().required('required').nullable(true),
      device_id       :     yup.string().required('required').nullable(true),
      device_sim_no   :     yup.string().nullable(true),
      install_date    :     yup.date().nullable(true),
      expiry_date     :     yup.date().nullable(true),  
      engineNumber    :     yup.string().nullable(true),
      vehicle_type    :     yup.string().required('required').nullable(true),
      chasis_number   :     yup.string().nullable(true),
      licensePlate    :     yup.string().required('required'),
      vehicle_make    :     yup.string().required('required').nullable(true),
      calibrationDate :     yup.date().nullable(true),
      vinSerialNumber :     yup.string().required().nullable(true),
      vehicle_model   :     yup.string().required().nullable(true),
      vehicle_year    :     yup.string().required().nullable(true),
      trim            :     yup.string().nullable(true),
      productType     :     yup.string().nullable(true),
      max_speed       :     yup.string().required().nullable(true),
      registrationState :   yup.string().nullable(true),
      photo             :   yup.mixed().nullable(true),
      //img               : yup.mixed(),
  });
  

export default function AddIdentification({handleFormSave, activeStep, editItem}) {
    const classes = useStyles();
    const [photoLoaded, setPhoto] = useState(false);
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
      vehicle_name: '',
      device_id: '',
      device_sim_no: '',
      install_date: '',
      expiry_date: '',
      engineNumber: '',
      chasis_number: '',
      licensePlate: '',
      vehicle_make: '',
      calibrationDate: '',
      vehicle_type: '',
      vinSerialNumber   : '',
      vehicle_model             : '',
      vehicle_year              : '',
      trim              : '',
      productType       : '',
      max_speed        : '',
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
           id="vehicle_name"
           label="Vehicle Name *"
           name="vehicle_name"
           value={formik.values.vehicle_name}
           onChange={formik.handleChange}
           error={formik.touched.vehicle_name && Boolean(formik.errors.vehicle_name)}
           helperText={formik.touched.vehicle_name && formik.errors.vehicle_name}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          id="device_id"
          name="device_id"
          label="Device Id *"
          variant="outlined"
          size="small"
          value={formik.values.device_id}
          onChange={formik.handleChange}
          error={formik.touched.device_id && Boolean(formik.errors.device_id)}
          helperText={formik.touched.device_id && formik.errors.device_id}

        />
         <TextField
          fullWidth
          id="device_sim_no"
          name="device_sim_no"
          label="Device SIM Number"
          variant="outlined"
          size="small"
          value={formik.values.device_sim_no}
          onChange={formik.handleChange}
          error={formik.touched.device_sim_no && Boolean(formik.errors.device_sim_no)}
          helperText={formik.touched.device_sim_no && formik.errors.device_sim_no}

        />
           <TextField
          fullWidth
          id="install_date"
          name="install_date"
          label="Date of Fitting"
          variant="outlined"
          size="small"
          value={formik.values.install_date}
          onChange={formik.handleChange}
          error={formik.touched.install_date && Boolean(formik.errors.install_date)}
          helperText={formik.touched.install_date && formik.errors.install_date ? 'Invalid Date format MM/DD/YYYY' : 'MM/DD/YYYY'}

        />
          <TextField
          fullWidth
          id="expiry_date"
          name="expiry_date"
          label="Device Expiry Date"
          variant="outlined"
          size="small"
          value={formik.values.expiry_date}
          onChange={formik.handleChange}
          error={formik.touched.expiry_date && Boolean(formik.errors.expiry_date)}
          helperText={formik.touched.expiry_date && formik.errors.expiry_date ? 'Invalid Date format MM/DD/YYYY' : 'MM/DD/YYYY'}

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
          id="chasis_number"
          name="chasis_number"
          label="Chasis Number"
          variant="outlined"
          size="small"
          value={formik.values.chasis_number}
          onChange={formik.handleChange}
          error={formik.touched.chasis_number && Boolean(formik.errors.chasis_number)}
          helperText={formik.touched.chasis_number && formik.errors.chasis_number}

          
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
          id="vehicle_make"
          name="vehicle_make"
          label="Make *"
          variant="outlined"
          size="small"
          value={formik.values.vehicle_make}
          onChange={formik.handleChange}
          error={formik.touched.vehicle_make && Boolean(formik.errors.vehicle_make)}
          helperText={formik.touched.vehicle_make && formik.errors.vehicle_make}

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
          helperText={(formik.touched.calibrationDate && formik.errors.calibrationDate) ? 'Invalid Date format MM/DD/YYYY' : 'MM/DD/YYYY'}

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
          id="vehicle_model"
          name="vehicle_model"
          label="Model *"
          variant="outlined"
          size="small"
          value={formik.values.vehicle_model}
          onChange={formik.handleChange}
          error={formik.touched.vehicle_model && Boolean(formik.errors.vehicle_model)}
          helperText={formik.touched.vehicle_model && formik.errors.vehicle_model}

        />
          <TextField
          fullWidth
          id="vehicle_year"
          name="vehicle_year"
          label="Year *"
          variant="outlined"
          size="small"
          value={formik.values.vehicle_year}
          onChange={formik.handleChange}
          error={formik.touched.vehicle_year && Boolean(formik.errors.vehicle_year)}
          helperText={formik.touched.vehicle_year && formik.errors.vehicle_year}

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
          id="max_speed"
          name="max_speed"
          label="Speed Limit *"
          variant="outlined"
          size="small"
          value={formik.values.max_speed}
          onChange={formik.handleChange}
          error={formik.touched.max_speed && Boolean(formik.errors.max_speed)}
          helperText={formik.touched.max_speed && formik.errors.max_speed}

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
                    id="vehicle_type"
                    name="vehicle_type"
                    value={formik.values.vehicle_type}
                    onChange={formik.handleChange}
                    label="Vehicle Type *"
                    error={formik.touched.vehicle_type && Boolean(formik.errors.vehicle_type)}
                    helperText={formik.touched.vehicle_type && formik.errors.vehicle_type}
                   >
                   {vehicleTypesList.map((item) => 
                    <MenuItem value={item}>{item}</MenuItem>
                   )}
                  </Select>
            </FormControl>
           <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Product Type</InputLabel>
                  <Select
                    id="productType"
                    name="productType"
                    value={formik.values.productType}
                    onChange={formik.handleChange}
                    label="Product Type"
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