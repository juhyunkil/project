//Shops1Search
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
export default function Shops1Search() {
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
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="native-label">
                지역선택
            </InputLabel>
            <NativeSelect
             value={state.age}
             onChange={handleChange}
             inputProps={{
                name: 'age',
                id: 'age-native-label-placeholder',
            }}
            >
          <option value="">선택안함</option>
          <option value="역삼동">역삼동</option>
          <option value="개포동">개포동</option>
          <option value="청담동">청담동</option>
          <option value="삼성동">삼성동</option>
          <option value="대치동">대치동</option>
          <option value="신사동">신사동</option>
          <option value="논현동">논현동</option>          
          <option value="압구정동">압구정동</option>
          <option value="세곡동">세곡동</option>
          <option value="자곡동">자곡동</option>
          <option value="율현동">율현동</option> 
          <option value="일원동">일원동</option>
          <option value="수서동">수서동</option>
          <option value="도곡동">도곡동</option>
          <option value="논현1동">논현1동</option>
          <option value="논현2동">논현2동</option>
          <option value="삼성1동">삼성1동</option>
          <option value="삼성2동">삼성2동</option>          
          <option value="대치1동">대치1동</option>
          <option value="대치2동">대치2동</option>
          <option value="대치4동">대치4동</option>
          <option value="역삼1동">역삼1동</option>
          <option value="역삼2동">역삼2동</option>
          <option value="도곡1동">도곡1동</option>
          <option value="도곡2동">도곡2동</option>
          <option value="개포1동">개포1동</option>          
          <option value="개포2동">개포2동</option>
          <option value="개포4동">개포4동</option>
          <option value="일원본동">일원본동</option>
          <option value="일원1동">일원1동</option>
          <option value="일원2동">일원2동</option>        
        </NativeSelect>
        <TextField id="standard-basic" label="매장명" />
      </FormControl>
      <Button variant="contained">검색</Button>
      </div>
    );
}
