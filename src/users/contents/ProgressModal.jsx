import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,TableBody,TableContainer,TableHead,TableRow,Modal} 
    from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { validateYupSchema } from 'formik';
import { NoteTwoTone } from '@material-ui/icons';

const colors = {'pre':'#B21F00','progress':'#C9DE00','complete':'#2FDE00','fail':'#212529'};
const progress = {'pre':'진행전','progress':'진행중','complete':'진행완료','fail':'거래실패'};

function getModalStyle() {
  const top = 45;
  const left = 65;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 200,
    height: 180,
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

export default function MemoModal({value,selectedId}) {
  //{selectedId} 이 값에 해당하는 데이터 db에서 찾아 값 갱신 
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                    <TableRow>
                        현재 진행도 : {progress[value]}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow hover onClick={handleClick} value="1">
                        <FiberManualRecordIcon style={{color:colors['pre']}}/>진행전
                    </TableRow>
                    <TableRow hover onClick={handleClick}>
                        <FiberManualRecordIcon style={{color:colors['progress']}}/>진행중
                    </TableRow>
                    <TableRow hover onClick={handleClick}>
                        <FiberManualRecordIcon style={{color:colors['complete']}}/>진행완료
                    </TableRow>
                    <TableRow hover onClick={handleClick}>
                        <FiberManualRecordIcon style={{color:colors['fail']}}/>실패
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    
  );

  return (
    <div>
        <FiberManualRecordIcon style={{color:colors[value]}} onClick={handleOpen}/>
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