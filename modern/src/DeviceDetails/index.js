import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  main: {
    margin: theme.spacing(4),
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }, 
  switch: {
    marginTop: theme.spacing(3)
  }
}));

const validationSchema = yup.object({
  name: yup
    .string('Enter device name')
    .required('required'),
  uniqueId: yup
    .number('Enter a uniqueId')
    .integer('Id should be an Integer')
    .required('required'),
  groupId: yup
    .number()
    .integer('Id should be an Integer'),
  phone: yup
    .string(),
  model: yup
     .string(),
  contact: yup
     .string(),
  category: yup
     .string(),
});


export default function DeviceDetails({ handleFormSave }) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      groupId: '',
      phone: '',
      model: '',
      contact: '',
      category: '',
      disabled: false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSave(values);
    }

  })

  return (
      <form className={classes.root} onSubmit={formik.handleSubmit}>
       <Grid container direction="row" justify="center" spacing={5}>
         <Grid item xs={3} alignItems="center">
           <h4>Primary</h4>
          <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              id="uniqueId"
              label="Identifier"
              name="uniqueId"
              value={formik.values.uniqueId}
              onChange={formik.handleChange}
              error={formik.touched.uniqueId && Boolean(formik.errors.uniqueId)}
              helperText={formik.touched.uniqueId && formik.errors.uniqueId}
              variant="outlined"
            />   
           
             <FormControlLabel 
             className={classes.switch}
             control={
              <Switch  
              checked={formik.values.disabled}
              onChange={formik.handleChange}
              name="disabled"
              color="secondary" 
              />
             }
             labelPlacement="top"
             label={<span style={{fontSize: '0.9rem',fontWeight: 'bold'}}>Disabled</span>}
              
            />
             
               
         </Grid>
         <Grid item xs={3}>
         <h4>Extra</h4>
              <TextField
                  fullWidth
                  disabled
                  id="groupId"
                  label="Group"
                  name="groupId"
                  value={formik.values.group}
                  onChange={formik.handleChange}
                  error={formik.touched.groupId && Boolean(formik.errors.groupId)}
                  helperText={formik.touched.groupId && formik.errors.groupId}  
                  variant="outlined"
                  size="small"
                />
                <TextField
                  fullWidth                
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  variant="outlined"
                  size="small"
                />   
                <TextField
                  fullWidth
                  id="model"
                  label="Model"
                  name="model"
                  value={formik.values.model}
                  onChange={formik.handleChange}
                  error={formik.touched.model && Boolean(formik.errors.model)}
                  helperText={formik.touched.model && formik.errors.model}
                  variant="outlined"
                  size="small"
                />  
                    <TextField
                  fullWidth
                  id="contact"
                  label="Contact"
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  error={formik.touched.contact && Boolean(formik.errors.contact)}
                  helperText={formik.touched.contact && formik.errors.contact}
                  variant="outlined"
                  size="small"
                />  
                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Cateogry</InputLabel>
                  <Select
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    label="Category"
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                   >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
              </FormControl> 
          
          </Grid>
          <Grid item xs={12}>
              <div className={classes.actionsContainer}>                 
                         <Button
                          disabled
                          variant="contained" 
                          className={classes.button}
                          fullWidth
                        >
                          Prev
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"   
                          type="submit"
                          className={classes.button}
                          fullWidth
                        >
                          {'Save & Continue '}
                        </Button>
     
              </div>  
            </Grid>   
       </Grid>
      </form>
      
  
    
  )
}