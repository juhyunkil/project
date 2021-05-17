import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/ko';

import UserMainRate from '../contents/UserMainRate';
import UserMainTable from '../contents/UserMainTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  datePaper:{
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize: '25px',
    background: "#9fd8ac",
  },
  thirdPaper:{
    minHeight:420,
    padding: theme.spacing(1),
  }
}));

export default function UserMain() {
    const classes = useStyles();
    const today = moment().locale('ko').format("YYYY년MM월DD일 ddd요일");
    const startDate = moment().locale('ko').day(1).format("YYYY년MM월DD일 ddd요일");
    const endDate = moment().locale('ko').day(5).format("YYYY년MM월DD일 ddd요일");

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.datePaper}>
                      오늘 날짜 : {today} 
                      &nbsp; &nbsp; &nbsp;
                      달성 기간 : {startDate} ~ {endDate}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><UserMainRate/></Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper,classes.thirdPaper}><UserMainTable/></Paper>
                </Grid>
            </Grid>
        </div>
    );
}