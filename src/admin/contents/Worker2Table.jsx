//Workers2Table
import React from 'react';
import PropTypes from 'prop-types';
import {  makeStyles,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
  TableRow, TableSortLabel, Paper, Modal, Grid } from '@material-ui/core';
import Workers2ModalModify from './Workers2ModalModify';
import { DataGrid } from '@material-ui/data-grid';

function createData(No, UserName, Auth, Mail, Progress) {
  return { No, UserName, Auth, Mail, Progress };
}



const rows = [
  createData( 1,  '김한길', '영업사원' ,'khg.naver.com', 10),
  createData( 2,  '김한닐', '영업사원' , 'khn.naver.com',  20),
  createData( 3,   '김한딜', '영업대리' , 'khd.naver.com', 30),
  createData( 4,  '김한릴', '영업사원' ,  'khl.naver.com', 40),
  createData( 5,  '김한밀', '영업사원' ,  'khm.naver.com',  50),
  createData( 6,   '김한빌',  '영업대리' , 'khb.naver.com',  60),
  createData( 7,  '김한실',  '영업사원' ,  'khs.naver.com',  50),
  createData( 8, '김한일',  '영업부장' ,  'khi.naver.com', 50),
  createData( 9,  '김한질',  '영업사원' ,  'khj.naver.com', 50),
  createData( 10,  '김한칠',  '영업사원' , 'khch.naver.com',  50),
  createData( 11,   '김한칠',  '영업사원' , 'khch.naver.com',  50),
  createData( 12,   '김한칠',  '영업사원' , 'khch.naver.com',  50),
  createData( 13,   '김한칠',  '영업사원' , 'khch.naver.com',  50),
];

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

const headCells = [
  { id: 'No', numeric: false, disablePadding: true, label: 'No' },
  { id: 'Name', numeric: true, disablePadding: false, label: '사원 명' },
  { id: 'Auth', numeric: true, disablePadding: false, label: '직급' },
  { id: 'Mail', numeric: true, disablePadding: false, label: '메일주소' },
  { id: 'Progress', numeric: true, disablePadding: false, label: '진척률' },
];

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper1: {
    width: '100%',
    maxHeight: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    maxHeight: 100
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  progressBar: {
    backgroundColor: '#faa',
    float: 'center',
    height: theme.spacing.unit*2,
  },
}));

export default function Workers2Table(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid >
        <Workers2ModalModify/>
  
      </Grid>
    </div>
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
        <Paper className={classes.paper1}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow>
                      <TableCell align='center' width='100px' component="th" id={labelId} scope="row" padding="none">
                        {row.No}
                      </TableCell>
                      <TableCell align='center' width='100px' >
                        <button type="button" onClick={handleOpen}>
                          {row.UserName}
                        </button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
                          {body}
                        </Modal>
                      </TableCell>
                      <TableCell align='center' width='100px' >{row.Auth}</TableCell>
                      <TableCell align='center' width='400px' >{row.Mail}</TableCell>
                      <TableCell align='center' width='100px'>
                        <div
                        className={classes.progressBar}
                        style={{ width: `${row.Progress}%`, height:'100%'}}>
                          {row.Progress}
                        </div>
                        
                      </TableCell>
                    
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={10}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}

        />
      </Paper>

    </div>
  );
}
