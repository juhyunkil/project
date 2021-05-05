//Shops1Table
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,Checkbox,TablePagination} 
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
    height: 340,
  },
  table: {
    minWidth: 700,
  },
});

function createData(No, ShopName, ShopTel, ShopAddress, ShopProgress, Check) {
  return {
    No,ShopName,ShopTel,ShopAddress,ShopProgress,Check,
    history: [
      { date: '2020-04-23', result: '진행완료', user: '김철수' },
      { date: '2020-04-24', result: '진행실패', user: '김영희' },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">{row.No}</TableCell>
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

export default function Shop1Table() {
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
              <TableCell>No</TableCell>
              <TableCell>매장명</TableCell>
              <TableCell>전화번호</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>진행내역</TableCell>
              <TableCell>선택</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <Row key={row.name} row={row} />
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
