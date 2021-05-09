import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl,TextField,NativeSelect,Button,Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width:'100%',
    height:'100%'
  },
  table:{
    border:'solid 2px',
    borderCollapse: 'collapse',
    fontSize:15,
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
    height: '45%',
    marginBottom:'10px',
    fontSize:15,
  },
}));

const locationOptions = [
  {location:'역삼동'},
  {location:'개포동'},
  {location:'청담동'},
  {location:'삼성동'},
];

const isObjectOptions = [
  {isObject:'목표매장'},
  {isObject:'비목표매장'},
];

function SearchTable(){
  const classes = useStyles();
  const [state, setState] = React.useState({
    shopName: '',
    location: '',
    isObject: '',
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
              name="location"
              style={{width:'40%'}}
            >
              <option value="">전체지역</option>
              {locationOptions.map((now) => {
                return (
                  <option key={now.location} value={now.location}>
                    {now.location}
                  </option>
                );
              })}
            </NativeSelect>
          </td>
        </tr>
        <tr>
          <th className={classes.head}>매장명</th>
          <td className={classes.col}>
            <input id="shopName" variant="outlined" size="small" style={{width:'40%'}}/>
          </td>
        </tr>
        <tr>
          <th className={classes.head}>매장구분</th>
          <td className={classes.col}>
            <NativeSelect
              value={state.isObject}
              onChange={handleChange}
              name="isObject"
              style={{width:'40%'}}
              >
              <option value="">전체매장</option>
              {isObjectOptions.map((now) => {
                return (
                  <option key={now.isObject} value={now.isObject}>
                    {now.isObject}
                  </option>
                );
              })}
            </NativeSelect>
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
