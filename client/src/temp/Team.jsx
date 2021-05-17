import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} from '@material-ui/core';
import moment from 'moment';

import TeamRate from '../contents/MyRate';
import TeamTable from '../contents/ProgressTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  datePaper:{
    padding: theme.spacing(1),
    marginLeft: '40%',
    textAlign: 'center',
    fontSize: '35px',
    background: "#9fd8ac",
  }
}));

export default function Team() {
    const classes = useStyles();
    const today = moment().format('YYYY-MM-DD');
    
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.datePaper}>{today}</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><TeamRate/></Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}><TeamTable/></Paper>
                </Grid>
            </Grid>
        </div>
    );
}