import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TextField,Button,Grid, Paper, Modal} from '@material-ui/core';
import MapApp from '../contents/MapApp';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  modalPaper: {
    display: 'flex',
    position: 'absolute',
    width: 500,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit*2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#969ea580',
  },
}));

export default function MyPage() {
  const classes = useStyles();
  const workerId = '8';//로그인 정보에 따라 직원의 id가 이곳에 저장, 현재는 임시값
  const [row,setRow] = React.useState({});
  const [open, setOpen] = useState(false);
  const [phone,setPhone] = React.useState(row.phone)
  const [newPhone,setNewPhone] = React.useState('');
  const [modalStyle] = React.useState(getModalStyle);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
    function fetchData(){
      fetch(`/users/myPage?workerId=${workerId}`)
      .then(res => res.json())
      .then(res => setRow(res[0]))
      .then(setLoading(false))
      .catch(err => console.log(err));
    }
    fetchData();
  },[]);

  React.useEffect(() => {
    async function fetchData(){
      await fetch('/users/myPage/editInfo',{
        method: 'POST',
        body: JSON.stringify({phone:newPhone,id:workerId}),
        headers: {"Content-Type": "application/json"}
      })
      .catch(err => console.log(err));
    }
    fetchData();
  }, [newPhone]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Paper className={classes.modalPaper} style={modalStyle}>
      <MapApp/>
    </Paper>
  );

  return (
    <div className={classes.root}>
    { (loading) ? <div>wait...</div> :
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
                    value={row.name}
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
                    value={row.email}
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
                    value={row.auth}
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
                    value={phone || row.phone}
                    style={{ margin: 8 }}
                    margin="normal"
                    onChange={(e) => setPhone(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <Grid>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={handleOpen}
                    >
                        내 위치 등록
                    </Button>
                    <Modal
                      className={classes.modalPaper}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                    {body}
                    </Modal>
                </Grid>
                <Grid
                    container
                    justify="flex-end"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {setNewPhone(phone)}}
                    >
                        수정
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    }
    </div>
  );
}