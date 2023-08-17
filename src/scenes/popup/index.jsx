import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LooksOneIcon from '@mui/icons-material/LooksOne';

//import date range picker files
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const Popup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [col, setCol] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
            field: 'date',
            headerName: 'Date',
            flex: 1,
          },

          {
            field: 'time',
            headerName: 'Time',
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

  //date range unique function

  async function fetchUniqueValues(startDate, endDate) {
    try {
      setLoading(true);
      const formattedStartDate = new Date(startDate);
      formattedStartDate.setDate(formattedStartDate.getDate() + 1);
      const formattedStartDateString = formattedStartDate
        .toISOString()
        .slice(0, 10);

      const formattedEndDate = new Date(endDate);
      formattedEndDate.setDate(formattedEndDate.getDate() + 1);
      const formattedEndDateString = formattedEndDate
        .toISOString()
        .slice(0, 10);

      const res = await axios.post(
        'https://autozone-8azp.onrender.com/popUpRangeData',
        {
          startDate: formattedStartDateString,
          endDate: formattedEndDateString,
        }
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

  useEffect(() => {
    if (startDate && endDate) {
      fetchUniqueValues(startDate, endDate);
    }
  }, [startDate, endDate]);

  //   try {
  //     setLoading(true);
  //     const res = await axios.get(
  //       `https://autozone-8azp.onrender.com/getpopups?date=${newInputValue}`
  //     );
  //     setCol([
  //       { field: 'id', headerName: 'ID' },
  //       {
  //         field: 'number',
  //         headerName: 'Phone Number',
  //         flex: 1,
  //       },

  //       {
  //         field: 'time',
  //         headerName: 'Time',
  //         flex: 1,
  //       },
  //       {
  //         field: 'date',
  //         headerName: 'Date',
  //         flex: 1,
  //       },
  //     ]);
  //     setData(res.data.data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //     setLoading(false);
  //   }
  // }
  // const handleRemoveDuplicates = (newInputValue) => {
  //   fetchData(newInputValue);
  // };
  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://autozone-8azp.onrender.com/getpopups'
      );

      setStartDate(null);
      setEndDate(null);

      setCol([
        { field: 'id', headerName: 'ID' },
        {
          field: 'number',
          headerName: 'Phone Number',
          flex: 1,
        },
        {
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
        {
          field: 'time',
          headerName: 'Time',
          flex: 1,
        },
       
      ]);
      setData(res.data.data);

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

  const uniqueEntries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://autozone-8azp.onrender.com/popUpUniqueEntries`
      );
      setCol([
        { field: 'id', headerName: 'ID' },
        {
          field: 'number',
          headerName: 'Phone Number',
          flex: 1,
        },

        {
          field: 'date',
          headerName: 'Date',
          flex: 1,
        },
        {
          field: 'time',
          headerName: 'Time',
          flex: 1,
        },
       
      ]);
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m='20px'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Header title='Popup' subtitle='List of Popup Enquiries' />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            {' '}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DateRangePicker']}
                sx={{ padding: '6px', backgroundColor: 'transparent' }}
              >
                <DateRangePicker
                  localeText={{
                    start: (
                      <span style={{ fontSize: '16px', padding: '2px' }}>
                        Start Date
                      </span>
                    ),
                    end: (
                      <span style={{ fontSize: '16px', padding: '2px' }}>
                        End Date
                      </span>
                    ),
                  }}
                  start={startDate}
                  end={endDate}
                  onChange={(newValue) => {
                    setStartDate(newValue[0]);
                    setEndDate(newValue[1]);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <Button
            variant='contained'
            color='primary'
            sx={{ backgroundColor: '#940004', mr: 2 }}
            onClick={handleDup}
          >
            Duplicates
          </Button>

          {/* <input
            type='date'
            required
            sx={{ mr: 2, backgroundColor: '#940004' }}
            value={inputValue}
            onChange={(e) => {
              const newInputValue = e.target.value;
              console.log('New input value:', newInputValue);
              setInputValue(newInputValue);
              handleRemoveDuplicates(newInputValue);
            }}
            style={{
              backgroundColor: '#940004',
              color: 'white',
              borderRadius: '6px',
              border: 'none',
              padding: '6px',
              margin: '15px', // Add margin to separate input and button
              flex: 1,
              // Allow the input to grow to fill available space
            }}
          /> */}

          <Button
            variant='contained'
            color='primary'
            sx={{ mr: 2, backgroundColor: '#940004' }}
            onClick={uniqueEntries}
          >
            {' '}
            <LooksOneIcon />
          </Button>
          <Button
            variant='contained'
            color='primary'
            sx={{ backgroundColor: '#940004' }}
            onClick={handleReset}
          >
            Reset
          </Button>
          {/* <Button
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
          /> */}
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
            backgroundColor: colors.sabooAutoColors[300],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.sabooAutoColors[300],
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
          <div>Processing, please wait...</div>
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
