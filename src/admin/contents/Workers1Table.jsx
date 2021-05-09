//Workers1Table

import React, { useState } from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Paper,Modal} 
  from '@material-ui/core';


import ModalBody from '../contents/ModalBody';

function createData(No, Name, Auth, Mail, Progress) {
  return { No, Name, Auth, Mail, Progress };
}

const rows = [
  createData( 1, '김한길', '영업사원' ,'khg.naver.com', 10),
  createData( 2, '김한닐', '영업사원' , 'khn.naver.com', 20),
  createData( 3, '김한딜', '영업대리' , 'khd.naver.com', 30),
  createData( 4, '김한릴', '영업사원' , 'khl.naver.com', 40),
  createData( 5, '김한밀', '영업사원' , 'khm.naver.com', 50),
  createData( 6, '김한빌', '영업대리' , 'khb.naver.com', 60),
  createData( 7, '김한실', '영업사원' , 'khs.naver.com', 50),
  createData( 8, '김한일', '영업부장' , 'khi.naver.com', 50),
  createData( 9, '김한질', '영업사원' , 'khj.naver.com', 50),
  createData( 10, '김한칠', '영업사원' ,'khch.naver.com', 50),
  createData( 11, '김한칠', '영업사원' , 'khch.naver.com', 50),
];

const columns = [
  { field: 'No', headerName: 'No', width:'10%'},
  { field: 'Name', headerName: '사원 명' ,width:'10%'},
  { field: 'Auth', headerName: '직급' ,width:'15%'},
  { field: 'Mail', headerName: '메일주소' ,width:'30%'},
  { field: 'Progress', headerName: '진척률' ,width:'35%'},
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  modalPaper: {
    width: '70%',
    height: '70%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit*2,
  },
  table: {
    width: '100%',
  },
  progressBar: {
    backgroundColor: '#faa',
    float: 'center',
    height: theme.spacing.unit*2,
  },
  container:{
    height: 400,
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#969ea580',
  },
}));

export default function Workers1Table() {
  const classes = useStyles();
  const rowsPerPage = 10;  
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedId,setSelectedId] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e,selectedName) => {
    setSelectedId(selectedName);
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  //모달창 바디
  const body = (
      <Paper className={classes.modalPaper}>
        <ModalBody selectedId={selectedId}/>
      </Paper>
  );
    
  return (
    <div>
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const selected = row.Name;
              return (
                <>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    className={classes.modal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    {body}
                  </Modal>
                  <TableRow 
                    hover 
                    key={row.no}
                    onClick={e => handleClick(e,selected)}
                  >
                    {columns.map((column) => {
                      const value = row[column.field];
                      const fieldName = column.field;
                      if (fieldName === 'Progress') {
                          return (
                            <TableCell key={column.field}>
                              <div
                                className={classes.progressBar}
                                style={{ width: `${value}%` }}
                                title={`${value.toFixed(1)}%`}
                              >{value}</div>
                            </TableCell>
                          );
                        } 
                      else{
                          return (
                            <TableCell key={column.field}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          )
                      };
                    })}
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </div>
  );
}