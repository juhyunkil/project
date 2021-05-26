import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} 
  from '@material-ui/core';

import Workers1ModalTable from './Workers1ModalTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit*1,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%'
  },
  table:{
      width:'100%',
      border:"solid 2px",
  },
  col:{
    padding: theme.spacing.unit*2,
    backgroundColor: "#9fd8ac",
    border:"solid 1px",
  }
}));

export default function ModalBody(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <table className={classes.table}>
                        <tr>
                            <td className={classes.col}>사원이름 : {props.selectedWorker.workerName}</td>
                            <td className={classes.col}>직급 : {props.selectedWorker.auth}</td>
                            <td className={classes.col}>핸드폰 : {props.selectedWorker.phone}</td>
                            <td className={classes.col}>이메일 : {props.selectedWorker.email}</td>
                        </tr>
                    </table>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}><Workers1ModalTable selectedId={props.selectedWorker.id}/></Paper>
            </Grid>
        </Grid>
    </div>

    
  );
}