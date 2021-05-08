import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} from '@material-ui/core';
import {Pie} from 'react-chartjs-2';
import moment from 'moment';

import AdminMainTable from '../contents/AdminMainTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  datePaper:{
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    fontSize: '25px',
    background: "#9fd8ac",
  },
  chart:{
    marginLeft:'30%',
  },
  pieChart:{
    maxHeight:'230px',
  }
}));

const state = {
  labels: ['진행전', '진행중', '진행완료','실패'],
  datasets: [
    {
      label: '업무 단계',
      backgroundColor: [
        '#B21F00',//진행전
        '#C9DE00',//진행중
        '#2FDE00',//진행완료
        '#212529',//실패
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#36383a',
      ],
      data: [2, 3, 3, 2]//진행전,진행중,진행완료,실패
    }
  ]
}

export default function AdminMain() {
    const classes = useStyles();
    const today = moment().format('YYYY-MM-DD');

    function CircleChart(){
      return(
        <Pie
          className={classes.pieChart}
          data={state}
          options={{
            title:{
              display:true,
              text:'업무현황',
              fontSize:20
            },
            responsive: true,
            maintainAspectRatio: true,
            legend:{
              display:true,
              position:'left'
            }
          }}
        />
      )
    }
    
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.datePaper}>
                  {today}기간의 목표
                </Paper>
              </Grid>
              <Grid item xs={5} className={classes.chart}>
                <div><CircleChart/></div>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <AdminMainTable/>
                </Paper>
              </Grid>
            </Grid>
        </div>
    );
}