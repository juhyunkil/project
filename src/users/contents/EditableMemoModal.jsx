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
  const memoId = {selectedId};

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setEdit(false);
  };

  const handleSave = () => {
    setEdit(true);
  };
/*
  const handleChange = (e) => {
    
  };
*/
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form noValidate autoComplete="off">
        <TextField
          id="memo"
          label="매장 비고란"
          multiline
          rows={8}
          defaultValue={selectedMemo ? selectedMemo : '내용없음'}
          className={classes.memoField}
          variant="outlined"
          InputProps={
            {readOnly: edit}
          }
        />
        <Button 
          variant="contained"
          className={classes.editButton}
          onClick={handleEdit}
        >
          수정</Button>
        <Button 
          variant="contained" 
          className={classes.saveButton}
          onClick={handleSave}
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