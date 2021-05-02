//Workers1
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Workers1Search from '../contents/Workers1Search';
import Workers1Table from '../contents/Workers1Table';


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

export default function Workers1() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}> <Workers1Search/> </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>        
        <Grid item xs>
          <Paper className={classes.paper}> <Workers1Table/> </Paper>
        </Grid>
      </Grid>

    </div>
  );
}