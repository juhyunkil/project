import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Grid,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerPaper: {
    padding: theme.spacing.unit * 5,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 130,
  },
  button: {
    float:'right',
    marginTop:60,
    width:150,
    backgroundColor:'#56c670',
  },
}));

export default function Shop2Info(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Paper className={classes.headerPaper}>
                    <h2>선택 사원 : {props.selectedId}</h2>
                </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button className={classes.button} variant="contained" size="large">
                  할당
              </Button>
            </Grid>
        </Grid>
    </div>
  );
}