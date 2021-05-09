import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal,TextField } from '@material-ui/core';
import {ProgressCircleCell} from "../../common/ProgressCircleCell";


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
    height: 230,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit*2,
  },
  memoField: {
    width:'100%',
    height:'100%'
  },
}));

export default function ProgressModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        disabled
        id="memo"
        label="매장 비고란"
        multiline
        rows={8}
        defaultValue={props.selectedMemo?props.selectedMemo:'내용없음'}
        className={classes.memoField}
        variant="outlined"
      />
    </div>
  );

  return (
    <div>
      <ProgressCircleCell onClick={handleOpen}
      value = {props.value} />
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