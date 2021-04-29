import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,TableBody,TableCell,TableContainer,TablePagination,TableRow,TableHead,TableSortLabel} 
from '@material-ui/core';
import {ProgressBarCell} from "../../common/ProgressBarCell";

const columns = [
    { field: 'id', headerName: '사원번호', width: 130},
    { field: 'name', headerName: '사원명', width: 130},
    { field: 'auth', headerName: '직급', width: 100},
    { field: 'mail', headerName: '이메일', width: 130},
    { field: 'progress', headerName: '진척률', width: 130},
];

function createData(id, name, auth, mail) {
  const progress = parseInt(id*0.01);
  return {id, name, auth, mail, progress};
}

const rows = [
  createData('1011', 'kim', '팀장', 'email.gmail.com'),
  createData('2011', 'park', '대리', 'email.gmail.com'),
  createData('3011', 'kil', '대리', 'email.gmail.com'),
  createData('4011', 'doo', '대리', 'email.gmail.com'),
  createData('5011', 'hong', '대리', 'email.gmail.com'),
  createData('6011', 'choi', '대리', 'email.gmail.com'),
  createData('7011', 'lee', '대리', 'email.gmail.com'),
];

const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
  },
  container: {
    maxHeight: 400,
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
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
              return (
                <TableRow hover key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.field];
                    const fieldName = column.field;
                    if (fieldName === 'progress') {
                        return (
                          <ProgressBarCell value={value}/>
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10,20,30]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}