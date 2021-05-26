import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} from '@material-ui/core';
import ProgressBar from '../../common/ProgressBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit*1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  InfoPaper:{
    padding: theme.spacing.unit*1,
    textAlign: 'center',
    fontSize: '18px',
    background: "#9fd8ac",
  },
}));

export default function UserMainRate(props) {
    const classes = useStyles();
    const name = props.name.workerName;

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.InfoPaper}>
                        {name}님의 이번주 목표 달성 그래프
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                  <ProgressBar progressArray={props.progress} height = {4}/>
                </Grid>
            </Grid>
        </div>
    );
}