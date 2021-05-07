import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} 
    from '@material-ui/core';
import {ProgressCircleCell} from "../../common/ProgressCircleCell";

const columns = [
    {id:'num', label: 'No.', minWidth: 50, align: 'center'},
    {id: 'name', label: '매장명', minWidth: 170, align: 'center' },
    {id: 'shopNumber', label: '전화번호', minWidth: 150, align: 'center' },
    {id:'address', label: '주소', minWidth: 200, align: 'center'},
    {id: 'worker', label: '담당사원', minWidth: 120, align: 'center' },
    {id: 'progress', label: '진행도', minWidth: 50, align: 'center' },
    {id: 'memo', label: '메모', minWidth: 50, align: 'center' },
];

function createData(num, name, shopNumber, address, worker, progress, memo) {
    return {num, name, shopNumber, address, worker, progress, memo};
}

const rows = [
  createData(1, '굽네치킨', '02-0000-0000', '서울시 강남구', '김철수', 'pre','default'),
  createData(2, '굽네치킨', '02-0000-0000', '서울시 강남구', '김철수', 'pre',''),
  createData(3, '네네치킨', '02-0000-0000', '서울시 강남구', '김철수', 'pre',''),
  createData(4, '네네치킨', '02-0000-0000', '서울시 강남구', '김철수', 'complete',''),
  createData(5, '보드람치킨', '02-0000-0000', '서울시 강남구', '김철수', 'complete',''),
  createData(6, '보드람치킨', '02-0000-0000', '서울시 강남구', '김철수', 'complete',''),
  createData(7, '치킨매니아', '02-0000-0000', '서울시 강남구', '김철수', 'complete',''),
  createData(8, '치킨매니아', '02-0000-0000', '서울시 강남구', '김철수', 'fail',''),
  createData(9, '서울육계', '02-0000-0000', '서울시 강남구', '김철수', 'fail',''),
  createData(10, '양재닭집', '02-0000-0000', '서울시 강남구', '김철수', 'fail',''),
  createData(11, '노랑통닭', '02-0000-0000', '서울시 강남구', '김철수', 'fail',''),
  createData(12, '노랑통닭', '02-0000-0000', '서울시 강남구', '김철수', 'progress',''),
  createData(13, '60계치킨', '02-0000-0000', '서울시 강남구', '김철수', 'progress',''),
  createData(14, '60계치킨', '02-0000-0000', '서울시 강남구', '김철수', 'progress',''),
  createData(15, 'BHC', '02-0000-0000', '서울시 강남구', '김철수', 'progress','')
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 330,
  },
});

export default function AdminMainTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.num}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const fieldName = column.id;
                    if (fieldName === 'progress') {
                        return (
                          <ProgressCircleCell value={value}/>
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
    </Paper>
  );
}


