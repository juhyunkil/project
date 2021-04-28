import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,TablePagination} 
    from '@material-ui/core';




const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  container: {
    maxHeight: 300,
  },
  table: {
    minWidth: 700,
  },
});

//데이터 함수
function createData(num,shopName, shopNumber, address, distance,date,workID) {
  return {
    num,
    shopName,
    shopNumber,
    address,
    distance,
    date,
    workID,
  };
}

//Row 함수
function Row(props) {
  const { row } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      {/*메인테이블*/}  
      <TableRow className={classes.root}>
        <TableCell align="center">{row.num}</TableCell>
        <TableCell component="th" scope="row">{row.shopName}</TableCell>
        <TableCell align="center">{row.shopNumber}</TableCell>
        <TableCell align="center">{row.address}</TableCell>
        <TableCell align="center">{row.distance}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.workID}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

//프로퍼티 타입 명시
Row.propTypes = {
  row: PropTypes.shape({
    shopName: PropTypes.string.isRequired,
    shopNumber: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    workID: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,

  }).isRequired,
};

//행 데이터(임시)
const rows = [
  createData(1,'BBQ','02-1234-5678','서울시 강남구',1, '2021.04.12~2021.04.18','길주현'),
  createData(2,'BHC','02-1234-5678','서울시 강남구',1),
  createData(3,'네네치킨','02-1234-5678','서울시 강남구',1),
  createData(4,'굽네치킨','02-1234-5678','서울시 강남구',1),
  createData(5,'a','02-1234-5678','서울시 강남구',1),
  createData(6,'b','02-1234-5678','서울시 강남구',1),
  createData(7,'c','02-1234-5678','서울시 강남구',1),
  createData(8,'d','02-1234-5678','서울시 강남구',1),
  createData(9,'e','02-1234-5678','서울시 강남구',1),
  createData(10,'f','02-1234-5678','서울시 강남구',1),
  createData(11,'g','02-1234-5678','서울시 강남구',1),
  createData(12,'h','02-1234-5678','서울시 강남구',1),
  createData(13,'i','02-1234-5678','서울시 강남구',1),
  createData(14,'j','02-1234-5678','서울시 강남구',1),
  createData(15,'k','02-1234-5678','서울시 강남구',1),
  createData(16,'l','02-1234-5678','서울시 강남구',1),
];

//메인
export default function Accumulate_table() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
  return (
    <div>
        <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} size="small" aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell>번호</TableCell>
                <TableCell >매장명</TableCell>
                <TableCell align="center">전화번호</TableCell>
                <TableCell align="center">주소</TableCell>
                <TableCell align="center">거리</TableCell>
                <TableCell align="center">달성일</TableCell>
                <TableCell align="center">담당사원</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <Row key={row.shopName} row={row} />
                    );
                })}
            </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
            component="div"
            rowsPerPageOptions={[10,20,30]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>
  );
}