//Workers1Table
import React, { useState } from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} 
  from '@material-ui/core';

import Workers1Modal from './Workers1Modal';
import ProgressBar from '../../common/ProgressBar';

const columns = [
  { field: 'workerName', headerName: '사원명' ,width: '12%',align:'center'},
  { field: 'auth', headerName: '직급' ,width:'12%',align:'center'},
  { field: 'email', headerName: '메일주소' ,width:'23%',align:'center'},
  { field: 'phone', headerName: '핸드폰' ,width:'15%',align:'center'},
  { field: 'popModal', headerName: '영업보기' ,width:'10%',align:'center'},
  { field: 'progress', headerName: '진척률' ,width:'27%',align:'center'},
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  table: {
    width: '100%',
  },
  container:{
    height: 400,
  },
}));


//Row 함수
function Row(props) {
  const classes = useStyles();
  const { row } = props;
  return (
    <React.Fragment>
      {/*메인테이블*/}  
      <TableRow hover className={classes.root}>
        <TableCell align="center">{row.workerName}</TableCell>
        <TableCell align="center">{row.auth}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.phone}</TableCell>
        <TableCell align="center">
          <Workers1Modal selectedWorker={row}/>
        </TableCell>
        <TableCell align="center">
          <ProgressBar progressArray={row.progress} height={2}/>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Workers1Table({searchName}) {
  const classes = useStyles();
  const rowsPerPage = 10;  
  const [page, setPage] = useState(0);
  const [rows,setRows] = useState([]);
  const [progressRows,setProgressRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    async function fetchData1(){
      await fetch('/admin/workers1/workers1Table')
      .then(res => res.json())
      .then(res => setRows(res.row1))
      .catch(err => console.log(err));
    }  
    fetchData1();
  },[]);

  React.useEffect(() => {
    async function fetchData1(){
      await fetch('/admin/workers1/workers1Table')
      .then(res => res.json())
      .then(res => setProgressRows(res.row2))
      .catch(err => console.log(err));
    }  
    fetchData1();
  },[]);
  
  function CreateData(id,workerName, auth, email, phone) {
    var progress = {'pre':0,'progress':0,'complete':0,'fail':0};
    var body = "";

    progressRows.map((p) =>{
      p.workerId === id ? progress[p.status] += 1 : progress[p.status] += 0
    });

    body = {id,workerName,auth,email,phone,progress}
    return body
  }

  const filteredComponents = (data) => {
    data = data.filter((row) => {
      return row.workerName.includes(searchName);
    });
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
      const nowRow = CreateData(row.id,row.workerName,row.auth,row.email,row.phone)
      return <Row key={row.id} row={nowRow} />
    });
  }

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} align={column.align} style={{ width: column.width }}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ?
              filteredComponents(rows) :
              <TableRow></TableRow>
            }
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