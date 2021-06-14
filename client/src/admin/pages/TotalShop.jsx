//Shops1
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid}from '@material-ui/core';
import moment from 'moment';

import Shop1Search from '../contents/Shop1Search';
import Shop1Table from '../contents/Shop1Table';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  datePaper:{
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    fontSize: '35px',
    background: "#9fd8ac",
  },
}));

export default function TotalShop() {
  const classes = useStyles();
  const today = moment().format('YYYY-MM-DD');

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.datePaper}>{today}</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}><Shop1Search/></Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}><Shop1Table/> </Paper>
        </Grid>
      </Grid>
      

    </div>

  );
}
