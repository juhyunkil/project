import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  margin: {
    margin: theme.spacing(1),
    fullWidth: true,
  },
}));

export default function Modal_info_table() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid spacing={3} item={12}>
        <Paper className={classes.paper}>
          <Grid container item xs={12}>
            <Grid item xs={3}> 
              사 원 이 름 :<br/>직 급 :<br/>사 번 :
            </Grid>
            <Grid item xs={9}> 
              김 한 결<br/>대 리<br/>1 2 3 4 5 6 7
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>

    
  );
}