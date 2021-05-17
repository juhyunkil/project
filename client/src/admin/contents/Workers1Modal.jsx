//Workers1Modal
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal,Paper } from '@material-ui/core';

import ModalBody from '../contents/ModalBody';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit*2,
    },
    modalPaper: {
        width: '70%',
        height: '70%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit*2,
    },
}));

export default function MemoModal(props) {
  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  const body = (
    <Paper className={classes.modalPaper}>
        <ModalBody selectedId={props.selectedId}/>
    </Paper>
  );

  return (
    <div>
        <Modal
            open={props.open}
            onClose={handleClose}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    </div>
  );
}