import { Box, Button, useTheme } from '@mui/material';
// import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
// import { mockDataInvoices } from "../../data/mockData";
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Popup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [col, setCol] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          'https://autozone-8azp.onrender.com/getPopups'
        );
        setCol([
          { field: 'id', headerName: 'ID' },
          {
            field: 'number',
            headerName: 'Phone Number',
            flex: 1,
          },

          {
            field: 'time',
            headerName: 'Time',
            flex: 1,
          },
          {
            field: 'date',
            headerName: 'Date',
            flex: 1,
          },
        ]);
        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  let newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  async function fetchData() {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://autozone-8azp.onrender.com/getpopups?date=${inputValue}`
      );
      setCol([
        { field: 'id', headerName: 'ID' },
        {
          field: 'number',
          headerName: 'Phone Number',
          flex: 1,
        },

        {
          field: 'time',
          headerName: 'Time',
          flex: 1,
        },
        {
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
      ]);
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }
  const handleRemoveDuplicates = () => {
    if (inputValue === '') alert('Please select the date');
    else fetchData();
  };
  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://autozone-8azp.onrender.com/getpopups'
      );
      setCol([
        { field: 'id', headerName: 'ID' },
        {
          field: 'number',
          headerName: 'Phone Number',
          flex: 1,
        },

        {
          field: 'time',
          headerName: 'Time',
          flex: 1,
        },
        {
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
      ]);
      setData(res.data.data);
      setInputValue('');
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleDup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://autozone-8azp.onrender.com/dupilicatepopups'
      );

      // Process the response data to create rows with unique phoneNumber and count combinations
      const processedData = res.data.data.map((item, index) => ({
        id: index + 1,
        phoneNumber: item.number,
        count: item.count,
        date: item.date, // Adding the date field
      }));

      setCol([
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
        { field: 'count', headerName: 'Count', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 },
      ]);

      setData(processedData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // const handleDup = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(
  //       'https://eurokids.onrender.com/dupilicatepopups'
  //     );
  //     setData(res.data.data);
  //     // setInputValue('');
  //     // setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //     setLoading(false);
  //   }
  // };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const columns = [
  //   { field: 'id', headerName: 'ID' },
  //   // {
  //   //   field: "name",
  //   //   headerName: "Name",
  //   //   flex: 1,
  //   //   cellClassName: "name-column--cell",
  //   // },
  //   {
  //     field: 'mobile',
  //     headerName: 'Phone Number',
  //     flex: 1,
  //   },
  //   // {
  //   //   field: "email",
  //   //   headerName: "Email",
  //   //   flex: 1,
  //   // },
  //   // {
  //   //   field: "cost",
  //   //   headerName: "Cost",
  //   //   flex: 1,
  //   //   renderCell: (params) => (
  //   //     <Typography color={colors.greenAccent[500]}>
  //   //       ${params.row.cost}
  //   //     </Typography>
  //   //   ),
  //   // },
  //   {
  //     field: 'time',
  //     headerName: 'Time',
  //     flex: 1,
  //   },
  //   {
  //     field: 'date',
  //     headerName: 'Date',
  //     flex: 1,
  //   },
  // ];

  return (
    <Box m='20px'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Header title='Popup' subtitle='List of Popup Enquiries' />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            sx={{ mr: 2, backgroundColor: '#940004' }}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant='contained'
            color='primary'
            sx={{ backgroundColor: '#940004' }}
            onClick={handleDup}
          >
            Duplicates Entries
          </Button>
          <Button
            variant='contained'
            color='primary'
            sx={{ ml: 2, backgroundColor: '#940004' }}
            onClick={handleRemoveDuplicates}
          >
            Unique
          </Button>
          <input
            type='date'
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              marginLeft: '16px',
              backgroundColor: '#940004',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              padding: '8px',
            }}
          />
        </div>
      </div>
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.sabooAutoColors[200],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.sabooAutoColors[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.sabooAutoColors[100],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {loading ? (
          <div>Processing, please wait</div>
        ) : error ? (
          'Error ~ Something went wrong :)'
        ) : (
          <DataGrid
            rows={newData}
            // rows={filteredData.length > 0 ? filteredData : newData}
            columns={col}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Popup;
