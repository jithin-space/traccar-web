import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import MainToolbar from './MainToolbar';
import FormControl from '@material-ui/core/FormControl';
import t from './common/localization';
import axios from './lib/axios';
import userAttributes from './attributes/userAttributes';
import { Accordion, AccordionSummary, AccordionDetails, makeStyles, Typography, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditAttributesView from './attributes/EditAttributesView';
import LinkField from './form/LinkField';
import { useEffectAsync } from './reactHelper';

const useStyles = makeStyles(() => ({
  details: {
    flexDirection: 'column',
  },
}));


const VendorPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [item, setItem] = useState();
  
  useEffectAsync(async () => {
    if (id) {
      const response = await fetch(`/api/vendor/${id}`);
      if (response.ok) {
        setItem(await response.json());
      }
    } else {
      setItem({});
    }
  }, [id]);

  const handleVendorAdd = async () => {

    const vendorObj = {
        ...item,
        attributes: {
            type: 'vendor',
            name: item.name || 'N/A'
        },
        readonly: true,
    };

   axios.post('/api/users', vendorObj)
    .then(res => {
      if(res.data && res.data.id) {
        axios.post('/api/groups', { name: item.name || 'N/A'})
         .then(resp => {
            if(resp.data && resp.data.id) {
              axios.post('/api/permissions', {
                userId: res.data.id,
                groupId: resp.data.id,
              }).then(data => {
                history.goBack();
              }).catch(err => {
                console.log(err);
                axios.delete('/api/users', { id: res.data.id });
                axios.delete('/api/groups', { id: resp.data.id });
              })
            }
         }).catch(err => {
           console.log(err);
           axios.delete('/api/users', { id: res.data.id});
         });
      }
    });
  };
  return (
      <>
      <MainToolbar />
      <Container maxWidth='xs' className={classes.container}>
        {item &&
          <>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('sharedRequired')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                margin="normal"
                value={item.name || ''}
                onChange={event => setItem({...item, name: event.target.value})}
                label={t('sharedName')}
                variant="filled" />
              <TextField
                margin="normal"
                value={item.email || ''}
                onChange={event => setItem({...item, email: event.target.value})}
                label={t('userEmail')}
                variant="filled" />
              <TextField
                margin="normal"
                type="password"
                onChange={event => setItem({...item, password: event.target.value})}
                label={t('userPassword')}
                variant="filled" />
            </AccordionDetails>
          </Accordion>
          {item.id &&
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {t('sharedConnections')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <LinkField
                  margin="normal"
                  endpointAll="/api/devices?all=true"
                  endpointLinked={"/api/devices?userId=" + item.id}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="deviceId"
                  label={t('deviceTitle')}
                  variant="filled" />
                <LinkField
                  margin="normal"
                  endpointAll="/api/groups?all=true"
                  endpointLinked={"/api/groups?userId=" + item.id}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="groupId"
                  label={t('settingsGroups')}
                  variant="filled" />
              </AccordionDetails>
            </Accordion>
          }
        </>
        }
        <FormControl fullWidth margin='normal'>
          <div className={classes.buttons}>
            <Button type='button' color='primary' variant='outlined' onClick={() => history.goBack()}>
              {t('sharedCancel')}
            </Button>
            <Button type='button' color='primary' variant='contained' onClick={handleVendorAdd}>
              {t('sharedSave')}
            </Button>
          </div>
        </FormControl>
      </Container>
      </>

  );
}

export default VendorPage;
