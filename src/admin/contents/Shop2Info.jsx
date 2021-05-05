import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Grid,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 130,
  },
  header: {
    margin:'auto',
  },
}));

export default function Shop2Info(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <h2 className={classes.header}>선택 사원 : {props.selectedId}</h2>
                </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" size="large" color="primary">
                  할당
              </Button>
            </Grid>
        </Grid>
    </div>
  );
}