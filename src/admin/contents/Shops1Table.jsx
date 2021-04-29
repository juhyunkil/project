//Shops1Table
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Checkbox from '@material-ui/core/Checkbox';
import { Tab } from 'bootstrap';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(No, ShopName, ShopTel, ShopAddress, ShopProgress, Check) {
  return {
    No,
    ShopName,
    ShopTel,
    ShopAddress,
    ShopProgress,
    Check,
    history: [
      { date: '2020-04-23', result: '진행완료', user: '김철수' },
      { date: '2020-04-24', result: '진행실패', user: '김영희' },
    ],
  };
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.No}
        </TableCell>
        <TableCell>{row.ShopName}</TableCell>
        <TableCell>{row.ShopTel}</TableCell>
        <TableCell>{row.ShopAddress}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>진행날짜</TableCell>
                    <TableCell>진행결과</TableCell>
                    <TableCell>사원</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.result}</TableCell>
                      <TableCell>{historyRow.user}</TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    No: PropTypes.number.isRequired,
    ShopName: PropTypes.string.isRequired,
    ShopTel: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        result: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
      }),
    ).isRequired,
    ShopAddress: PropTypes.string.isRequired,
    ShopProgress: PropTypes.string.isRequired,
    Check: PropTypes.number.isRequired,
  }).isRequired,
};
const rows = [
  createData(1,'BBQ','02-0000-0000','서울특별시','신규','check'),
  createData(2,'BBQ','02-0000-0000','서울특별시','신규','check'),
  createData(3,'BBQ','02-0000-0000','서울특별시','신규','check'),
  createData(4,'BBQ','02-0000-0000','서울특별시','신규','check'),
  createData(5,'BBQ','02-0000-0000','서울특별시','신규','check'),
  createData(6,'BBQ','02-0000-0000','서울특별시','신규','check'),
  createData(7,'BBQ','02-0000-0000','서울특별시','신규','check'),
  createData(8,'BBQ','02-0000-0000','서울특별시','신규','check'),
  createData(9,'BBQ','02-0000-0000','서울특별시','신규','check'),
  createData(10,'BBQ','02-0000-0000','서울특별시','신규','check'),
];

export default function Shops1Table() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>매장명</TableCell>
            <TableCell>전화번호</TableCell>
            <TableCell>주소</TableCell>
            <TableCell>진행내역</TableCell>
            <TableCell>선택</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
