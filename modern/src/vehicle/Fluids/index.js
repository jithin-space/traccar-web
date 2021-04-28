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
    oilCapacity: yup.string(),   
    fuelType: yup.string(),
    fuelQuality: yup.string(),
    fuelTank1Capacity: yup.string(),
    fuelTank2Capacity: yup.string(),
 
  });
  

export default function Specificaion({handleFormSave, handleBack, activeStep, editItem}) {
    const classes = useStyles();
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
        oilCapacity: '',   
        fuelType: '',
        fuelQuality: '',
        fuelTank1Capacity: '',
        fuelTank2Capacity: '',
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
     const data = localStorage.getItem('fluids-form');
     if(data) {
       setLocalSave(JSON.parse(data));
     }
   }, []);
   
   useEffect(() => {
     localStorage.setItem('fluids-form', JSON.stringify(localSave));
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
           id="oilCapacity"
           label="Oil Capacity"
           name="oilCapacity"
           value={formik.values.oilCapacity}
           onChange={formik.handleChange}
           error={formik.touched.oilCapacity && Boolean(formik.errors.oilCapacity)}
           helperText={formik.touched.oilCapacity && formik.errors.oilCapacity}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          id="fuelType"
          name="fuelType"
          label="Fuel Type"
          variant="outlined"
          size="small"
          value={formik.values.fuelType}
          onChange={formik.handleChange}
          error={formik.touched.fuelType && Boolean(formik.errors.fuelType)}
          helperText={formik.touched.fuelType && formik.errors.fuelType}

        />
         <TextField
          fullWidth
          id="fuelQuality"
          name="fuelQuality"
          label="Fuel Quality"
          variant="outlined"
          size="small"
          value={formik.values.fuelQuality}
          onChange={formik.handleChange}
          error={formik.touched.fuelQuality && Boolean(formik.errors.fuelQuality)}
          helperText={formik.touched.fuelQuality && formik.errors.fuelQuality}

        />
           <TextField
          fullWidth
          id="fuelTank1Capacity"
          name="fuelTank1Capacity"
          label="Fuel Tank1 Capacity"
          variant="outlined"
          size="small"
          value={formik.values.fuelTank1Capacity}
          onChange={formik.handleChange}
          error={formik.touched.fuelTank1Capacity && Boolean(formik.errors.fuelTank1Capacity)}
          helperText={formik.touched.fuelTank1Capacity && formik.errors.fuelTank1Capacity}

        />
          <TextField
          fullWidth
          id="fuelTank2Capacity"
          name="fuelTank2Capacity"
          label="Fuel Tank2 Capacity"
          variant="outlined"
          size="small"
          value={formik.values.fuelTank2Capacity}
          onChange={formik.handleChange}
          error={formik.touched.fuelTank2Capacity && Boolean(formik.errors.fuelTank2Capacity)}
          helperText={formik.touched.fuelTank2Capacity && formik.errors.fuelTank2Capacity}

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