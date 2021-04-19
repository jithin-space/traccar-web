import React from 'react';
import AddIdentification from './AddIdentification';
import AddClassification from './AddClassification';
import Grid from '@material-ui/core/Grid';

export default function Details() {
    return (
        <Grid container alignContent="center" direction="row" justify="center" spacing={1}>
            <Grid item xs={10}>
                <AddIdentification />
            </Grid>
            <Grid item xs={10}>
            <AddClassification />  
            </Grid>
           
        </Grid>    
    );
}