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
  addButton:{
    backgroundColor:"#9fd8ac"
  },
  cancleButton:{
    backgroundColor:"#ea5757"
  }
}));

export default function Workers2ModalModify({selected}) {
  //console.log('selectedId' ,selected)
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState({id:selected.id,workerName:selected.workerName,email:selected.email,auth:selected.auth,phone:selected.phone});
  const [newInfo, setNewInfo] = React.useState({id:selected.id,workerName:'',email:'',auth:'',phone:''});
  
  React.useEffect(() => {
    //console.log('fetchdata',newInfo)
    async function fetchData(){
      await fetch('/admin/workers2/modalModify',{
        method: 'POST',
        body: JSON.stringify({id:newInfo.id,workerName:newInfo.workerName,email:newInfo.email,auth:newInfo.auth,phone:newInfo.phone}),
        headers: {"Content-Type": "application/json"},
        cache: 'no-cache',
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

  const handleEdit = () => {
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
                <TextField 
                  id="workerName" 
                  onChange={onChange}
                  value={info.workerName}/>
              </td></tr><tr>
              <th className={classes.head}>사원 이메일</th>
              <td className={classes.col}>
                <TextField 
                  id="email" 
                  onChange={onChange}
                  value={info.email}/>
              </td></tr><tr>
              <th className={classes.head}>직급</th>
              <td className={classes.col}>
                <TextField 
                  id="auth" 
                  onChange={onChange}
                  value={info.auth}/>
              </td></tr><tr>
              <th className={classes.head}>핸드폰 번호</th>
              <td className={classes.col}>
                <TextField 
                  id="phone" 
                  onChange={onChange}
                  value={info.phone}/>
              </td></tr>
            </table>  
          </Grid>
          
          <Grid item xs={12} align ='center'>
            <Button className={classes.addButton} variant="contained" onClick={()=>handleEdit()}>수정</Button>
            <Button className={classes.cancleButton} variant="contained">직원삭제</Button>
          </Grid>
        </Paper> 
      </div>
  )

  return  (
    <>
    <button type="button" onClick={handleOpen}>
      {info.workerName}
    </button>
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