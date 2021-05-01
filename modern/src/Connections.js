import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LinkField from './form/LinkField';
import { prefixString } from './common/stringUtils';
import t from './common/localization';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    
  },

  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  
  }, 
}));



export default function Connections({ item, secondFormData, handleSubmit, goBackStep }) {
  const classes = useStyles();

  const onSubmit = () => {
    handleSubmit(secondFormData);
  }

  return (
    <form className={classes.root} onSubmit={onSubmit}>
       <Grid container direction="row" justify="center" spacing={5}>
         <Grid item xs={3} alignItems="center" >
           <LinkField
                  margin="normal"
                  endpointAll="/api/geofences"
                  endpointLinked={"/api/geofences?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="geofenceId"
                  label={t('sharedGeofences')}
                   />
                <LinkField
                  margin="normal"
                  endpointAll="/api/notifications"
                  endpointLinked={"/api/notifications?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="notificationId"
                  titleGetter={it => t(prefixString('event', it.type))}
                  label={t('sharedNotifications')}
                   />
                <LinkField
                  margin="normal"
                  endpointAll="/api/drivers"
                  endpointLinked={"/api/drivers?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="driverId"
                  label={t('sharedDrivers')}
                   />
              
              </Grid>
             <Grid item xs={3}>
             <LinkField
                  margin="normal"
                  endpointAll="/api/attributes/computed"
                  endpointLinked={"/api/attributes/computed?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="attributeId"
                  titleGetter={it => it.description}
                  label={t('sharedComputedAttributes')}
                   />
                <LinkField
                  margin="normal"
                  endpointAll="/api/maintenance"
                  endpointLinked={"/api/maintenance?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="maintenanceId"
                  label={t('sharedMaintenance')}
                   />            
              </Grid> 
              <Grid item xs={12}>
              <div className={classes.actionsContainer}>                 
                         <Button
                          variant="contained" 
                          className={classes.button}
                          fullWidth
                          onClick={goBackStep}
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
                          {'Submit'}
                        </Button>
     
                </div> 
              </Grid> 
              </Grid>
      </form>
      
  )
}
