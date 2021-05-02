import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'num', headerName: 'No.', width: 70 , align: 'center'},
  { field: 'id', headerName: '사원번호', width: 130 , align: 'center'},
  { field: 'name', headerName: '사원이름', width: 130 , align: 'center'},
  { field: 'auth', headerName: '직급', width: 130 , align: 'center'},
  {
    field: 'mail',
    headerName: '메일주소',
    width: 500,
    align: 'center'
  },
];

const rows = [
    
  { num: 1, id: '2020003', name: '김한결', auth: '대리' , mail:'mail@naver.com'},
  { num: 2, id: '2020002', name: '홍원승', auth: '대리', mail:'mail@naver.com'},
  { num: 3, id: '2017002', name: '길현주', auth: '팀장', mail:'mail@naver.com'},
  { num: 4, id: '2020003', name: '두정효', auth: '사원' , mail:'mail@naver.com'},
  { num: 5, id: '2021001', name: '김주연', auth: '사원' , mail:'mail@naver.com'},
];

export default function Worker2_table() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
