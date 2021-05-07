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

export default function Workers2Delete(props) {
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

  const body = (
       <Paper style={modalStyle} className={classes.paper}>
      <Grid container spacing={2} item xs={12}>
            <Grid item xs={12} align ='center'>
                <Paper className={classes.headerPaper}>
                    <h2>{props.selectedId} <br/><br/>정보를 삭제하시겠습니까?</h2>
                </Paper>
            </Grid>
            <Grid item xs={12} align ='center'>
            <Button className={classes.button} variant="contained" style={{backgroundColor:"#9fd8ac"}} onClick={handleOpen}>
              예
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;<Button className={classes.button} variant="contained" style={{backgroundColor:"#ea5757"}} onClick={handleOpen}>
              아니오
              </Button>
            </Grid>
        </Grid>
        </Paper>
 
  );

  return (
    <div>
      <Button className={classes.button} variant="contained" style={{backgroundColor:"#ea5757"}} onClick={handleOpen}>
        직원삭제
      </Button>
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
