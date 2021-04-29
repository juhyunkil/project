import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '10ch',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Workers2() {
  const classes = useStyles();

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
            className={classes.paper}>
                <TextField
                    id="outlined-full-width"
                    label="성명"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="사원번호"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="이메일 주소"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="직급"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="핸드폰 번호"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="생년 월일 6자리"
                    style={{ margin: 8 }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    label="직원위치"
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
