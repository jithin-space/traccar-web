import React,{useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';

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
        engineCylinders :  yup.string(),        
        engineBrand     :  yup.string(),        
        engineNumber    :  yup.string(),        
        aspiration      :  yup.string(),       
        blockType       :  yup.string(),      
        bore            :  yup.string(), 
        camType         :  yup.string(),    
        compression     :  yup.string(),        
        valves          :  yup.string(),   
        displacement    :  yup.string(),       
        fuelInduction   :  yup.string(),       
        maxHP           :  yup.string(),  
        maxTorque       :  yup.string(),      
        redlineRPM      :  yup.string(),       
        engineStroke    :  yup.string(),   
        engineSummary   :  yup.string(),      
 
  });
  

export default function Engine({handleFormSave, handleBack, activeStep, editItem}) {
    const classes = useStyles();
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
        engineCylinders :  '',        
        engineBrand     :  '',        
        engineNumber    :  '',        
        aspiration      :  '',       
        blockType       :  '',      
        bore            :  '', 
        camType         :  '',    
        compression     :  '',        
        valves          :  '',   
        displacement    :  '',       
        fuelInduction   :  '',       
        maxHP           :  '',  
        maxTorque       :  '',      
        redlineRPM      :  '',       
        engineStroke    :  '',   
        engineSummary   :  '',      
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
     const data = localStorage.getItem('engine-form');
     if(data) {
       setLocalSave(JSON.parse(data));
     }
   }, []);
   
   useEffect(() => {
     localStorage.setItem('engine-form', JSON.stringify(localSave));
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
           id="engineCylinders"
           label="Cylinders"
           name="engineCylinders"
           value={formik.values.engineCylinders}
           onChange={formik.handleChange}
           error={formik.touched.engineCylinders && Boolean(formik.errors.engineCylinders)}
           helperText={formik.touched.engineCylinders && formik.errors.engineCylinders}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          id="engineBrand"
          name="engineBrand"
          label="Engine Brand"
          variant="outlined"
          size="small"
          value={formik.values.engineBrand}
          onChange={formik.handleChange}
          error={formik.touched.engineBrand && Boolean(formik.errors.engineBrand)}
          helperText={formik.touched.engineBrand && formik.errors.engineBrand}

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
          id="aspiration"
          name="aspiration"
          label="Aspiration"
          variant="outlined"
          size="small"
          value={formik.values.aspiration}
          onChange={formik.handleChange}
          error={formik.touched.aspiration && Boolean(formik.errors.aspiration)}
          helperText={formik.touched.aspiration && formik.errors.aspiration}

        />
        <TextField
          fullWidth
          id="blockType"
          name="blockType"
          label="Block Type"
          variant="outlined"
          size="small"
          value={formik.values.blockType}
          onChange={formik.handleChange}
          error={formik.touched.blockType && Boolean(formik.errors.blockType)}
          helperText={formik.touched.blockType && formik.errors.blockType}

        />
        <TextField
          fullWidth
          id="bore"
          name="bore"
          label="Bore"
          variant="outlined"
          size="small"
          value={formik.values.bore}
          onChange={formik.handleChange}
          error={formik.touched.bore && Boolean(formik.errors.bore)}
          helperText={formik.touched.bore && formik.errors.bore}

        />
         <TextField
          fullWidth
          id="camType"
          name="camType"
          label="Cam Type"
          variant="outlined"
          size="small"
          value={formik.values.camType}
          onChange={formik.handleChange}
          error={formik.touched.camType && Boolean(formik.errors.camType)}
          helperText={formik.touched.camType && formik.errors.camType}

        />
        <TextField
          fullWidth
          id="compression"
          name="compression"
          label="Compression"
          variant="outlined"
          size="small"
          value={formik.values.compression}
          onChange={formik.handleChange}
          error={formik.touched.compression && Boolean(formik.errors.compression)}
          helperText={formik.touched.compression && formik.errors.compression}

        />
        <TextField
          fullWidth
          id="valves"
          name="valves"
          label="Valves"
          variant="outlined"
          size="small"
          value={formik.values.valves}
          onChange={formik.handleChange}
          error={formik.touched.valves && Boolean(formik.errors.valves)}
          helperText={formik.touched.valves && formik.errors.valves}

        />
        <TextField
          fullWidth
          id="displacement"
          name="displacement"
          label="Displacement"
          variant="outlined"
          size="small"
          value={formik.values.displacement}
          onChange={formik.handleChange}
          error={formik.touched.displacement && Boolean(formik.errors.displacement)}
          helperText={formik.touched.displacement && formik.errors.displacement}

        />
        <TextField
          fullWidth
          id="fuelInduction"
          name="fuelInduction"
          label="Fuel Induction"
          variant="outlined"
          size="small"
          value={formik.values.fuelInduction}
          onChange={formik.handleChange}
          error={formik.touched.fuelInduction && Boolean(formik.errors.fuelInduction)}
          helperText={formik.touched.fuelInduction && formik.errors.fuelInduction}

        />
        <TextField
          fullWidth
          id="valves"
          name="valves"
          label="valves"
          variant="outlined"
          size="small"
          value={formik.values.valves}
          onChange={formik.handleChange}
          error={formik.touched.valves && Boolean(formik.errors.valves)}
          helperText={formik.touched.valves && formik.errors.valves}

        />
         <TextField
          fullWidth
          id="maxHP"
          name="maxHP"
          label="Max HP"
          variant="outlined"
          size="small"
          value={formik.values.maxHP}
          onChange={formik.handleChange}
          error={formik.touched.maxHP && Boolean(formik.errors.maxHP)}
          helperText={formik.touched.maxHP && formik.errors.maxHP}

        />
        <TextField
          fullWidth
          id="maxTorque"
          name="maxTorque"
          label="Max Torque"
          variant="outlined"
          size="small"
          value={formik.values.maxTorque}
          onChange={formik.handleChange}
          error={formik.touched.maxTorque && Boolean(formik.errors.maxTorque)}
          helperText={formik.touched.maxTorque && formik.errors.maxTorque}

        />
        <TextField
          fullWidth
          id="redlineRPM"
          name="redlineRPM"
          label="Redline RPM"
          variant="outlined"
          size="small"
          value={formik.values.redlineRPM}
          onChange={formik.handleChange}
          error={formik.touched.redlineRPM && Boolean(formik.errors.redlineRPM)}
          helperText={formik.touched.redlineRPM && formik.errors.redlineRPM}

        />
        <TextField
          fullWidth
          id="engineStroke"
          name="engineStroke"
          label="Engine Stroke"
          variant="outlined"
          size="small"
          value={formik.values.engineStroke}
          onChange={formik.handleChange}
          error={formik.touched.engineStroke && Boolean(formik.errors.engineStroke)}
          helperText={formik.touched.engineStroke && formik.errors.engineStroke}

        />
          <TextField
          fullWidth
          id="engineSummary"
          name="engineSummary"
          label="Engine Summary"
          variant="outlined"
          size="small"
          value={formik.values.engineSummary}
          onChange={formik.handleChange}
          error={formik.touched.engineSummary && Boolean(formik.errors.engineSummary)}
          helperText={formik.touched.engineSummary && formik.errors.engineSummary}

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