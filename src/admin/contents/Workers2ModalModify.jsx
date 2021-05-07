import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[5],
    
  },
  margin: {
    margin: theme.spacing(12),
    fullWidth: true,
  },
}));

export default function Workers2ModalModify() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12} align = 'center'>
        <Paper className={classes.paper}>
          <Grid container>
          <Grid item xs={3} align ='center'> 
              사원 이름<input></input><br/><br/>사원 이메일 <input></input><br/><br/>직급 <input></input><br/><br/>
              핸드폰 번호 <input></input><br/><br/>사원 위치 <input></input><br/><br/>
              <Grid item xs align='right'>
            <Button variant="contained" color="primary">
              수정
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="primary"
              >
              수정 취소
            </Button>
          </Grid>
             </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>

    
  );
}