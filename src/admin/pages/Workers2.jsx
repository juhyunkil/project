import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Worker2Table from "../contents/Worker2Table";
import Workers2Search from "../contents/Workers2Search";
import Workers2ModalAdd from '../contents/Workers2ModalAdd';
import Workers2Delete from '../contents/Workers2Delete';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Workers2() {
  const classes = useStyles();
  const [selectedId,setSelectedId] = useState('');


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
        <Paper className={classes.paper}>
          <Grid item xs>
          <Paper className={classes.paper}><Workers2Search/></Paper>
          </Grid>
          <Grid item xs align='right'>
            <Workers2ModalAdd/> <Workers2Delete/>
          </Grid>
        </Paper>
        </Grid>        
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
              <Worker2Table/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}