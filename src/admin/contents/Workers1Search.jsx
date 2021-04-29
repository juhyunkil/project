//Workers1Search
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
export default function Workers1Search() {
    const classes = useStyles();
    const [state, setState] = React.useState({
      age: '',
      name: 'hai',
    });
  
    const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };
  
    return (
        <div>      
         <Grid> 
        <TextField id="standard-basic" label="사원명" />
        </Grid>
        <Grid>
        <TextField id="standard-basic" label="진척률" />
        </Grid>
      <Button variant="contained">검색</Button>
      </div>
    );
}
