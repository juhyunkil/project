import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Paper,Modal,Grid} 
  from '@material-ui/core';

import ModalTable from '../contents/ModalTable';

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
                            <td className={classes.col}>사원이름 : {props.selectedWorker.name}</td>
                            <td className={classes.col}>직급 : {props.selectedWorker.auth}</td>
                            <td className={classes.col}>핸드폰 : {props.selectedWorker.phone}</td>
                            <td className={classes.col}>이메일 : {props.selectedWorker.email}</td>
                        </tr>
                    </table>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}><ModalTable selectedId={props.selectedWorker.id}/></Paper>
            </Grid>
        </Grid>
    </div>

    
  );
}