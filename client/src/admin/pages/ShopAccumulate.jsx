
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Button,Grid,FormControl} from '@material-ui/core';
import Shop3Table from "../contents/Shop3Table";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  titlepaper:{
    padding: theme.spacing.unit * 1,
    marginLeft: '40%',
    textAlign:'center',
    fontSize: '35px',
    background: "#9fd8ac",
  },
  formControl: {
    width:'100%',
    height:'100%'
  },
  table:{
    border:'solid 2px',
    borderCollapse: 'collapse',
    fontSize:20,
    height:'100%',
  },
  head:{
    border:'solid 1px',
    backgroundColor:"#9fd8ac",
    width:'30%',
  },
  col:{
    border: 'solid 1px',
  },
  button:{
    width:'90%',
    height: '100%',
    backgroundColor:"#9fd8ac",
    fontSize:15,
  },
}));

export default function ShopAccumulate() {
  const classes = useStyles();

  function Search() {
      
    return(
      <FormControl className={classes.formControl}>
        <table className={classes.table}>
          <tr>
            <th className={classes.head}>지역</th>
            <td><input id="shopLocation" label="name"/></td>
          </tr>
          <tr>
            <th className={classes.head}>매장명</th>
            <td className={classes.col}>
              <input id="shopName" label="name"/>
            </td>
          </tr>
          <tr>
            <th className={classes.head}>진행기간</th>
            <td className={classes.col}>
              <input id="startPeriod" label="name"/>
              ~
              <input id="endPeriod" label="name"/>
            </td>
          </tr>
          <tr>
            <th className={classes.head}>담당사원명</th>
            <td className={classes.col}>
              <input id="workerName" label="name"/>
            </td>
          </tr>
        </table>  
      </FormControl>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Paper className={classes.titlepaper}>
            전체 매장 영엽 내역
          </Paper>
        </Grid>
      
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={9}>
                <Search/>
              </Grid>
              <Grid item xs={3}>
                <Button className={classes.button} variant="contained">검색</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Shop3Table/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
