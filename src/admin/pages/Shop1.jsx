//Shops1
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Shops1Date from '../contents/Shops1Date';
import Shops1Search from '../contents/Shops1Search';
import Shops1Table from '../contents/Shops1Table';

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

export default function Shops1() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}> <Shops1Date/> </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>        
        <Grid item xs>
          <Paper className={classes.paper}> <Shops1Search/> </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>        
        <Grid item xs>
          <Paper className={classes.paper}><Shops1Table/> </Paper>
        </Grid>
      </Grid>

    </div>

  );
}
