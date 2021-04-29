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
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

export default function Shops1() {
    const classes = useStyles();
    const [selectedId,setSelectedId] = useState('');
    //const[상태변수,갱신함수] = useState(상태초기값)
    
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
                    <Paper className={classes.paper}>
                        <Shop2TableUnder/>
                    </Paper>
                </Grid>
            
            </Grid>
        </div>
    );
    
}
