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
      customerName: yup
      .string(''),
      customerMobile: yup
      .string(''),
      customerAddress: yup
      .string(),
      addressProofType: yup
      .string(),
      addressProofNumber: yup
      .string(),  
      identityProofType: yup
      .string(),
      identitiyProofNumber: yup
      .string()
 
  });
  

export default function AddCustomerDetails({handleFormSave, handleBack, activeStep, editItem}) {
    const classes = useStyles();
    const initialValues = {
      customerName: '',
      customerMobile: '',
      customerAddress: '',
      addressProofType: '',
      addressProofNumber: '' ,
      identityProofType:  '',
      identitiyProofNumber: '',
     
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
           id="customerName"
           label="Name"
           name="customerName"
           value={formik.values.customerName}
           onChange={formik.handleChange}
           error={formik.touched.customerName && Boolean(formik.errors.customerName)}
           helperText={formik.touched.customerName && formik.errors.customerName}
           variant="outlined"
           size="small"
        />
         <TextField
          fullWidth
          id="customerMobile"
          name="customerMobile"
          label="Mobile"
          variant="outlined"
          size="small"
          value={formik.values.customerMobile}
          onChange={formik.handleChange}
          error={formik.touched.customerMobile && Boolean(formik.errors.customerMobile)}
          helperText={formik.touched.customerMobile && formik.errors.customerMobile}

        />
         <TextField
          fullWidth
          id="addressProofType"
          name="addressProofType"
          label="Address Proof Type"
          variant="outlined"
          size="small"
          value={formik.values.addressProofType}
          onChange={formik.handleChange}
          error={formik.touched.addressProofType && Boolean(formik.errors.addressProofType)}
          helperText={formik.touched.addressProofType && formik.errors.addressProofType}

        />
           <TextField
          fullWidth
          id="addressProofNumber"
          name="addressProofNumber"
          label="Address Proof Number"
          variant="outlined"
          size="small"
          value={formik.values.addressProofNumber}
          onChange={formik.handleChange}
          error={formik.touched.addressProofNumber && Boolean(formik.errors.addressProofNumber)}
          helperText={formik.touched.addressProofNumber && formik.errors.addressProofNumber}

        />
          <TextField
          fullWidth
          id="identityProofType"
          name="identityProofType"
          label="Identity Proof Type"
          variant="outlined"
          size="small"
          value={formik.values.identityProofType}
          onChange={formik.handleChange}
          error={formik.touched.identityProofType && Boolean(formik.errors.identityProofType)}
          helperText={formik.touched.identityProofType && formik.errors.identityProofType}

        />
           <TextField
          fullWidth
          id="identitiyProofNumber"
          name="identitiyProofNumber"
          label="Identitiy Proof Number"
          variant="outlined"
          size="small"
          value={formik.values.identitiyProofNumber}
          onChange={formik.handleChange}
          error={formik.touched.identitiyProofNumber && Boolean(formik.errors.identitiyProofNumber)}
          helperText={formik.touched.identitiyProofNumber && formik.errors.identitiyProofNumber}

        />
        
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