import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,TablePagination,Checkbox} 
    from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {ProgressCircleCell} from "../../common/ProgressCircleCell";
import MemoModal from '../contents/MemoModal';

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
        <TableCell component="th" scope="row" align="center">{row.shopName}</TableCell>
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
                    <TableCell align="center">메모</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row" align="center">{historyRow.date}</TableCell>
                      <TableCell align="center">{historyRow.workerName}</TableCell>
                      <TableCell align="center">{historyRow.phone}</TableCell>
                      <ProgressCircleCell value={historyRow.progress}/>
                      <TableCell align="center">
                        <MemoModal selectedMemo={historyRow.memo}/>
                      </TableCell>
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

//메인
export default function Shop2TableUnder() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 20;
    const [rows,setRows] = React.useState([]);
    const [allHistory,setAllHistory] = React.useState([]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    function CreateData(id,shopName, shopNumber, address) {
      var temp = {history:[]};
      var body = "";

      allHistory.map((h) =>{
        h.shop_id === id ? temp['history'].push(h) : temp['history'].push()
      });

      body = {shopName,shopNumber,address,history:temp.history}

      return body
    }

    React.useEffect(async () => {
      await fetch('/admin/totalShop/shop1Table')
      .then(res => res.json())
      .then(res => setRows(res.row1))
      .catch(err => console.log(err));  

      await fetch('/admin/totalShop/shop1Table')
      .then(res => res.json())
      .then(res => setAllHistory(res.row2))
      .catch(err => console.log(err));  
    },[]);
  
  return (
    <div>
        <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} size="small" aria-label="collapsible table">
            
            <TableHead>
              <TableRow> 
                <TableCell/>
                <TableCell align="center">매장명</TableCell>
                <TableCell align="center">전화번호</TableCell>
                <TableCell align="center">주소</TableCell>
                <TableCell/>
                <TableCell/>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const nowRow = CreateData(row.id,row.shopName,row.shopNumber,row.address)
                  return (
                    <Row key={row.id} row={nowRow} />
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