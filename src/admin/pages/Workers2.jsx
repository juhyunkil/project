import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Worker2_table from "../contents/Worker2_table";
import Button from '@material-ui/core/Button';



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
      <Grid container spacing={3}>
              <Grid item xs>
              <Paper className={classes.paper}>
              사원명  <input></input> <Button variant="contained" color="primary">검색</Button>
              </Paper>
              </Grid>
           
        </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
          <Button variant="contained" color="primary">직원추가</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="primary">직원삭제</Button>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
              <Worker2_table/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

