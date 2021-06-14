import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} 
  from '@material-ui/core';
import {ProgressCircleCell} from "../../common/ProgressCircleCell";
import MemoModal from './MemoModal';

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  container: {
    maxHeight: 340,
  },
});

const columns = [
  {id: 'shopName', label: '매장명', minWidth: 170, align: 'center' },
  {id: 'shopNumber', label: '전화번호', minWidth: 150, align: 'center' },
  {id:'address', label: '주소', minWidth: 200, align: 'center'},
  {id: 'period', label: '달성기간', minWidth: 120, align: 'center' },
  {id: 'workerName', label: '담당사원', minWidth: 50, align: 'center' },
  {id: 'progress', label: '달성률', minWidth: 50, align: 'center' },
  {id: 'memo', label: '메모', minWidth: 30, align: 'center' },
];

export default function Shop3Table() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 20;
  const [rows,setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(async () => {
    await fetch('/admin/shopAccumulate')
    .then(res => res.json())
    .then(res => setRows(res))
    .catch(err => console.log(err));
  },[]);

  return (
    <div>
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
                <TableRow hover role="checkbox" key={row.num}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const fieldName = column.id;

                    if (fieldName === 'progress') {
                      return (
                        <ProgressCircleCell value={value}/>
                      );
                    } 
                    else if (fieldName === 'memo') {
                      return (
                        <TableCell key={column.id} align="center">
                          <MemoModal selectedMemo={memo}/>
                        </TableCell>
                      );
                    } 
                    else{
                        return (
                          <TableCell key={column.id} align="center">
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
        rowsPerPageOptions={[20]}
        page={page}
        onChangePage={handleChangePage}
      />
    </div>
  );
}
