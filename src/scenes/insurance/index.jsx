import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import date range picker files
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const Insurance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          'https://autozone-8azp.onrender.com/getIsurance'
        );
        setCol([
          { field: 'id', headerName: 'ID', flex: 0.5 },
          {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
          },
          {
            field: 'mobile',
            headerName: 'Phone Number',
            flex: 1,
          },
          {
            field: 'email',
            headerName: 'Email',
            flex: 1,
          },
          {
            field: 'model',
            headerName: 'Model',
            flex: 1,
          },
          {
            field: 'insurancecompany',
            headerName: 'Insurance Company',
            flex: 1,
            cellClassName: 'name-column--cell',
          },
          {
            field: 'policynumber',
            headerName: 'Policy Number',
            flex: 1,
            cellClassName: 'name-column--cell',
          },
          {
            field: 'registerationnumber',
            headerName: 'Registration Number',
            flex: 1,
            cellClassName: 'name-column--cell',
          },
          {
            field: 'registerationyear',
            headerName: 'Registration Year',
            flex: 1,
          },
          {
            field: 'insuranceexpiry',
            headerName: 'Insurance Expiry',
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
        'https://autozone-8azp.onrender.com/insuranceRange',
        {
          startDate: formattedStartDateString,
          endDate: formattedEndDateString,
        }
      );
      setCol([
        { field: 'id', headerName: 'ID', flex: 0.5 },
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'mobile',
          headerName: 'Phone Number',
          flex: 1,
        },
        {
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'model',
          headerName: 'Model',
          flex: 1,
        },
        {
          field: 'insurancecompany',
          headerName: 'Insurance Company',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'policynumber',
          headerName: 'Policy Number',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'registerationnumber',
          headerName: 'Registration Number',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'registerationyear',
          headerName: 'Registration Year',
          flex: 1,
        },
        {
          field: 'insuranceexpiry',
          headerName: 'Insurance Expiry',
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

  useEffect(() => {
    if (startDate && endDate) {
      fetchUniqueValues(startDate, endDate);
    }
  }, [startDate, endDate]);

  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://autozone-8azp.onrender.com/getIsurance'
      );
      setCol([
        { field: 'id', headerName: 'ID', flex: 0.5 },
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'mobile',
          headerName: 'Phone Number',
          flex: 1,
        },
        {
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'model',
          headerName: 'Model',
          flex: 1,
        },
        {
          field: 'insurancecompany',
          headerName: 'Insurance Company',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'policynumber',
          headerName: 'Policy Number',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'registerationnumber',
          headerName: 'Registration Number',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'registerationyear',
          headerName: 'Registration Year',
          flex: 1,
        },
        {
          field: 'insuranceexpiry',
          headerName: 'Insurance Expiry',
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
        'https://autozone-8azp.onrender.com/duplicateInsurance'
      );

      // Process the response data to create rows with phoneNumber, model, and count
      const processedData = [];
      let idCounter = 1;

      res.data.data.forEach((item) => {
        processedData.push({
          id: idCounter++,
          phoneNumber: item.number,
          model: item.vehicle || 'N/A',
          count: item.count,
          date: item.date, // Adding the date field
        });
      });

      setCol([
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
        { field: 'model', headerName: 'Model', flex: 1 },
        { field: 'count', headerName: 'Count', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 }, // Adding the date column
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
        `https://autozone-8azp.onrender.com/insuranceUniqueEntries`
      );
      setCol([
        { field: 'id', headerName: 'ID', flex: 0.5 },
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'mobile',
          headerName: 'Phone Number',
          flex: 1,
        },
        {
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'model',
          headerName: 'Model',
          flex: 1,
        },
        {
          field: 'insurancecompany',
          headerName: 'Insurance Company',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'policynumber',
          headerName: 'Policy Number',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'registerationnumber',
          headerName: 'Registration Number',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'registerationyear',
          headerName: 'Registration Year',
          flex: 1,
        },
        {
          field: 'insuranceexpiry',
          headerName: 'Insurance Expiry',
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

  return (
    <>
      <Box m='20px'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Header
            title='Insurance'
            subtitle='List of Insurance data for Future Reference'
          />
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
              sx={{ mr: 2, backgroundColor: '#940004' }}
              onClick={handleDup}
            >
              Duplicates
            </Button>

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
    </>
  );
};

export default Insurance;
