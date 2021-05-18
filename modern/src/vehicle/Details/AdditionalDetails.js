import React,{useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import typeOfStandards from './standards';
import limiterType from './limiterType';
import { bodyType, bodySubtype } from './vehiclebody';
import deviceType from './deviceType';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
      minWidth: 200,
      },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right',
      marginBottom: theme.spacing(2),
      
    },
  }));

  const validationSchema = yup.object({
        vehicle_owner               :  yup.string().nullable(true),      
        vehicleOwnerID              :  yup.string().nullable(true),
        ownerPhoneNumber            :  yup.string().nullable(true),
        speed_limiter_type          :  yup.string().nullable(true),
        deviceSecondaryNumber       :  yup.string().nullable(true),
        dealerName                  :  yup.string().nullable(true),
        dealerLocationOfStation     :  yup.string().nullable(true),
        emailAddress                :  yup.string().nullable(true),
        agentPhoneNumber            :  yup.string().nullable(true),
        businessRegNumber           :  yup.string().nullable(true),
        limiterSerial               :  yup.string().nullable(true),
        tamper_seal_number          :  yup.string().nullable(true),
        fittingAgentsName           :  yup.string().nullable(true),
        fittingAgentID              :  yup.string().nullable(true),
        application_standard        :  yup.string().nullable(true),
        installation_country        :  yup.string().nullable(true),
        colour                      :  yup.string().nullable(true),
        bodyType                    :  yup.string().nullable(true),
        bodySubtype                 :  yup.string().nullable(true),
        msrp                        :  yup.string().nullable(true),
        linkedVehicles              :  yup.string().nullable(true),
        deviceType                  :  yup.string().nullable(true),
        primaryFuelTankCapacity     :  yup.string().nullable(true),
 
  });
  

