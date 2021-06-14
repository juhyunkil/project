import {React,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Workers2Table from "../contents/Workers2Table";
import Workers2Search from "../contents/Workers2Search";
import Workers2ModalAdd from '../contents/Workers2ModalAdd';
import Workers2Remove from '../contents/Workers2Remove';

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

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}><Workers2Search/></Paper>
        </Grid>
        <Grid item xs={12} style={{margin:2}}>
          <Workers2ModalAdd/>
        </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
              <Workers2Table/>
          </Paper>
        </Grid>
    </div>
  );
}

