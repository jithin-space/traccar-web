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
    driveType               :  yup.string().nullable(true),
    brakeSystem             :  yup.string().nullable(true),
    frontTrackWidth         :  yup.string().nullable(true),
    rearTrackWidth          :  yup.string().nullable(true),
    wheelbase               :  yup.string().nullable(true),
    frontWheelDiameter      :  yup.string().nullable(true),
    rearWheelDiameter       :  yup.string().nullable(true),
    rearAxle                :  yup.string().nullable(true),
    frontTyreType           :  yup.string().nullable(true),
    frontTyrePSI            :  yup.string().nullable(true),
    rearTyreType            :  yup.string().nullable(true),
    rearTyrePSI             :  yup.string().nullable(true),
 
  });
  

export default function WheelsAndTyres({handleFormSave, handleBack, activeStep, editItem}) {
    const classes = useStyles();
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
        driveType               :   '',
        brakeSystem             :   '',
        frontTrackWidth         :   '',
        rearTrackWidth          :   '',
        wheelbase               :   '',
        frontWheelDiameter      :   '',
        rearWheelDiameter       :   '',
        rearAxle                :   '',
        frontTyreType           :   '',
        frontTyrePSI            :   '',
        rearTyreType            :   '',
        rearTyrePSI             :   '',
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
     const data = localStorage.getItem('wheel-form');
     if(data) {
       setLocalSave(JSON.parse(data));
     }
   }, []);
   
   useEffect(() => {
     localStorage.setItem('wheel-form', JSON.stringify(localSave));
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
           id="driveType"
           label="Drive Type"
           name="driveType"
           value={formik.values.driveType}
           onChange={formik.handleChange}
           error={formik.touched.driveType && Boolean(formik.errors.driveType)}
           helperText={formik.touched.driveType && formik.errors.driveType}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          id="brakeSystem"
          name="brakeSystem"
          label="Brake System"
          variant="outlined"
          size="small"
          value={formik.values.brakeSystem}
          onChange={formik.handleChange}
          error={formik.touched.brakeSystem && Boolean(formik.errors.brakeSystem)}
          helperText={formik.touched.brakeSystem && formik.errors.brakeSystem}

        />
         <TextField
          fullWidth
          id="frontTrackWidth"
          name="frontTrackWidth"
          label="Front Track Width"
          variant="outlined"
          size="small"
          value={formik.values.frontTrackWidth}
          onChange={formik.handleChange}
          error={formik.touched.frontTrackWidth && Boolean(formik.errors.frontTrackWidth)}
          helperText={formik.touched.frontTrackWidth && formik.errors.frontTrackWidth}

        />
           <TextField
          fullWidth
          id="rearTrackWidth"
          name="rearTrackWidth"
          label="Rear Track Width"
          variant="outlined"
          size="small"
          value={formik.values.rearTrackWidth}
          onChange={formik.handleChange}
          error={formik.touched.rearTrackWidth && Boolean(formik.errors.rearTrackWidth)}
          helperText={formik.touched.rearTrackWidth && formik.errors.rearTrackWidth}

        />
          <TextField
          fullWidth
          id="wheelbase"
          name="wheelbase"
          label="Wheel Base"
          variant="outlined"
          size="small"
          value={formik.values.wheelbase}
          onChange={formik.handleChange}
          error={formik.touched.wheelbase && Boolean(formik.errors.wheelbase)}
          helperText={formik.touched.wheelbase && formik.errors.wheelbase}

        />
           <TextField
          fullWidth
          id="frontWheelDiameter"
          name="frontWheelDiameter"
          label="Front Wheel Diameter"
          variant="outlined"
          size="small"
          value={formik.values.frontWheelDiameter}
          onChange={formik.handleChange}
          error={formik.touched.frontWheelDiameter && Boolean(formik.errors.frontWheelDiameter)}
          helperText={formik.touched.frontWheelDiameter && formik.errors.frontWheelDiameter}

        />
             <TextField
          fullWidth
          id="rearWheelDiameter"
          name="rearWheelDiameter"
          label="Rear Wheel Diameter"
          variant="outlined"
          size="small"
          value={formik.values.rearWheelDiameter}
          onChange={formik.handleChange}
          error={formik.touched.rearWheelDiameter && Boolean(formik.errors.rearWheelDiameter)}
          helperText={formik.touched.rearWheelDiameter && formik.errors.rearWheelDiameter}

        />
          <TextField
          fullWidth
          id="rearAxle"
          name="rearAxle"
          label="Rear Axle"
          variant="outlined"
          size="small"
          value={formik.values.rearAxle}
          onChange={formik.handleChange}
          error={formik.touched.rearAxle && Boolean(formik.errors.rearAxle)}
          helperText={formik.touched.rearAxle && formik.errors.rearAxle}

        />
            <TextField
          fullWidth
          id="frontTyreType"
          name="frontTyreType"
          label="Front Tyre Type"
          variant="outlined"
          size="small"
          value={formik.values.frontTyreType}
          onChange={formik.handleChange}
          error={formik.touched.frontTyreType && Boolean(formik.errors.frontTyreType)}
          helperText={formik.touched.frontTyreType && formik.errors.frontTyreType}

        />
            <TextField
          fullWidth
          id="frontTyrePSI"
          name="frontTyrePSI"
          label="Front Tyre PSI"
          variant="outlined"
          size="small"
          value={formik.values.frontTyrePSI}
          onChange={formik.handleChange}
          error={formik.touched.frontTyrePSI && Boolean(formik.errors.frontTyrePSI)}
          helperText={formik.touched.frontTyrePSI && formik.errors.frontTyrePSI}

        />
            <TextField
          fullWidth
          id="rearTyreType"
          name="rearTyreType"
          label="Rear Tyre Type"
          variant="outlined"
          size="small"
          value={formik.values.rearTyreType}
          onChange={formik.handleChange}
          error={formik.touched.rearTyreType && Boolean(formik.errors.rearTyreType)}
          helperText={formik.touched.rearTyreType && formik.errors.rearTyreType}

        />
            <TextField
          fullWidth
          id="rearTyrePSI"
          name="rearTyrePSI"
          label="Rear Tyre PSI"
          variant="outlined"
          size="small"
          value={formik.values.rearTyrePSI}
          onChange={formik.handleChange}
          error={formik.touched.rearTyrePSI && Boolean(formik.errors.rearTyrePSI)}
          helperText={formik.touched.rearTyrePSI && formik.errors.rearTyrePSI}

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