import React, { useState } from 'react';
import { Paper,Grid,makeStyles,TextField,Button } 
  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "auto",
    paddingTop: theme.spacing.unit * 10,
  },
  paper: {
    margin: "auto",
    padding: theme.spacing(7),
    textAlign: 'center',
  },
  formUnit: {
    marginTop : '15px',
  },
  button: {
    backgroundColor: '#28a745',
  }
}));


export default function CenteredGrid() {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item>
          <Paper className={classes.paper}>
            <h1>영업관리</h1>
            <form noValidate autoComplete="off">
              <div className={classes.formUnit}>
                <TextField 
                  required 
                  id="email" 
                  label="E-mail" 
                  variant="outlined" 
                />
              </div>
              <div className={classes.formUnit}>
                <TextField 
                  required 
                  id="pasword" 
                  label="Password" 
                  type="password" 
                  variant="outlined" 
                />
              </div>
              <div className={classes.formUnit}>
                <Button 
                  className={classes.button}
                  variant="contained" 
                  color="primary"
                  type="submit" 
                  fullWidth
                >
                  Login
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}