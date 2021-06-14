//Workers2Table
import React from 'react';
import {  makeStyles,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
  TableRow, Paper, Modal} from '@material-ui/core';
import Workers2ModalModify from './Workers2ModalModify';
import Workers2Remove from '../contents/Workers2Remove';

const columns = [
  { field: 'workerName', headerName: '사원 명' ,width:'10%',align:'center'},
  { field: 'auth', headerName: '직급' ,width:'10%',align:'center'},
  { field: 'email', headerName: '메일주소' ,width:'30%',align:'center'},
  { field: 'phone', headerName: '핸드폰' ,width:'15%',align:'center'},
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

export default function Workers2Table() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);
  const [rows,setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(async () => {
    await fetch('/admin/workers2/worker2Table')
    .then(res => res.json())
    .then(res => setRows(res))
    .catch(err => console.log(err));
  },[]);
  
  return (
    <div>
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} align="center">
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              var selected = {id:row.id,workerName:row.workerName,auth:row.auth,email:row.email,phone:row.phone}
              return (
                <TableRow hover key={row.id}>
                  <TableCell align="center" >
                    <Workers2ModalModify selected={selected}/>
                  </TableCell>
                  <TableCell align="center">{row.auth}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                </TableRow>
              );
            })}
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