
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Accumulate_table from "../contents/Accumulate_table";
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
  margin: {
    margin: theme.spacing(1),
    fullWidth: true,
  },
}));

export default function Shop_accumulate() {
  const classes = useStyles();

  function FormRow() {
      
    return (
      <React.Fragment>
        <Grid container spacing={3}>
            <Grid item xs={2}>
                지역
            </Grid>
            <Grid item xs={10}>
                <input></input>
            </Grid>
            <Grid item xs={2}>
                매장명
            </Grid>
            <Grid item xs={10}>
                <input></input>
            </Grid>
            <Grid item xs={2}>
                기간
            </Grid>
            <Grid item xs={10}>
                <input></input>
                 ~  
                <input></input>
            </Grid>
            <Grid item xs={2}>
                담당사원명
            </Grid>
            <Grid item xs={10}>
                <input></input>
            </Grid>
        </Grid>
        
        

      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
            <Paper className={classes.paper}>
                <h2>2021 1분기 달성 매장 리스트</h2>
            </Paper>
        </Grid>
      </Grid>
      <Grid containper spacing={3}>
        <Grid container item xs={12} spacing={3}>
            <Paper className={classes.paper}>
                <Grid container item xs={10} >
                    <FormRow />
                </Grid>
            </Paper>
            
            <Grid container item xs={2} >
                <Button variant="contained" size="large" color="primary" className={classes.margin}
                onClick={() => { alert('clicked') }}>
                    검색
                </Button>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} space={5}>
        <Paper className={classes.paper}>
         <Accumulate_table/>
        </Paper>
      </Grid>
    </div>
  );
}
