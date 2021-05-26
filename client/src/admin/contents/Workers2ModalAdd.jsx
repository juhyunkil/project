import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Button,Grid, Modal, TextField} from '@material-ui/core/';

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
    padding: theme.spacing(2),
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
  margin: {
    margin: theme.spacing(1),
    fullWidth: true,
  },
  button:{
    float:'right'
  },
  addButton:{
    backgroundColor:"#9fd8ac"
  },
  cancleButton:{
    backgroundColor:"#ea5757"
  }
}));

export default function Workers2ModalAdd() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState({workerName:'',email:'',auth:'',phone:''});
  //const [newInfo, setNewInfo] = React.useState({workerName:'',email:'',auth:'',phone:''});
  const [newInfo, setNewInfo] = React.useState({workerName:'',email:'',auth:'',phone:''});

  React.useEffect(() => {
    async function fetchData(){
      await fetch('/admin/workers2/modalAdd',{
        method: 'POST',
        //body: JSON.stringify(newInfo),
        body: JSON.stringify({id:newInfo.id,workerName:newInfo.workerName,email:newInfo.email,auth:newInfo.auth,phone:newInfo.phone}),
        headers: {"Content-Type": "application/json"}
      })
      .catch(err => console.log(err));
    }
    fetchData();
  }, [newInfo]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = e => {
    setInfo({
        ...info,
        [e.target.id]: e.target.value
    });
  };
/*
  const handleAdd = () => {
    handleClose()
    setNewInfo({
      ...newInfo,
      workerName: info.workerName,
      email:info.email,
      auth:info.auth,
      phone:info.phone
    });
  }
*/
const handleAdd = () => {
  handleClose()
  setNewInfo({
    ...newInfo,
    ['workerName']: info.workerName,
    ['email']:info.email,
    ['auth']:info.auth,
    ['phone']:info.phone
  });
  //console.log('newInfo갱신',newInfo)
}
  const body = (
    <div className={classes.root}>
      <Paper style={modalStyle} className={classes.paper}>
        <Grid item xs={12}>
          <table className={classes.table}>
          <tr>
            <th className={classes.head}>사원 이름</th>
            <td className={classes.col}>
              <TextField id="workerName" onChange={onChange}/>
            </td></tr><tr>
            <th className={classes.head}>사원 이메일</th>
            <td className={classes.col}>
              <TextField id="email" onChange={onChange}/>
            </td></tr><tr>
            <th className={classes.head}>직급</th>
            <td className={classes.col}>
              <TextField id="auth" onChange={onChange}/>
            </td></tr><tr>
            <th className={classes.head}>핸드폰 번호</th>
            <td className={classes.col}>
              <TextField id="phone" onChange={onChange}/>
            </td></tr>
          </table>  
        </Grid>
        
        <Grid item xs={12} align ='center'>
          <Button className={classes.addButton} variant="contained" onClick={() => handleAdd()}>직원 추가</Button>
          <Button className={classes.cancleButton} variant="contained" onClick={handleClose}>취소</Button>
        </Grid>
      </Paper> 
    </div>
  );

  return (
    <>
      <Button className={classes.addButton} variant="contained" onClick={handleOpen}>
        직원추가
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}