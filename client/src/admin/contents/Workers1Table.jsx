//Workers1Table

import React, { useState } from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Paper,Modal} 
  from '@material-ui/core';


import ModalBody from '../contents/ModalBody';

const columns = [
  { field: 'workerName', headerName: '사원 명' ,width:'10%',align:'center'},
  { field: 'auth', headerName: '직급' ,width:'10%',align:'center'},
  { field: 'email', headerName: '메일주소' ,width:'30%',align:'center'},
  { field: 'phone', headerName: '핸드폰' ,width:'15%',align:'center'},
  { field: 'progress', headerName: '진척률' ,width:'35%',align:'center'},
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
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedWorker,setSelectedWorker] = useState('');
  const [rows,setRows] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e,selectedId) => {
    setSelectedWorker(selectedId);
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(async () => {
    await fetch('/admin/workers1/workers1Table')
    .then(res => res.json())
    .then(res => setRows(res))
    .catch(err => console.log(err));
  },[]);

  //모달창 바디
  const body = (
      <Paper className={classes.modalPaper}>
        <ModalBody selectedWorker={selectedWorker}/>
      </Paper>
  );
    
  return (
    <div>
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} align={column.align}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const selected = {id:row.id,name:row.workerName,auth:row.auth,email:row.email,phone:row.phone};
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
                            <TableCell key={column.field} align="center">
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
                            <TableCell key={column.field} align="center">
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