export default function AddClassification({handleFormSave, handleBack, activeStep, editItem}) {
    const classes = useStyles();
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
        vehicle_owner              :   '',      
        vehicleOwnerID             :   '',
        ownerPhoneNumber           :   '',
        speed_limiter_type         :   '',
        deviceSecondaryNumber      :   '',
        dealerName                 :   '',
        dealerLocationOfStation    :   '',
        emailAddress               :   '',
        agentPhoneNumber           :   '',
        businessRegNumber          :   '',
        limiterSerial              :   '',
        tamper_seal_number         :   '',
        fittingAgentsName          :   '',
        fittingAgentID             :   '',
        application_standard        :   '',
        installation_country        :   '',
        colour                     :   '',
        bodyType                   :   '',
        bodySubtype                :   '',
        msrp                       :   '',
        linkedVehicles             :   '',
        deviceType                 :   '',
        primaryFuelTankCapacity    :   '',
        
    
    };

   if(editItem) {
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
    const data = localStorage.getItem('additional-form');
    if(data) {
      setLocalSave(JSON.parse(data));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('additional-form', JSON.stringify(localSave));
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
           id="vehicle_owner"
           label="Vehicle Owner No."
           name="vehicle_owner"
           value={formik.values.vehicle_owner}
           onChange={formik.handleChange}
           error={formik.touched.vehicle_owner && Boolean(formik.errors.vehicle_owner)}
           helperText={formik.touched.vehicle_owner && formik.errors.vehicle_owner}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          id="vehicleOwnerID"
          name="vehicleOwnerID"
          label="Vehicle Owner ID"
          variant="outlined"
          size="small"
          value={formik.values.vehicleOwnerID }
          onChange={formik.handleChange}
          error={formik.touched.vehicleOwnerID && Boolean(formik.errors.vehicleOwnerID)}
          helperText={formik.touched.vehicleOwnerID && formik.errors.vehicleOwnerID}

        />
         <TextField
          fullWidth
          id="ownerPhoneNumber"
          name="ownerPhoneNumber"
          label="Owner Phone No."
          variant="outlined"
          size="small"
          value={formik.values.ownerPhoneNumber}
          onChange={formik.handleChange}
          error={formik.touched.ownerPhoneNumber && Boolean(formik.errors.ownerPhoneNumber)}
          helperText={formik.touched.ownerPhoneNumber && formik.errors.ownerPhoneNumber}

        />      
        
          <TextField
          fullWidth
          id="deviceSecondaryNumber"
          name="deviceSecondaryNumber"
          label="Device Secondary No."
          variant="outlined"
          size="small"
          value={formik.values.deviceSecondaryNumber}
          onChange={formik.handleChange}
          error={formik.touched.deviceSecondaryNumber && Boolean(formik.errors.deviceSecondaryNumber)}
          helperText={formik.touched.deviceSecondaryNumber && formik.errors.deviceSecondaryNumber}

        />
           <TextField
          fullWidth
          id="dealerName"
          name="dealerName"
          label="Dealer Name"
          variant="outlined"
          size="small"
          value={formik.values.dealerName}
          onChange={formik.handleChange}
          error={formik.touched.dealerName && Boolean(formik.errors.dealerName)}
          helperText={formik.touched.dealerName && formik.errors.dealerName}

        />
            <TextField
          fullWidth
          id="dealerLocationOfStation"
          name="dealerLocationOfStation"
          label="Dealer Location"
          variant="outlined"
          size="small"
          value={formik.values.dealerLocationOfStation}
          onChange={formik.handleChange}
          error={formik.touched.dealerLocationOfStation && Boolean(formik.errors.dealerLocationOfStation)}
          helperText={formik.touched.dealerLocationOfStation && formik.errors.dealerLocationOfStation}

        />
          <TextField
          fullWidth
          id="emailAddress"
          name="emailAddress"
          label="Email Address"
          variant="outlined"
          size="small"
          value={formik.values.emailAddress}
          onChange={formik.handleChange}
          error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
          helperText={formik.touched.emailAddress && formik.errors.emailAddress}

        />
           <TextField
          fullWidth
          id="agentPhoneNumber"
          name="agentPhoneNumber"
          label="Agent Phone Number"
          variant="outlined"
          size="small"
          value={formik.values.agentPhoneNumber}
          onChange={formik.handleChange}
          error={formik.touched.agentPhoneNumber && Boolean(formik.errors.agentPhoneNumber)}
          helperText={formik.touched.agentPhoneNumber && formik.errors.agentPhoneNumber}

        />
            <TextField
          fullWidth
          id="businessRegNumber"
          name="businessRegNumber"
          label="Business Reg. Number"
          variant="outlined"
          size="small"
          value={formik.values.businessRegNumber}
          onChange={formik.handleChange}
          error={formik.touched.businessRegNumber && Boolean(formik.errors.businessRegNumber)}
          helperText={formik.touched.businessRegNumber && formik.errors.businessRegNumber}

        />
             <TextField
          fullWidth
          id="limiterSerial"
          name="limiterSerial"
          label="Limiter Serial"
          variant="outlined"
          size="small"
          value={formik.values.limiterSerial}
          onChange={formik.handleChange}
          error={formik.touched.limiterSerial && Boolean(formik.errors.limiterSerial)}
          helperText={formik.touched.limiterSerial && formik.errors.limiterSerial}

        />
             <TextField
          fullWidth
          id="tamper_seal_number"
          name="tamper_seal_number"
          label="Tamper Seal Number"
          variant="outlined"
          size="small"
          value={formik.values.tamper_seal_number}
          onChange={formik.handleChange}
          error={formik.touched.tamper_seal_number && Boolean(formik.errors.tamper_seal_number)}
          helperText={formik.touched.tamper_seal_number && formik.errors.tamper_seal_number}

        />
            <TextField
          fullWidth
          id="fittingAgentsName"
          name="fittingAgentsName"
          label="Fitting Agents No."
          variant="outlined"
          size="small"
          value={formik.values.fittingAgentsName}
          onChange={formik.handleChange}
          error={formik.touched.fittingAgentsName && Boolean(formik.errors.fittingAgentsName)}
          helperText={formik.touched.fittingAgentsName && formik.errors.fittingAgentsName}

        />
         <TextField
          fullWidth
          id="fittingAgentID"
          name="fittingAgentID"
          label="Fitting Agent ID"
          variant="outlined"
          size="small"
          value={formik.values.fittingAgentID}
          onChange={formik.handleChange}
          error={formik.touched.fittingAgentID && Boolean(formik.errors.fittingAgentID)}
          helperText={formik.touched.fittingAgentID && formik.errors.fittingAgentID}

        />
         <TextField
          fullWidth
          id="installation_country"
          name="installation_country"
          label="Installation Country"
          variant="outlined"
          size="small"
          value={formik.values.installation_country}
          onChange={formik.handleChange}
          error={formik.touched.installation_country && Boolean(formik.errors.installation_country)}
          helperText={formik.touched.installation_country && formik.errors.installation_country}

        />
           <TextField
          fullWidth
          id="colour"
          name="colour"
          label="colour"
          variant="outlined"
          size="small"
          value={formik.values.colour}
          onChange={formik.handleChange}
          error={formik.touched.colour && Boolean(formik.errors.colour)}
          helperText={formik.touched.colour && formik.errors.colour}

        />
            <TextField
          fullWidth
          id="linkedVehicles"
          name="linkedVehicles"
          label="Linked Vehicles"
          variant="outlined"
          size="small"
          value={formik.values.linkedVehicles}
          onChange={formik.handleChange}
          error={formik.touched.linkedVehicles && Boolean(formik.errors.linkedVehicles)}
          helperText={formik.touched.linkedVehicles && formik.errors.linkedVehicles}

        />
            <TextField
          fullWidth
          id="msrp"
          name="msrp"
          label="MSRP"
          variant="outlined"
          size="small"
          value={formik.values.msrp}
          onChange={formik.handleChange}
          error={formik.touched.msrp && Boolean(formik.errors.msrp)}
          helperText={formik.touched.msrp && formik.errors.msrp}

        />
      
         <TextField
          fullWidth
          style={{width: 230}}
          id="primaryFuelTankCapacity"
          name="primaryFuelTankCapacity"
          label="Primary Fuel Tank Capacity"
          variant="outlined"
          size="small"
          value={formik.values.primaryFuelTankCapacity}
          onChange={formik.handleChange}
          error={formik.touched.primaryFuelTankCapacity && Boolean(formik.errors.primaryFuelTankCapacity)}
          helperText={formik.touched.primaryFuelTankCapacity && formik.errors.primaryFuelTankCapacity}

        />
        
        <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Limiter Type</InputLabel>
                  <Select
                    id="speed_limiter_type"
                    name="speed_limiter_type"
                    label="Limiter Type"      
                    value={formik.values.speed_limiter_type}
                    onChange={formik.handleChange}
                    error={formik.touched.speed_limiter_type && Boolean(formik.errors.speed_limiter_type)}
                   
                   >
                   {limiterType.map((item) => 
                    <MenuItem value={item}>{item}</MenuItem>
                   )}
                  </Select>
            </FormControl>
        <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Application Standard</InputLabel>
                  <Select
                    id="application_standard"
                    name="application_standard"
                    value={formik.values.application_standard}
                    onChange={formik.handleChange}
                    label="Application Standard"
                    error={formik.touched.application_standard && Boolean(formik.errors.application_standard)}
                    
                   >
                   {typeOfStandards.map((item) => 
                    <MenuItem value={item}>{item}</MenuItem>
                   )}
                  </Select>
        </FormControl> 
        <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Body Type</InputLabel>
                  <Select
                    id="bodyType"
                    name="bodyType"
                    value={formik.values.bodyType}
                    onChange={formik.handleChange}
                    label="Body Type"
                    error={formik.touched.bodyType && Boolean(formik.errors.bodyType)}
                   
                   >
                   {bodyType.map((item) => 
                    <MenuItem value={item}>{item}</MenuItem>
                   )}
                  </Select>
        </FormControl> 
        <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Body Sub Type</InputLabel>
                  <Select
                    id="bodySubtype"
                    name="bodySubtype"
                    value={formik.values.bodySubtype}
                    onChange={formik.handleChange}
                    label="Body Sub Type"
                    error={formik.touched.bodySubtype && Boolean(formik.errors.bodySubtype)}
                    
                   >
                   {bodySubtype.map((item) => 
                    <MenuItem value={item}>{item}</MenuItem>
                   )}
                  </Select>
        </FormControl> 
        <FormControl  variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Device Type</InputLabel>
                  <Select
                    id="deviceType"
                    name="deviceType"
                    value={formik.values.deviceType}
                    onChange={formik.handleChange}
                    label="deviceType"
                    error={formik.touched.deviceType && Boolean(formik.errors.deviceType)}
                    
                   >
                   {deviceType.map((item) => 
                    <MenuItem value={item}>{item}</MenuItem>
                   )}
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
                      Save
                    </Button>
                  
                
         </div>     
      </form>
    </div>
    )
}