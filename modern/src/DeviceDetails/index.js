import React, { useState, useEffect } from 'react';
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
import Switch from '@material-ui/core/Switch';
import { deviceCategories } from '../common/deviceCategories';
import { useEffectAsync } from '../reactHelper';

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
  name      : yup.string().required('required'),
  uniqueId  : yup.number().integer().required('required'),
  groupId   : yup.number().integer().nullable(true),
  phone     : yup.string().nullable(true),
  model     : yup.string().nullable(true),
  contact   : yup.string().nullable(true),
  category  : yup.string().nullable(true),
  disabled  : yup.boolean(),   
});


export default function DeviceDetails({ 
  handleFormSave, 
  editItem,
  titleGetter = item => item.name,
  keyGetter = item => item.id,
}) {
  const classes = useStyles();
  const [localSave, setLocalSave] = useState({});
  const [groupItems, setGroupItems] = useState([]);
  const initialValues = {
    name: '',
    uniqueId: '',
    groupId: '',
    phone: '',
    model: '',
    contact: '',
    category: '',
    disabled: false
  };
  if (editItem)
   { 
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
  const data = localStorage.getItem('first-form');
  if(data) {
    setLocalSave(JSON.parse(data));
  }
}, []);

useEffect(() => {
  localStorage.setItem('first-form', JSON.stringify(localSave));
});

useEffectAsync(async () => {
  const res = await fetch('/api/groups');
  if(res.ok) {
    setGroupItems(await res.json());
  }
}, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      setLocalSave(values); // value should be saved at local storage for displaying it 
                            // while user jumps back to completed form or while reloading
                         
      handleFormSave(values);
    }

  })

  return (
      <form className={classes.root} onSubmit={formik.handleSubmit}>
       <Grid container direction="row" justify="center" spacing={5}>
         <Grid item xs={3} alignItems="center">
           <h4>Primary</h4>
          <TextField
              fullWidth
              id="name"
              label="Name *"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="outlined"
            />
            <TextField
              fullWidth
              id="uniqueId"
              label="Identifier *"
              name="uniqueId"
              value={formik.values.uniqueId}
              onChange={formik.handleChange}
              error={formik.touched.uniqueId && Boolean(formik.errors.uniqueId)}
              helperText={formik.touched.uniqueId && formik.errors.uniqueId ? 'Identifier must be a number' : 'ex: 12345' }
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
                <InputLabel id="demo-simple-select-outlined-label">Group</InputLabel>
                  <Select
                    id="groupId"
                    name="groupId"
                    value={formik.values.groupId || 0}
                    onChange={formik.handleChange}
                    label="Group"
                    error={formik.touched.groupId && Boolean(formik.errors.groupId)}
                    helperText={formik.touched.groupId && formik.errors.groupId}
                   >
                  <MenuItem value={0}>None</MenuItem>
                   {groupItems.map(item => (
                      <MenuItem key={keyGetter(item)} value={keyGetter(item)}>{titleGetter(item)}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
              
                <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                  <Select
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    label="Category"
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                   >
                    <MenuItem value="">None</MenuItem>
                    {deviceCategories.map((item) => 
                      <MenuItem value={item}>{item}</MenuItem>
                    ) }
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
                          Back
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