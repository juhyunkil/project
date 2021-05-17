import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} 
    from '@material-ui/core';
    
import EditableMemoModal from "./EditableMemoModal"
import ProgressModal from "./ProgressModal"


const columns = [
    {id: 'shopName', label: '매장명', minWidth: 170, align: 'center' },
    {id: 'shopNumber', label: '전화번호', minWidth: 200, align: 'center' },
    {id:'address', label: '주소', minWidth: 100, align: 'center'},
    {id: 'distance', label: '거리', minWidth: 170, align: 'center' },
    {id: 'progress', label: '진행도', minWidth: 200, align: 'center' },
    {id: 'memo', label: '메모', minWidth: 200, align: 'center' },
  
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    height: 400,
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function UserMainTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
  const [rows,setRows] = React.useState([]);
  const workerId = '2'//로그인 정보에 따라 직원의 id가 이곳에 저장, 현재는 임시값

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(async () => {
    await fetch(`/users/userMain?workerId=${workerId}`)
    .then(res => res.json())
    .then(res => setRows(res))
    .catch(err => console.log(err));
  },[]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const memo = row.memo;
              return ( 
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const fieldName = column.id;
                    if (fieldName === 'progress') {

                      return (
                        <TableCell key={column.field} align="center">
                          <ProgressModal value={value} selectedId={row.id}/>
                        </TableCell>
                      );
                    }
                    else if (fieldName === 'memo') {
                      return (
                        <TableCell key={column.field} align="center">
                          <EditableMemoModal selectedMemo={memo} selectedId={row.id}/>
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
}


