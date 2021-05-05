import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} from '@material-ui/core';
import moment from 'moment';

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
    marginLeft: '40%',
    textAlign: 'center',
    fontSize: '35px',
    background: "#9fd8ac",
  },
  thirdPaper:{
    minHeight:420,
    padding: theme.spacing(1),
  }
}));

export default function UserMain() {
    const classes = useStyles();
    const today = moment().format('YYYY-MM-DD');
    
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.datePaper}>{today}</Paper>
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