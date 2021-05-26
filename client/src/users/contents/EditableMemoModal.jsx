import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal,TextField,Button} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';

function getModalStyle() {
  const top = 45;
  const left = 75;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit*2,
  },
  memoField: {
    width:'100%'
  },
  editButton: {
    backgroundColor:'#ed4c4c',
    marginTop: theme.spacing.unit*1,
    marginLeft: '30%'
  },
  saveButton: {
    backgroundColor:'#007bff',
    marginTop: theme.spacing.unit*1,
    marginLeft: theme.spacing.unit*2
  },
}));

export default function EditableMemoModal({selectedMemo,selectedId}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(true);
  const [memo, setMemo] = React.useState(selectedMemo ? selectedMemo : '');
  const [newMemo, setNewMemo] = React.useState('');

  React.useEffect(() => {
    function fetchData(){
      fetch('/users/editableMemoModal',{
        method: 'POST',
        body: JSON.stringify({memo:newMemo,id:selectedId}),
        headers: {"Content-Type": "application/json"}
      })
      .catch(err => console.log(err));
    }
    fetchData();
  }, [newMemo]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setEdit(false);
  };

  const handleSave = (target) => {
    setNewMemo(target);
    setEdit(true);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form noValidate autoComplete="off">
        <TextField
          id="memo"
          multiline
          rows={8}
          value={memo}
          onChange={(event) => setMemo(event.target.value)}
          className={classes.memoField}
          variant="outlined"
          InputProps={
            {readOnly: edit}
          }
        />
        <Button 
          variant="contained"
          className={classes.editButton}
          onClick={() => handleEdit()}
        >
          수정</Button>
        <Button 
          variant="contained" 
          className={classes.saveButton}
          onClick={() => handleSave(memo)}
        >
          저장</Button>
      </form>
    </div>
  );

  return (
    <div>
        <CommentIcon onClick={handleOpen}/>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
    </div>
  );
}