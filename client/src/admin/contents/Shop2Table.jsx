import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'users_name', headerName: '사원명', width: 140 },
  { field: 'users_auth', headerName: '직급', width: 130, sortable:false },
  { field: 'users_phone', headerName: '핸드폰', width: 180, sortable:false },
  { field: 'users_email', headerName: '이메일', width: 225, sortable:false },
];

export default function Shop2Table(props) {
  const [workers,setWorkers] = React.useState([]);

  React.useEffect(() => {
    fetch('/admin/shopDistribution/shop2Table')
    .then(res => res.json())
    .then(res => setWorkers(res))
    .catch(err => console.log(err));
  },[]);

  return (
    <div style={{ height:220, width: '100%' }}>
        <DataGrid 
            density="compact"
            rows={workers} 
            columns={columns}
            rowHeight={45} 
            pageSize={4}
            onRowClick={e => props.setSelectedId({id:e.row.id,name:e.row.users_name})}
            hideFooterSelectedRowCount = {true}
        />
    </div>
  );
}
