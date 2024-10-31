import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { CSVLink } from 'react-csv';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';

const GenericTable = ({ title, data, columns}) => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5' }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnFiltering={false}
        renderTopToolbarCustomActions={({ table }) => (
          <Box display="flex" alignItems="center" gap={1} ml="auto">
            <IconButton onClick={() => window.location.reload()} sx={{ color: '#000' }}>
              <RefreshIcon />
            </IconButton>
            <CSVLink data={data} filename={`${title.toLowerCase()}.csv`} style={{ textDecoration: 'none' }}>
              <IconButton sx={{ color: '#000' }}>
                <DownloadIcon />
              </IconButton>
            </CSVLink>
          </Box>
        )}
        muiTableToolbarSearchBoxProps={{
          placeholder: 'Search...',
          InputProps: {
            endAdornment: (
              <Box display="flex" gap={1}>
                <IconButton onClick={() => window.location.reload() } sx={{ color: '#000' }}>
                  <RefreshIcon />
                </IconButton>
                <CSVLink data={data} filename={`${title.toLowerCase()}.csv`} style={{ textDecoration: 'none' }}>
                  <IconButton sx={{ color: '#000' }}>
                    <DownloadIcon />
                  </IconButton>
                </CSVLink>
              </Box>
            ),
          },
        }}
        sx={{ backgroundColor: '#000000', '& .MuiTableCell-root': { padding: 0, margin: 0 } }}
      />
    </Box>
  );
};

export default GenericTable;
