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
  const workerId = '2';//로그인 정보에 따라 직원의 id가 이곳에 저장, 현재는 임시값
  const [row,setRow] = React.useState('');
  //const row = {name: "홍승원", email: "hsw8245@naver.com", auth: "영업사원", phone: "01094338245", location: null};

  React.useEffect(async () => {
    await fetch(`/users/myPage?workerId=${workerId}`)
    .then(res => res.json())
    .then(res => setRow(res[0]))
    .catch(err => console.log(err));
  },[]);

  console.log(row);
  
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
                    defaultValue={row['name']}
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
                    defaultValue={row.email}
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
                    defaultValue={row.auth}
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
                    defaultValue={row.phone}
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
                    defaultValue={row.location}
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
