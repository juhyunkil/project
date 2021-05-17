import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Paper,Grid,Button,InputLabel, Select, MenuItem, FormControl, TextField} from '@material-ui/core';
import {Pie} from 'react-chartjs-2';
import moment from 'moment';
import { green, purple } from '@material-ui/core/colors';
import 'moment/locale/ko';

import AdminMainTable from '../contents/AdminMainTable';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textroot: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
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
  margin: {
    margin: theme.spacing(1),
  },
}));



export default function AdminMain() {
    const classes = useStyles();
    const [rows,setRows] = React.useState([]);
    var chartData = [0,0,0,0];

    const today = moment().locale('ko').format("YYYY년MM월DD일 ddd요일");
    const startDate = moment().locale('ko').day(1).format("YYYY년MM월DD일 ddd요일");
    const endDate = moment().locale('ko').day(5).format("YYYY년MM월DD일 ddd요일");

    rows.map((row) => {
      switch (row.progress) {
        case 'pre' :
          chartData[0] += 1;
          break;
        case 'progress' : 
          chartData[1] += 1;
          break;
        case 'complete' :
          chartData[2] += 1;
          break; 
        case 'fail' : 
          chartData[3] += 1;
          break;
        default : 
          return null
      }
    })

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
          data: chartData
        }
      ]
    }

    React.useEffect(async () => {
      await fetch('/admin/adminMain')
      .then(res => res.json())
      .then(res => setRows(res))
      .catch(err => console.log(err));
    },[]);

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
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <AdminMainTable rows={rows}/>
                </Paper>
              </Grid>
            </Grid>
        </div>
    );
}