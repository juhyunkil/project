//Workers1
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Workers1Table from '../contents/Workers1Table';
import {Paper,Button,Grid,TextField} from '@material-ui/core';

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
  const [target,setTarget] = React.useState('');
  const [searchName,setSearchName] = React.useState(target);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <table container border="1">
            <tr>
              <td bgcolor="#9fd8ac">사원명</td>
              <td>
                <TextField
                  id="target"
                  style={{ margin: 8 }}
                  margin="normal"
                  onChange={(e) => setTarget(e.target.value)}
                />
              </td>
              <td>
                <Button className={classes.button} onClick={()=>setSearchName(target)}>
                  검색
                </Button>
              </td>
            </tr>
            </table>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Workers1Table searchName={searchName}/>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}