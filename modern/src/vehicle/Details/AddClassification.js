import React,{useState} from 'react';
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
    status: yup
      .string('Enter device name')
      .required('required'),
    company: yup
      .string('')
      .required('required'),
      department: yup
      .string()
      .required('required'),
      operator: yup
      .string(),
      assignUser: yup
      .string(),  
      ownership: yup
      .string(),
 
  });
  

export default function AddClassification({handleFormSave, handleBack, activeStep, editItem}) {
    const classes = useStyles();
    const initialValues = {
      status: '',
      company: '',
      department: '',
      operator: '',
      assignUser: '',
      ownership: ''
    
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

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
       //alert(JSON.stringify(values, null, 2))
        handleFormSave(values);
      }

    })
    
    return (
     <div>
     <form className={classes.root} onSubmit={formik.handleSubmit}>
        <TextField
           fullWidth
           required
           id="status"
           label="Status"
           name="status"
           value={formik.values.status}
           onChange={formik.handleChange}
           error={formik.touched.status && Boolean(formik.errors.status)}
           helperText={formik.touched.status && formik.errors.status}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          required
          id="company"
          name="company"
          label="Company"
          variant="outlined"
          size="small"
          value={formik.values.company}
          onChange={formik.handleChange}
          error={formik.touched.company && Boolean(formik.errors.company)}
          helperText={formik.touched.company && formik.errors.company}

        />
         <TextField
          fullWidth
          required
          id="department"
          name="department"
          label="Department"
          variant="outlined"
          size="small"
          value={formik.values.department}
          onChange={formik.handleChange}
          error={formik.touched.department && Boolean(formik.errors.department)}
          helperText={formik.touched.department && formik.errors.department}

        />
           <TextField
          fullWidth
          id="operator"
          name="operator"
          label="Operator"
          variant="outlined"
          size="small"
          value={formik.values.operator}
          onChange={formik.handleChange}
          error={formik.touched.operator && Boolean(formik.errors.operator)}
          helperText={formik.touched.operator && formik.errors.operator}

        />
          <TextField
          fullWidth
          id="assignUser"
          name="assignUser"
          label="Assign User"
          variant="outlined"
          size="small"
          value={formik.values.assignUser}
          onChange={formik.handleChange}
          error={formik.touched.assignUser && Boolean(formik.errors.assignUser)}
          helperText={formik.touched.assignUser && formik.errors.assignUser}

        />
           <TextField
          fullWidth
          id="ownership"
          name="ownership"
          label="Ownership"
          variant="outlined"
          size="small"
          value={formik.values.ownership}
          onChange={formik.handleChange}
          error={formik.touched.ownership && Boolean(formik.errors.ownership)}
          helperText={formik.touched.ownership && formik.errors.ownership}

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