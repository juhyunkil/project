import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} 
    from '@material-ui/core';
    
import EditableMemoModal from "./EditableMemoModal"
import ProgressModal from "./ProgressModal"


const columns = [
    {id: 'shopName', label: '매장명', width: '20%', align: 'center' },
    {id: 'shopNumber', label: '전화번호', width: '20%', align: 'center' },
    {id:'address', label: '주소', width: '30%', align: 'center'},
    {id: 'distance', label: '거리', width: '10%', align: 'center' },
    {id: 'progress', label: '진행도', width: '10%', align: 'center' },
    {id: 'memo', label: '메모', width: '10%', align: 'center' },
  
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

export default function UserMainTable(props) {
  const {rows} = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

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
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return ( 
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    const fieldName = column.id;
                    if (fieldName === 'progress') {

                      return (
                        <TableCell key={column.field} align="center">
                          <ProgressModal status={value} selectedId={row.id}/>
                        </TableCell>
                      );
                    }
                    else if (fieldName === 'memo') {
                      return (
                        <TableCell key={column.field} align="center">
                          <EditableMemoModal selectedMemo={value} selectedId={row.id}/>
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


