import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel,FormControl,TextField,NativeSelect,Button,Grid,Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing.unit * 1,
    backgroundColor:"#9fd8ac",
    width:'30%',
  },
  col:{
    border: 'solid 1px',
    padding: theme.spacing.unit * 1,
  },
  button:{
    width:'90%',
    height: '45%',
    marginBottom:'10px',
    fontSize:15,
  },
}));

const options = [
  {location:'역삼동'},
  {location:'개포동'},
  {location:'청담동'},
  {location:'삼성동'},
];

function SearchTable(){
  const classes = useStyles();
  const [state, setState] = React.useState({
    shopName: '',
    location: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  
  return(
    <FormControl className={classes.formControl}>
      <table className={classes.table}>
        <tr>
          <th className={classes.head}>지역선택</th>
          <td className={classes.col}>
            <NativeSelect
              value={state.location}
              onChange={handleChange}
              inputProps={{
                  name: 'age',
                  id: 'age-native-label-placeholder',
              }}
              style={{width:'40%'}}
              >
              <option value="">선택안함</option>
              {options.map((option) => {
                return (
                  <option key={option.location} row={option} value={option.location}>
                    {option.location}
                  </option>
                );
              })}
            </NativeSelect>
          </td>
        </tr>
        <tr>
          <th className={classes.head}>매장명</th>
          <td className={classes.col}>
            <TextField id="shopName" style={{width:'100%'}}/>
          </td>
        </tr>
      </table>  
    </FormControl>
  )
}
  
export default function Shop1Search() {
    const classes = useStyles();

    return (     
      <Grid container>
        <Grid item xs={9}>
          <SearchTable/>
        </Grid>
        <Grid item xs={3}>
          <Button className={classes.button} variant="contained" style={{backgroundColor:"#9fd8ac"}}>조건검색</Button>
          <Button className={classes.button} variant="contained" style={{backgroundColor:"#ea5757"}}>주간목표 지정</Button>
        </Grid>
      </Grid>
    );
}
