import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid} from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/ko';

import UserMainRate from '../contents/UserMainRate';
import UserMainTable from '../contents/UserMainTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit*1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  datePaper:{
    padding: theme.spacing.unit*1,
    textAlign: 'center',
    fontSize: '25px',
    background: "#9fd8ac",
  },
  thirdPaper:{
    padding: theme.spacing.unit*1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight:420,
  },
}));

export default function UserMain() {
    const classes = useStyles();
    const today = moment().locale('ko').format("YYYY년MM월DD일 ddd요일");
    const startDate = moment().locale('ko').day(1).format("YYYY년MM월DD일 ddd요일");
    const endDate = moment().locale('ko').day(5).format("YYYY년MM월DD일 ddd요일");
    const workerId = '8';
    const [workerName,setWorkerName] = React.useState('');
    const [rows,setRows] = React.useState([]);
    var myProgress = {'pre':0,'progress':0,'complete':0,'fail':0};
    const [loading, setLoading] = React.useState(true);

    function fetchData2(){
      fetch(`/users/userMain2?workerId=${workerId}`)
      .then(res => res.json())
      .then(res => {console.log(res);return setWorkerName(res[0])})
      .catch(err => console.log(err));
    }
    function fetchData1(){
      fetch(`/users/userMain1?workerId=${workerId}`)
      .then(res =>  res.json())
      .then(res => {console.log(res);setRows(res)})
      .then(setLoading(false))
      .catch(err => console.log(err));
    }
    React.useEffect(() => {
        
      fetchData1();
      console.log('usermain was rerenderd')
      fetchData2();
    },[]);


    rows.map((p) =>{
      return myProgress[p.progress] += 1
    });

    return (
        <div className={classes.root}>
        { (loading) ? <div>wait...</div> :
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.datePaper}>
                      오늘 날짜 : {today} 
                      &nbsp; &nbsp; &nbsp;
                      달성 기간 : {startDate} ~ {endDate}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <UserMainRate progress={myProgress} name={workerName}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.thirdPaper}>
                      <UserMainTable rows={rows}/>
                    </Paper>
                </Grid>
            </Grid>
        }
        </div>
    );
}