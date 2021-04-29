import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: '사원번호', width: 130, sortable:false },
  { field: 'name', headerName: '사원명', width: 130 },
  { field: 'auth', headerName: '직급', width: 100, sortable:false },
  { field: 'mail', headerName: '이메일', width: 130, sortable:false },
];

const rows = [
  { id: 1123, name: 'kim', auth: '팀장', age: 20, mail:'mail.gmail.com' },
  { id: 2464, name: 'doo', auth: '대리', age: 20, mail:'mail.gmail.com' },
  { id: 3446, name: 'hong', auth: '대리', age: 20, mail:'mail.gmail.com' },
  { id: 4884, name: 'kil', auth: '대리', age: 20, mail:'mail.gmail.com' },
  { id: 4242, name: 'kang', auth: '팀장', age: 20, mail:'mail.gmail.com' },
  { id: 5432, name: 'lee', auth: '대리', age: 20, mail:'mail.gmail.com' },
  { id: 7876, name: 'choi', auth: '대리', age: 20, mail:'mail.gmail.com' },
  { id: 9695, name: 'park', auth: '대리', age: 20, mail:'mail.gmail.com' },
];

export default function Shop2Table(props) {
  return (
    <div style={{ height:220, width: '100%' }}>
        <DataGrid 
            density="compact"
            rows={rows} 
            columns={columns}
            rowHeight={45} 
            pageSize={4}
            onRowClick={e => props.setSelectedId(e.row.id)}
            hideFooterSelectedRowCount = {true}
        />
    </div>
  );
}