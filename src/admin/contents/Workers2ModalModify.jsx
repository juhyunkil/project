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
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
    fullWidth: true,
  },
}));

export default function Workers2ModalModify() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return  (
    <div className={classes.root}>
         <Paper style={modalStyle} className={classes.paper}>
         <table className={classes.table}>
         <tr>
          <th className={classes.head}>사원 이름</th>
          <td className={classes.col}>
            <TextField/>
          </td></tr> <tr>
          <th className={classes.head}>사원 이메일</th>
          <td className={classes.col}>
            <TextField/>
          </td></tr> <tr>
          <th className={classes.head}>직급</th>
          <td className={classes.col}>
            <TextField/>
          </td></tr> <tr>
          <th className={classes.head}>핸드폰 번호</th>
          <td className={classes.col}>
            <TextField/>
          </td></tr> <tr>
          <th className={classes.head}>사원 위치</th>
          <td className={classes.col}>
            <TextField/>
          </td></tr>
      </table>  
      <Grid item xs={15} align ='center'>
      <br/><br/><Button className={classes.button} variant="contained" style={{backgroundColor:"#9fd8ac" }}>수정</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;<Button className={classes.button} variant="contained" style={{backgroundColor:"#ea5757"}}>수정취소</Button>
        </Grid>
          </Paper> 
    </div>
  );
}
