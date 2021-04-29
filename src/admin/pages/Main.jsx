
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Main_table from "../contents/Main_table";
import Main_openselect from "../contents/Main_openselect";
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';


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

export default function Main() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>원형그래프</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
              <Main_openselect/>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          2021.03.29-2021.04.04 목표
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
              <Main_table/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

