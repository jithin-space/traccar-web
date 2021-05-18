import React,{useState, useEffect} from 'react';
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
    towingCapacity          : yup.string().nullable(true),
    maxPayload              : yup.string().nullable(true),
    epaCity                 : yup.string().nullable(true),
    epaHighway              : yup.string().nullable(true),
    epaCombined             : yup.string().nullable(true),  
    vehicleWidth            : yup.string().nullable(true),
    vehicleHeight           : yup.string().nullable(true), 
    vehicleLength           : yup.string().nullable(true), 
    interiorVolume          : yup.string().nullable(true),
    passengerVolume         : yup.string().nullable(true),
    cargoVolume             : yup.string().nullable(true),
    groundClearence         : yup.string().nullable(true),
    bedLength               : yup.string().nullable(true),
    curbWeight              : yup.string().nullable(true),
    grossVehicleWeightRating: yup.string().nullable(true),


 
  });
  

export default function Specificaion({handleFormSave, handleBack, activeStep, editItem}) {
    const classes = useStyles();
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
        towingCapacity: '',   
        maxPayload: '',
        epaCity: '',
        epaHighway: '',
        epaCombined: '',
        vehicleWidth: '',
        vehicleHeight:'',
        vehicleLength: '',
        interiorVolume          :  '',
        passengerVolume         :  '',
        cargoVolume             :  '',
        groundClearence         :  '',
        bedLength               :  '',
        curbWeight              :  '',
        grossVehicleWeightRating  : '',


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
     const data = localStorage.getItem('specification-form');
     if(data) {
       setLocalSave(JSON.parse(data));
     }
   }, []);
   
   useEffect(() => {
     localStorage.setItem('specification-form', JSON.stringify(localSave));
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
           id="towingCapacity"
           label="Towing Capacity"
           name="towingCapacity"
           value={formik.values.towingCapacity}
           onChange={formik.handleChange}
           error={formik.touched.towingCapacity && Boolean(formik.errors.towingCapacity)}
           helperText={formik.touched.towingCapacity && formik.errors.towingCapacity}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          id="maxPayload"
          name="maxPayload"
          label="Max Payload"
          variant="outlined"
          size="small"
          value={formik.values.maxPayload}
          onChange={formik.handleChange}
          error={formik.touched.maxPayload && Boolean(formik.errors.maxPayload)}
          helperText={formik.touched.maxPayload && formik.errors.maxPayload}

        />
         <TextField
          fullWidth
          id="epaCity"
          name="epaCity"
          label="EPA City"
          variant="outlined"
          size="small"
          value={formik.values.epaCity}
          onChange={formik.handleChange}
          error={formik.touched.epaCity && Boolean(formik.errors.epaCity)}
          helperText={formik.touched.epaCity && formik.errors.epaCity}

        />
           <TextField
          fullWidth
          id="epaHighway"
          name="epaHighway"
          label="EPA Highway"
          variant="outlined"
          size="small"
          value={formik.values.epaHighway}
          onChange={formik.handleChange}
          error={formik.touched.epaHighway && Boolean(formik.errors.epaHighway)}
          helperText={formik.touched.epaHighway && formik.errors.epaHighway}

        />
          <TextField
          fullWidth
          id="epaCombined"
          name="epaCombined"
          label="EPA Combined"
          variant="outlined"
          size="small"
          value={formik.values.epaCombined}
          onChange={formik.handleChange}
          error={formik.touched.epaCombined && Boolean(formik.errors.epaCombined)}
          helperText={formik.touched.epaCombined && formik.errors.epaCombined}

        />
           <TextField
          fullWidth
          id="vehicleWidth"
          name="vehicleWidth"
          label="Vehicle Width"
          variant="outlined"
          size="small"
          value={formik.values.vehicleWidth}
          onChange={formik.handleChange}
          error={formik.touched.vehicleWidth && Boolean(formik.errors.vehicleWidth)}
          helperText={formik.touched.vehicleWidth && formik.errors.vehicleWidth}

        />
             <TextField
          fullWidth
          id="vehicleHeight"
          name="vehicleHeight"
          label="Vehicle Height"
          variant="outlined"
          size="small"
          value={formik.values.vehicleHeight}
          onChange={formik.handleChange}
          error={formik.touched.vehicleHeight && Boolean(formik.errors.vehicleHeight)}
          helperText={formik.touched.vehicleHeight && formik.errors.vehicleHeight}

        />
          <TextField
          fullWidth
          id="interiorVolume"
          name="interiorVolume"
          label="Interior Volume"
          variant="outlined"
          size="small"
          value={formik.values.interiorVolume}
          onChange={formik.handleChange}
          error={formik.touched.interiorVolume && Boolean(formik.errors.interiorVolume)}
          helperText={formik.touched.interiorVolume && formik.errors.interiorVolume}

        />
            <TextField
          fullWidth
          id="passengerVolume"
          name="passengerVolume"
          label="Passenger Volume"
          variant="outlined"
          size="small"
          value={formik.values.passengerVolume}
          onChange={formik.handleChange}
          error={formik.touched.passengerVolume && Boolean(formik.errors.passengerVolume)}
          helperText={formik.touched.passengerVolume && formik.errors.passengerVolume}

        />
            <TextField
          fullWidth
          id="cargoVolume"
          name="cargoVolume"
          label="Cargo Volume"
          variant="outlined"
          size="small"
          value={formik.values.cargoVolume}
          onChange={formik.handleChange}
          error={formik.touched.cargoVolume && Boolean(formik.errors.cargoVolume)}
          helperText={formik.touched.cargoVolume && formik.errors.cargoVolume}

        />
           <TextField
          fullWidth
          id="groundClearence"
          name="groundClearence"
          label="Ground Clearence"
          variant="outlined"
          size="small"
          value={formik.values.groundClearence}
          onChange={formik.handleChange}
          error={formik.touched.groundClearence && Boolean(formik.errors.groundClearence)}
          helperText={formik.touched.groundClearence && formik.errors.groundClearence}

        />
           <TextField
          fullWidth
          id="bedLength"
          name="bedLength"
          label="Bed Length"
          variant="outlined"
          size="small"
          value={formik.values.bedLength}
          onChange={formik.handleChange}
          error={formik.touched.bedLength && Boolean(formik.errors.bedLength)}
          helperText={formik.touched.bedLength && formik.errors.bedLength}

        />
           <TextField
          fullWidth
          id="curbWeight"
          name="curbWeight"
          label="Curb Weight"
          variant="outlined"
          size="small"
          value={formik.values.curbWeight}
          onChange={formik.handleChange}
          error={formik.touched.curbWeight && Boolean(formik.errors.curbWeight)}
          helperText={formik.touched.curbWeight && formik.errors.curbWeight}

        />
           <TextField
          fullWidth
          style={{width: 230}}
          id="grossVehicleWeightRating"
          name="grossVehicleWeightRating"
          label="Gross Vehicle Weight Rating"
          variant="outlined"
          size="small"
          value={formik.values.grossVehicleWeightRating}
          onChange={formik.handleChange}
          error={formik.touched.grossVehicleWeightRating && Boolean(formik.errors.grossVehicleWeightRating)}
          helperText={formik.touched.grossVehicleWeightRating && formik.errors.grossVehicleWeightRating}

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
                      Save
                    </Button>
                  
                
         </div>     
      </form>
    </div>
    )
}