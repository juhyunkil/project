import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'name', headerName: '사원명', width: 140 },
  { field: 'auth', headerName: '직급', width: 130, sortable:false },
  { field: 'phone', headerName: '핸드폰', width: 180, sortable:false },
  { field: 'mail', headerName: '이메일', width: 225, sortable:false },
];

const rows = [
  { id: 1, name: 'kim', auth: '팀장', phone: '010-1234-5678', mail:'mail.gmail.com' },
  { id: 2, name: 'doo', auth: '대리', phone: '010-2234-5678', mail:'mail.gmail.com' },
  { id: 3, name: 'hong', auth: '대리', phone: '010-3234-5678', mail:'mail.gmail.com' },
  { id: 4, name: 'kil', auth: '대리', phone: '010-4234-5678', mail:'mail.gmail.com' },
  { id: 5, name: 'kang', auth: '팀장', phone: '010-5234-5678', mail:'mail.gmail.com' },
  { id: 6, name: 'lee', auth: '대리', phone: '010-6234-5678', mail:'mail.gmail.com' },
  { id: 7, name: 'choi', auth: '대리', phone: '010-7234-5678', mail:'mail.gmail.com' },
  { id: 8, name: 'park', auth: '대리', phone: '010-8234-5678', mail:'mail.gmail.com' },
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
            onRowClick={e => props.setSelectedId(e.row.name)}
            hideFooterSelectedRowCount = {true}
        />
    </div>
  );
}