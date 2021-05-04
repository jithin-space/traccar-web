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
    transmissionSummary    : yup.string().nullable(true),        
    transmissionBrand      : yup.string().nullable(true),        
    transmissionType       : yup.string().nullable(true),        
    transmissionGears      : yup.string().nullable(true),    
 
  });
  

export default function Engine({handleFormSave, handleBack, activeStep, editItem}) {
    const classes = useStyles();
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
        transmissionSummary    :  '',        
        transmissionBrand      :  '',        
        transmissionType       :  '',        
        transmissionGears      :  '',       
        
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
     const data = localStorage.getItem('transmission-form');
     if(data) {
       setLocalSave(JSON.parse(data));
     }
   }, []);
   
   useEffect(() => {
     localStorage.setItem('transmission-form', JSON.stringify(localSave));
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
           id="transmissionSummary"
           label="Transmission Summary"
           name="transmissionSummary"
           value={formik.values.transmissionSummary}
           onChange={formik.handleChange}
           error={formik.touched.transmissionSummary && Boolean(formik.errors.transmissionSummary)}
           helperText={formik.touched.transmissionSummary && formik.errors.transmissionSummary}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          id="transmissionBrand"
          name="transmissionBrand"
          label="Transmission Brand"
          variant="outlined"
          size="small"
          value={formik.values.transmissionBrand}
          onChange={formik.handleChange}
          error={formik.touched.transmissionBrand && Boolean(formik.errors.transmissionBrand)}
          helperText={formik.touched.transmissionBrand && formik.errors.transmissionBrand}

        />
         <TextField
          fullWidth
          id="transmissionType"
          name="transmissionType"
          label="Transmission Type"
          variant="outlined"
          size="small"
          value={formik.values.transmissionType}
          onChange={formik.handleChange}
          error={formik.touched.transmissionType && Boolean(formik.errors.transmissionType)}
          helperText={formik.touched.transmissionType && formik.errors.transmissionType}

        />
        <TextField
          fullWidth
          id="transmissionGears"
          name="transmissionGears"
          label="Transmission Gears"
          variant="outlined"
          size="small"
          value={formik.values.transmissionGears}
          onChange={formik.handleChange}
          error={formik.touched.transmissionGears && Boolean(formik.errors.transmissionGears)}
          helperText={formik.touched.transmissionGears && formik.errors.transmissionGears}

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