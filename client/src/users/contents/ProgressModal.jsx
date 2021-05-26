import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal} 
    from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const colors = {'pre':'#B21F00','progress':'#C9DE00','complete':'#2FDE00','fail':'#212529'};

function getModalStyle() {
  const top = 55;
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
    width: 150,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit*2,
  },
  table:{
    border:'solid 2px',
    borderCollapse: 'collapse',
    fontSize:15,
    height:'100%',
  },
  head:{
    border:'solid 1px',
    backgroundColor:"#9fd8ac",
    width:'30%',
    padding: theme.spacing.unit*1
  },
  row:{
    border: 'solid 1px',
    padding: theme.spacing.unit*1
  },
}));

export default function ProgressModal({status,selectedId}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [newStatus, setNewStatus] = React.useState(status);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, value) => {
    setNewStatus(value);
  };

  React.useEffect(() => {
    function fetchData(){
      fetch('/users/progressModal',{
        method: 'POST',
        body: JSON.stringify({status:newStatus,id:selectedId}),
        headers: {"Content-Type": "application/json"}
      })
      .catch(err => console.log(err));
    }
    fetchData();
  }, [newStatus]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ToggleButtonGroup orientation="vertical" value={newStatus} exclusive onChange={handleChange}>
        <ToggleButton value="pre" aria-label="pre">
          <FiberManualRecordIcon style={{color:colors['pre']}}/>진행전
        </ToggleButton>
        <ToggleButton value="progress" aria-label="progress">
          <FiberManualRecordIcon style={{color:colors['progress']}}/>진행중
        </ToggleButton>
        <ToggleButton value="complete" aria-label="complete">
          <FiberManualRecordIcon style={{color:colors['complete']}}/>진행완료
        </ToggleButton>
        <ToggleButton value="fail" aria-label="fail">
          <FiberManualRecordIcon style={{color:colors['fail']}}/>실패
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
    
  );

  return (
    <div>
        <FiberManualRecordIcon style={{color:colors[status]}} onClick={handleOpen}/>
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