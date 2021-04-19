import React, { useState } from 'react';
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import t from '../common/localization';
import { formatDistance, formatSpeed, formatHours, formatDateTime } from '../common/formatter';
import ReportFilter from './ReportFilter';
import ReportLayoutPage from './ReportLayoutPage';
import { useAttributePreference } from '../common/preferences';

const Filter = ({ setItems }) => {

  const handleSubmit = async (deviceId, from, to, mail, headers) => {
    const query = new URLSearchParams({ deviceId, from, to, mail });
    const response = await fetch(`/fn-api/positions?${query.toString()}`, { headers });
    if (response.ok) {
      setItems(await response.json());
    }
  }

  return <ReportFilter handleSubmit={handleSubmit} />;
}

const SpeedReportPage = () => {
  
  const distanceUnit = useAttributePreference('distanceUnit');
  const speedUnit = useAttributePreference('speedUnit');
  const [items, setItems] = useState([]);

  const columns = [
    { field: 'fixtime', headerName: 'Date Time', flex:1.5,
      valueFormatter: (p) => formatDateTime(p.value)
    },
    { field: 'speed', headerName: 'Speed', flex:1,
      valueFormatter: (p) => formatSpeed(p.value, 'kmh'),
    },
    { field: 'longitude', headerName: 'Longitude', flex:1},
    { field: 'latitude', headerName: 'Latitude', flex:1},
    { field: 'address', headerName: 'Position', flex:1},
    { field: 'overspeed', headerName: 'Over Speed', flex:1,
      valueGetter: (p) => ((p.getValue('speed') || 0 )* 1.852).toFixed(2) < 80 ? 'No': 'YES'
    },
  ]

  return (
    <ReportLayoutPage filter={<Filter setItems={setItems} />}>
      <TableContainer component={Paper}>
        <DataGrid autoHeight={'true'} rows={items} columns={columns} pageSize={5} width={'100%'} />
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>{'Date Time'}</TableCell>
              <TableCell>{'Speed'}</TableCell>
              <TableCell>{'Longitude'}</TableCell>
              <TableCell>{'Latitude'}</TableCell>
              <TableCell>{'Position'}</TableCell>
              <TableCell>{'Speed Status'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{formatDateTime(item.fixtime)}</TableCell>
                <TableCell>{formatSpeed(item.speed, 'kmh')}</TableCell>
                <TableCell>{item.longitude}</TableCell>
                <TableCell>{item.latitude}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{(item.speed < 80 ? 'Regular Speed': 'Over Speed')}</TableCell>                             
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </TableContainer>
    </ReportLayoutPage>
  );
}

export default SpeedReportPage;
