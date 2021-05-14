//Workers2Table
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {  makeStyles,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
  TableRow, TableSortLabel, Paper, Modal} from '@material-ui/core';
import Workers2ModalModify from './Workers2ModalModify';
import { DataGrid } from '@material-ui/data-grid';

function createData(No, UserName, Auth, Mail, Progress) {
  return { No, UserName, Auth, Mail, Progress };
}



const rows = [
  createData( 1, '김한길', '영업사원' , 'khg.naver.com', 10),
  createData( 2, '김한닐', '영업사원' , 'khn.naver.com', 20),
  createData( 3, '김한딜', '영업대리' , 'khd.naver.com', 30),
  createData( 4, '김한릴', '영업사원' , 'khl.naver.com', 40),
  createData( 5, '김한밀', '영업사원' , 'khm.naver.com', 50),
  createData( 6, '김한빌', '영업대리' , 'khb.naver.com', 60),
  createData( 7, '김한실', '영업사원' , 'khs.naver.com', 50),
  createData( 8, '김한일', '영업부장' , 'khi.naver.com', 50),
  createData( 9, '김한질', '영업사원' , 'khj.naver.com', 50),
  createData( 10, '김한칠', '영업사원' , 'khch.naver.com', 50),
  createData( 11, '김한칠', '영업사원' , 'khch.naver.com', 50),
  createData( 12, '김한칠', '영업사원' , 'khch.naver.com', 50),
  createData( 13, '김한칠', '영업사원' , 'khch.naver.com', 50),
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

export default function Workers2Table(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedId,setSelectedId] = useState('');
  const handleOpen = () => {
    setOpen(true);
  };

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

  const body = (
    <Paper className={classes.root}>
    <Workers2ModalModify/>
  </Paper>
  );



  

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const selected = row.Name;
              const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow>
                      <TableCell  width='100px' component="th" id={labelId} scope="row" padding="none">
                        {row.No}
                      </TableCell>
                      <TableCell  width='100px' >
                        <button type="button" onClick={handleOpen}>
                          {row.UserName}
                        </button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
                          {body}
                        </Modal>
                        
                      </TableCell>
                      <TableCell  width='100px' >{row.Auth}</TableCell>
                      <TableCell  width='400px' >{row.Mail}</TableCell>
                      <TableCell  width='100px'>
                        <div
                        className={classes.progressBar}
                        style={{ width: `${row.Progress}%`, height:'100%'}}>
                          {row.Progress}
                        </div>
                        
                      </TableCell>
                    
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={10}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          

        />


    </div>
  );
}
