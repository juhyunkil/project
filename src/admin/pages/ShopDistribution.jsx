import { Grid,makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Shop2Table from '../contents/Shop2Table';
import Shop2TableUnder from '../contents/Shop2TableUnder';
import Shop2Info from '../contents/Shop2Info';

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    thirdPaper: {
        padding: theme.spacing.unit * 1,
        minHeight:350,
    }
}));

export default function ShopDistribution() {
    const classes = useStyles();
    const [selectedId,setSelectedId] = useState('');
    
    return (

        <div className={classes.root}>
            <Grid container spacing={2}>
                
                <Grid item xs={7}> 
                    <Paper className={classes.paper}>
                        <Shop2Table setSelectedId={setSelectedId}/>   
                    </Paper>
                </Grid>
                
                <Grid item xs={5}>
                    <Shop2Info selectedId={selectedId}/>
                </Grid>
                
                <Grid item xs={12}>
                    <Paper className={classes.paper,classes.thirdPaper}>
                        <Shop2TableUnder/>
                    </Paper>
                </Grid>
            
            </Grid>
        </div>
    );
    
}
