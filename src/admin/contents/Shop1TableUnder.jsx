import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,TablePagination} 
    from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';



const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  container: {
    maxHeight: 290,
  },
  table: {
    minWidth: 700,
  },
});

//데이터 함수
function createData(shopName, shopNumber, address, distance) {
  return {
    shopName,
    shopNumber,
    address,
    distance,
    history: [
      { date: '2020-01-05', workerId: '4110', process: 3 },
      { date: '2020-01-02', workerId: '1535', process: 1 },
    ],
  };
}

//Row 함수
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      {/*메인테이블*/}  
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.shopName}</TableCell>
        <TableCell align="center">{row.shopNumber}</TableCell>
        <TableCell align="center">{row.address}</TableCell>
        <TableCell align="center">{row.distance}</TableCell>
      </TableRow>

      {/*보조테이블*/}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                영업진행이력
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>진행날짜</TableCell>
                    <TableCell>담당직원</TableCell>
                    <TableCell align="right">진행도</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.workerId}</TableCell>
                      <TableCell align="right">{historyRow.process}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
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
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        workerId: PropTypes.string.isRequired,
        process: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

//행 데이터(임시)
const rows = [
  createData('BBQ','02-1234-5678','서울시 강남구',1),
  createData('BHC','02-1234-5678','서울시 강남구',1),
  createData('네네치킨','02-1234-5678','서울시 강남구',1),
  createData('굽네치킨','02-1234-5678','서울시 강남구',1),
  createData('a','02-1234-5678','서울시 강남구',1),
  createData('b','02-1234-5678','서울시 강남구',1),
  createData('c','02-1234-5678','서울시 강남구',1),
  createData('d','02-1234-5678','서울시 강남구',1),
  createData('e','02-1234-5678','서울시 강남구',1),
  createData('f','02-1234-5678','서울시 강남구',1),
  createData('g','02-1234-5678','서울시 강남구',1),
  createData('h','02-1234-5678','서울시 강남구',1),
  createData('i','02-1234-5678','서울시 강남구',1),
  createData('j','02-1234-5678','서울시 강남구',1),
  createData('k','02-1234-5678','서울시 강남구',1),
  createData('l','02-1234-5678','서울시 강남구',1),
];

//메인
export default function Shop1TableUnder() {
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
            <caption>할당 전 목표 설정 매장 리스트</caption>
            <TableHead>
            <TableRow>
               {/*<TableCell padding="checkbox">
                <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                />
                </TableCell>*/} 
                <TableCell />
                <TableCell >매장명</TableCell>
                <TableCell align="center">전화번호</TableCell>
                <TableCell align="center">주소</TableCell>
                <TableCell align="center">거리</TableCell>
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