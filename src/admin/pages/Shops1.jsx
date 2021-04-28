import { Grid,makeStyles, Paper } from '@material-ui/core';
import React from 'react';

import Shop1Table from '../contents/Shop1Table'
import Shop1TableUnder from '../contents/Shop1TableUnder'

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

export default function Shops1() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                
                <Grid item xs={7}>
                    <Paper className={classes.paper}>
                        <Shop1Table/>   
                    </Paper>
                </Grid>
                
                <Grid item xs={5}>
                    <Paper className={classes.paper}>grid2</Paper>
                </Grid>
                
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Shop1TableUnder/>
                    </Paper>
                </Grid>
            
            </Grid>
        </div>
    );
   
}