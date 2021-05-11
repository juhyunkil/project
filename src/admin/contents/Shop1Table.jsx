import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,TablePagination,Checkbox} 
    from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {ProgressCircleCell} from "../../common/ProgressCircleCell";

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  container: {
    maxHeight: 380,
  },
  table: {
    width: '100%',
  },
});

//데이터 함수
function createData(shopName, shopNumber, address, distance) {
  return {
    shopName,shopNumber,address,distance,
    history: [
      { date: '2020-01-05', workerName: '김민수',phone:'01012345678', progress: 'complete'},
      { date: '2020-01-02', workerName: '김철수',phone:'01087654321', progress: 'fail' },
    ],
  };
}

//Row 함수
function Row(props) {
  const classes = useStyles();
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      {/*메인테이블*/}  
      <TableRow hover className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.shopName}</TableCell>
        <TableCell align="center">{row.shopNumber}</TableCell>
        <TableCell align="center">{row.address}</TableCell>
        <TableCell padding="checkbox"><Checkbox/></TableCell>
      </TableRow>

      {/*보조테이블*/}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                영업진행이력
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">진행날짜</TableCell>
                    <TableCell align="center">담당직원</TableCell>
                    <TableCell align="center">핸드폰</TableCell>
                    <TableCell align="center">진행도</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.phone}>
                      <TableCell component="th" scope="row" align="center">{historyRow.date}</TableCell>
                      <TableCell align="center">{historyRow.workerName}</TableCell>
                      <TableCell align="center">{historyRow.phone}</TableCell>
                      <ProgressCircleCell value={historyRow.progress}/>
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
        workerName: PropTypes.string.isRequired,
        process: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

//행 데이터(임시)
const rows = [
  createData('BBQ','02-1234-5678','서울시 강남구'),
  createData('BHC','02-1234-5678','서울시 강남구'),
  createData('네네치킨','02-1234-5678','서울시 강남구'),
  createData('굽네치킨','02-1234-5678','서울시 강남구'),
  createData('a','02-1234-5678','서울시 강남구'),
  createData('b','02-1234-5678','서울시 강남구'),
  createData('c','02-1234-5678','서울시 강남구'),
  createData('d','02-1234-5678','서울시 강남구'),
  createData('e','02-1234-5678','서울시 강남구'),
  createData('f','02-1234-5678','서울시 강남구'),
  createData('g','02-1234-5678','서울시 강남구'),
  createData('h','02-1234-5678','서울시 강남구'),
  createData('i','02-1234-5678','서울시 강남구'),
  createData('j','02-1234-5678','서울시 강남구'),
  createData('k','02-1234-5678','서울시 강남구'),
  createData('l','02-1234-5678','서울시 강남구'),
];

//메인
export default function Shop2TableUnder() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 20;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
  return (
    <div>
        <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} size="small" aria-label="collapsible table">
            
            <TableHead>
              <TableRow> 
                <TableCell/>
                <TableCell>매장명</TableCell>
                <TableCell align="center">전화번호</TableCell>
                <TableCell align="center">주소</TableCell>
                <TableCell/>
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
          count={rows.length}
          rowsPerPageOptions={20}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
    </div>
  );
}