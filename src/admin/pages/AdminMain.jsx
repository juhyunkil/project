import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} from '@material-ui/core';
import {Pie} from 'react-chartjs-2';
import moment from 'moment';
import 'moment/locale/ko';

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
    
  },
  pieChart:{
    maxHeight:'230px',
  },
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
    const today = moment().locale('ko').format("YYYY년MM월DD일 ddd요일");
    const startDate = moment().locale('ko').day(1).format("YYYY년MM월DD일 ddd요일");
    const endDate = moment().locale('ko').day(5).format("YYYY년MM월DD일 ddd요일");

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
                  오늘 날짜 : {today} 
                  &nbsp; &nbsp; &nbsp;
                  달성 기간 : {startDate} ~ {endDate}
                </Paper>
              </Grid>
              <Grid item xs={12} className={classes.chart}>
                <CircleChart/>
                <input label="d"/>
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