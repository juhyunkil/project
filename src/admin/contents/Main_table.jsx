import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    {id:'num', label: 'No.', minWidth: 100, align: 'center'},
  { id: 'name', label: '매장명', minWidth: 170, align: 'center' },
  { id: 'phone', label: '전화번호', minWidth: 200, align: 'center' },
  {
    id: 'address',
    label: '주소',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'responsibility',
    label: '담당사원',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'progress',
    label: '진행도',
    minWidth: 170,
    align: 'center'
},
{
    id: 'memo',
    label: '비고',
    minWidth: 170,
    align: 'center'
}
];

function createData(num, name, phone, address, responsibility, progress, memo) {
  
  return { num, name, phone, address, responsibility, progress, memo };
}

const rows = [
  createData(1, '굽네치킨', '02-0000-0000', '서울시 강남구', '김한결', ),
  createData(2, '굽네치킨', '02-0000-0000', '서울시 강남구', '길주현', ),
  createData(3, '네네치킨', '02-0000-0000', '서울시 강남구', '길주현', ),
  createData(4, '네네치킨', '02-0000-0000', '서울시 강남구', '두효정', ),
  createData(5, '보드람치킨', '02-0000-0000', '서울시 강남구', '김한결', ),
  createData(6, '보드람치킨', '02-0000-0000', '서울시 강남구', '홍승원', ),
  createData(7, '치킨매니아', '02-0000-0000', '서울시 강남구', '길주현', ),
  createData(8, '치킨매니아', '02-0000-0000', '서울시 강남구', '홍승원', ),
  createData(9, '서울육계', '02-0000-0000', '서울시 강남구', '홍승원', ),
  createData(10, '양재닭집', '02-0000-0000', '서울시 강남구', '김한결', ),
  createData(11, '노랑통닭', '02-0000-0000', '서울시 강남구', '길주현', ),
  createData(12, '노랑통닭', '02-0000-0000', '서울시 강남구', '홍승원', ),
  createData(13, '60계치킨', '02-0000-0000', '서울시 강남구', '김한결', ),
  createData(14, '60계치킨', '02-0000-0000', '서울시 강남구', '두효정', ),
  createData(15, 'BHC', '02-0000-0000', '서울시 강남구', '두효정', )
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

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
        <Table stickyHeader aria-label="sticky table">
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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


