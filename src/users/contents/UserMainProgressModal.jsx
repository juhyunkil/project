import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
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

export default function EditableMemoModal(props) {
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
        {props.progress}
    </div>
  );

  return (
    <div>
        <ProgressCircleCell value={props.progress} onClick={handleOpen}/>
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