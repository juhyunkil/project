import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} 
    from '@material-ui/core';
import {ProgressCircleCell} from "../../common/ProgressCircleCell";
import EditableMemoModal from "./EditableMemoModal"
import progressModal from "./progressModal"



const columns = [
    {id:'num', label: 'No.', minWidth: 100, align: 'center'},
    {id: 'name', label: '매장명', minWidth: 170, align: 'center' },
    {id: 'shopNumber', label: '전화번호', minWidth: 200, align: 'center' },
    {id:'address', label: '주소', minWidth: 100, align: 'center'},
    {id: 'distance', label: '거리', minWidth: 170, align: 'center' },
    {id: 'progress', label: '진행도', minWidth: 200, align: 'center' },
    {id: 'memo', label: '메모', minWidth: 200, align: 'center' },
  
];

function getModalStyle() {
  const top = 45;
  const left = 75;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


function createData(num, name, shopNumber, address, distance, progress, memo) {
    return {num, name, shopNumber, address, distance, progress, memo};
}

const rows = [
  createData(1, '굽네치킨', '02-0000-0000', '서울시 강남구', '1', 'pre','default'),
  createData(2, '굽네치킨', '02-0000-0000', '서울시 강남구', '1', 'pre','2'),
  createData(3, '네네치킨', '02-0000-0000', '서울시 강남구', '2', 'pre','3'),
  createData(4, '네네치킨', '02-0000-0000', '서울시 강남구', '2', 'complete','4'),
  createData(5, '보드람치킨', '02-0000-0000', '서울시 강남구', '3', 'complete',''),
  createData(6, '보드람치킨', '02-0000-0000', '서울시 강남구', '3', 'complete',''),
  createData(7, '치킨매니아', '02-0000-0000', '서울시 강남구', '4', 'complete',''),
  createData(8, '치킨매니아', '02-0000-0000', '서울시 강남구', '4', 'fail',''),
  createData(9, '서울육계', '02-0000-0000', '서울시 강남구', '5', 'fail',''),
  createData(10, '양재닭집', '02-0000-0000', '서울시 강남구', '5', 'fail',''),
  createData(11, '노랑통닭', '02-0000-0000', '서울시 강남구', '6', 'fail',''),
  createData(12, '노랑통닭', '02-0000-0000', '서울시 강남구', '6', 'progress',''),
  createData(13, '60계치킨', '02-0000-0000', '서울시 강남구', '7', 'progress',''),
  createData(14, '60계치킨', '02-0000-0000', '서울시 강남구', '7', 'progress',''),
  createData(15, 'BHC', '02-0000-0000', '서울시 강남구', '8', 'progress','')
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    height: 400,
  },
  paper: {
    position: 'absolute',
    width: 800,
    
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




export default function UserMainTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {/* <TextField
        disabled
        id="memo"
        label="매장 비고란"
        multiline
        rows={8}
        defaultValue={props.selectedMemo?props.selectedMemo:'내용없음'}
        className={classes.memoField}
        variant="outlined"
      /> */}
    </div>
  );

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
              const memo = row.memo;
              return ( 
                <TableRow hover role="checkbox" tabIndex={-1} key={row.num}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const fieldName = column.id;
                    if (fieldName === 'progress') {

                      return (
                        <TableCell key={column.field} align="center">
                          <progressModal value={value} selectedId={row.num}/>
                        </TableCell>
                      );
                    }
                    else if (fieldName === 'memo') {
                      return (
                        <TableCell key={column.field} align="center">
                          <EditableMemoModal selectedMemo={memo} selectedId={row.num}/>
                        </TableCell>
                      );
                    }  

                    else{
                      return (
                        <TableCell key={column.field} align="center">
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
        rowsPerPageOptions={[10]}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
}


