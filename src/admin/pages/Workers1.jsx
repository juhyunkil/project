//Workers1
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Workers1Table from '../contents/Workers1Table';
import {Paper,Button,Grid,FormControl,TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit*3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button:{
    width:'90%',
    height: '100%',
    backgroundColor:"#9fd8ac",
    fontSize:15,
  },
  formControl:{
    width:'100%',
    color:'#111'
  }
}));

export default function Workers1() {
  const classes = useStyles();

  function Search() {
    return(
      <FormControl className={classes.formControl}>
         <table container border="1">
            <tr>
                <td bgcolor="#9fd8ac">사원명</td>
                <td>
                  <input id="standard-basic" />
                </td>
            </tr>
            <tr>
                <td bgcolor="#9fd8ac">진척률</td>
                <td>
                  <input id="standard-basic" label="진척률" />
                  ~
                  <input id="standard-basic" label="진척률" />
                </td>
            </tr>
          </table>
      </FormControl>
    )
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={10}>
                <Search/>
              </Grid>
              <Grid item xs={2}>
                <Button className={classes.button}>
                  검색
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>  
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Workers1Table/>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}