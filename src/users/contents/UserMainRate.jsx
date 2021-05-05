import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  InfoPaper:{
    padding: theme.spacing(2),
    textAlign: 'center',
    fontSize: '20px',
    background: "#9fd8ac",
  },
  progressBar: {
    backgroundColor: '#faa',
    float: 'left',
    height: theme.spacing.unit*2,
  },
}));

export default function UserMainRate() {
    const classes = useStyles();
    const MyProgressRate = 70;
    
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.InfoPaper}>
                        길주현님의 이번주 목표 달성량은 {MyProgressRate}입니다
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <div
                        className={classes.progressBar}
                        style={{ width: `${MyProgressRate}%`, height:'100%'}}
                    >{MyProgressRate}</div>
                </Grid>
            </Grid>
        </div>
    );
}