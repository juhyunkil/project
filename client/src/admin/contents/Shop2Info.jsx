import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Grid,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container:{
    height:'100%'
  },
  headerPaper: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    backgroundColor:'#b4edc1'
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
        <Grid container spacing={1} item xs={12}>
            <Grid item xs={12}>
              <Paper className={classes.headerPaper}>
                <h3>매장을 할당할 사원을 선택하세요</h3>
                <br/>
                <h2>선택 사원 : {props.selectedId.name}</h2>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button className={classes.button} variant="contained" size="large">할당</Button>
            </Grid>
        </Grid>
    </div>
  );
}