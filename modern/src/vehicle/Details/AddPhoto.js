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
        
      }
     },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      
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
      photo             : yup.mixed(),
      //img               : yup.mixed(),
  });
  

export default function AddIdentification({handleFormSave, activeStep, editItem, handleBack}) {
    const classes = useStyles();
    const [photoLoaded, setPhoto] = useState(false);
    const [localSave, setLocalSave] = useState({});
    const initialValues = {
      photo               : null,
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
    const data = localStorage.getItem('image-form');
    if(data) {
      setLocalSave(JSON.parse(data));
    }
      const imgData = localStorage.getItem('img');
      if(imgData)
      {
        const preview = document.querySelector('img');
         preview.src = imgData;
      }
    
  }, []);
  
  useEffect(() => {
    localStorage.setItem('image-form', JSON.stringify(localSave));
  });

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        const imgData  = {
          name: values.photo.name,
          type: values.photo.type,
          size: `${values.photo.size} bytes`
        }
        values.photo = imgData || null;
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
          style={{width: 300}}
          id="photo"
          size="medium"
          color="primary"
          name="photo"
          label="Photo"
          className="form-control"
          onChange={(e) => {
            formik.setFieldValue("photo", e.currentTarget.files[0]);
            const preview = document.querySelector('img');
            const file = document.querySelector('input[type=file]').files[0];
            
            const reader = new FileReader();
 
            reader.onloadend = (e) => {
              // convert image file to base64 string
              preview.src = reader.result;
              localStorage.setItem("img", e.target.result); //store to local
              //----------------
              //formik.setFieldValue('img', e.target.result); 
              //store to formData PS: This errors due to limitation in storing large data to attributes ------>
            };

            if (file) {
              reader.readAsDataURL(file);
            }

          }}
          type="file"
          inputProps={{accept:'image/*'}}
        /> 
        <img src="" height="200" width="300" alt=""></img>
        
        <div className={classes.actionsContainer}>
                
                   <Button
                      disabled={activeStep === 0}
                      className={classes.button}
                      onClick={handleBack}
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