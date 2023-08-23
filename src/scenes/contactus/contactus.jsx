import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';

import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import axios from 'axios';

//import date range picker files
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const ContactUs = () => {
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
          'https://autozone-backend.onrender.com/getContactus'
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
            field: 'email',
            headerName: 'Email',
            flex: 1,
          },
          {
            field: 'mobile',
            headerName: 'Phone Number',
            flex: 1,
          },
          {
            field: 'subject',
            headerName: 'Subject',
            flex: 1,
          },
          {
            field: 'desc',
            headerName: 'Description',
            flex: 1,
          },
          {
            field: 'outlet',
            headerName: 'Outlet',
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
        'https://autozone-backend.onrender.com/contactUsRange',
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
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'mobile',
          headerName: 'Phone Number',
          flex: 1,
        },
        {
          field: 'subject',
          headerName: 'Subject',
          flex: 1,
        },
        {
          field: 'desc',
          headerName: 'Description',
          flex: 1,
        },
        {
          field: 'outlet',
          headerName: 'Outlet',
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
        'https://autozone-backend.onrender.com/getContactus'
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
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'mobile',
          headerName: 'Phone Number',
          flex: 1,
        },
        {
          field: 'subject',
          headerName: 'Subject',
          flex: 1,
        },
        {
          field: 'desc',
          headerName: 'Description',
          flex: 1,
        },
        {
          field: 'outlet',
          headerName: 'Outlet',
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
        'https://autozone-backend.onrender.com/repeatedContactUs'
      );

      // Process the response data to create rows
      const processedData = res.data.data.map((item, index) => ({
        id: index + 1,
        date: item.date,
        phoneNumber: item.number,
        count: item.count,
        subject: item.subject,
      }));

      setCol([
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'date', headerName: 'Date', flex: 1 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
        { field: 'count', headerName: 'Count', flex: 1 },
        { field: 'subject', headerName: 'subject', flex: 1 },
        {},
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
        `https://autozone-backend.onrender.com/contactUsUniqueEntries`
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
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'mobile',
          headerName: 'Phone Number',
          flex: 1,
        },
        {
          field: 'subject',
          headerName: 'Subject',
          flex: 1,
        },
        {
          field: 'desc',
          headerName: 'Description',
          flex: 1,
        },
        {
          field: 'outlet',
          headerName: 'Outlet',
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

  //   { field: 'id', headerName: 'ID', flex: 0.5 },
  //   // { field: "registrarId", headerName: "Registrar ID" },
  //   {
  //     field: 'name',
  //     headerName: 'Name',
  //     flex: 1,
  //     cellClassName: 'name-column--cell',
  //   },
  //   // {
  //   //   field: "age",
  //   //   headerName: "Age",
  //   //   type: "number",
  //   //   headerAlign: "left",
  //   //   align: "left",
  //   // },
  //   {
  //     field: 'mobile',
  //     headerName: 'Phone Number',
  //     flex: 1,
  //   },
  //   {
  //     field: 'email',
  //     headerName: 'Email',
  //     flex: 1,
  //   },
  //   {
  //     field: 'program',
  //     headerName: 'Program',
  //     flex: 1,
  //   },
  //   {
  //     field: 'date',
  //     headerName: 'Date',
  //     flex: 1,
  //   },
  //   {
  //     field: 'time',
  //     headerName: 'Time',
  //     flex: 1,
  //   },
  //   // {
  //   //   field: "city",
  //   //   headerName: "City",
  //   //   flex: 1,
  //   // },
  //   // {
  //   //   field: "zipCode",
  //   //   headerName: "Zip Code",
  //   //   flex: 1,
  //   // },
  // ];

  return (
    <>
      <Box m='20px'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Header
            title='Contact Us'
            subtitle='List of people who contacted Autozone for Future Reference'
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

export default ContactUs;
