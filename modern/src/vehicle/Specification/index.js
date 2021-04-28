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
    towingCapacity: yup
      .string(),
    maxPayload: yup
      .string(),
    epaCity: yup
      .string(),
    epaHighway: yup
      .string(),
    epaCombined: yup
      .string(),  
    vehicleWidth: yup
      .string(),
    vehicleHeight: yup
      .string(), 
    vehicleLength: yup
      .string(),  
 
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
          id="vehicleLength"
          name="vehicleLength"
          label="Vehicle Length"
          variant="outlined"
          size="small"
          value={formik.values.vehicleLength}
          onChange={formik.handleChange}
          error={formik.touched.vehicleLength && Boolean(formik.errors.vehicleLength)}
          helperText={formik.touched.vehicleLength && formik.errors.vehicleLength}

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