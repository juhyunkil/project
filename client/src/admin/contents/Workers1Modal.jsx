//Workers1Modal
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal,Paper } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import Workers1ModalBody from './Workers1ModalBody';

function getModalStyle() {
  const top = 41;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    modalPaper: {
      position: 'absolute',
      width: '70%',
      height: '70%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit*2,
    },
}));

export default function Workers1Modal(props) {
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
    <Paper className={classes.modalPaper} style={modalStyle}>
      <Workers1ModalBody selectedWorker={props.selectedWorker}/>
    </Paper>
  );

  return (
    <div>
      <ViewListIcon onClick={handleOpen}/>
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