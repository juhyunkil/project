import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TextField,Button,Grid, Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit*2,
    margin: 'auto',
    maxWidth: 500,
  },
  textField: {
    marginLeft: theme.spacing.unit*1,
    marginRight: theme.spacing.unit*1,
    width: '10ch',
  },
  button: {
    margin: theme.spacing.unit*1,
  },
}));

export default function MyPage() {
  const classes = useStyles();
  const info = {name:'길주현',email:'gmail.com',auth:'대리',phone:'01012345678',location:'인천시'};
  
  return (
    <div className={classes.root}>
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            <Paper 
                direction="column"
                className={classes.paper}
            >
                <TextField
                    disabled
                    id="name"
                    label="성명"
                    defaultValue={info.name}
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    disabled
                    id="email"
                    label="이메일 주소"
                    defaultValue={info.email}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    disabled
                    id="auth"
                    label="직급"
                    defaultValue={info.auth}
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="phone"
                    label="핸드폰 번호"
                    defaultValue={info.phone}
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="location"
                    label="직원위치"
                    defaultValue={info.location}
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <Grid
                    container
                    justify="flex-end"
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => { alert('clicked') }}
                    >
                        수정 취소
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => { alert('clicked') }}
                    >
                        수정
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    </div>
  );
}
