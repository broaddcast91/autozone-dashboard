import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
// import { mockDataContacts } from "../../data/mockData";
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BookAService = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          'https://autozone-8azp.onrender.com/getService'
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
            field: 'outlet',
            headerName: 'Outlet',
            flex: 1,
          },
          {
            field: 'pick_up',
            headerName: 'Pick Up',
            flex: 1,
            cellClassName: 'name-column--cell',
          },
          {
            field: 'vehicle',
            headerName: 'Vehicle',
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

  async function fetchData() {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://autozone-8azp.onrender.com/getService?date=${inputValue}`
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
          field: 'outlet',
          headerName: 'Outlet',
          flex: 1,
        },
        {
          field: 'pick_up',
          headerName: 'Pick Up',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'vehicle',
          headerName: 'Vehicle',
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
  const handleRemoveDuplicates = () => {
    if (inputValue === '') alert('Please select the date');
    else fetchData();
  };
  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://autozone-8azp.onrender.com/getService'
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
          field: 'outlet',
          headerName: 'Outlet',
          flex: 1,
        },
        {
          field: 'pick_up',
          headerName: 'Pick Up',
          flex: 1,
          cellClassName: 'name-column--cell',
        },
        {
          field: 'vehicle',
          headerName: 'Vehicle',
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
        'https://autozone-8azp.onrender.com/dupesService'
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

  // const handleDup = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(
  //       'https://eurokids.onrender.com/dupilicateEnquiries'
  //     );

  //     setCol([
  //       { field: 'id', headerName: 'ID', flex: 0.5 },
  //       {
  //         field: 'date',
  //         headerName: 'Date',
  //         flex: 1,
  //       },
  //       {
  //         field: 'phoneNumber',
  //         headerName: 'Phone Number',
  //         flex: 1,
  //       },
  //       {
  //         field: 'count',
  //         headerName: 'Count',
  //         flex: 1,
  //       },
  //     ]);
  //     setData(res.data.data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //     setLoading(false);
  //   }
  // };

  // const columns = [
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
            title='Book a Service'
            subtitle='List of Vehicle Service requests for Future Reference'
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant='contained'
              color='primary'
              sx={{ mr: 2, backgroundColor: '#b31b1b' }}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{ backgroundColor: '#b31b1b' }}
              onClick={handleDup}
            >
              Duplicates Entries
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{ ml: 2, backgroundColor: '#b31b1b' }}
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
                backgroundColor: '#b31b1b',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                padding: '8px',
              }}
            />
          </div>
          {/* <div style={{ display: 'flex' }}>
            <div>
              <Button
                variant='contained'
                color='primary'
                sx={{ mr: 4, mb: 5 }}
                style={{ backgroundColor: '#3a3e4d' }}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant='contained'
                color='primary'
                sx={{ mr: 4, mb: 5 }}
                style={{ backgroundColor: '#3a3e4d' }}
                onClick={handleDup}
              >
                Duplicates Entries
              </Button>
            </div>
            <div>
              <Button
                variant='contained'
                color='primary'
                sx={{ mb: 2 }}
                style={{ backgroundColor: '#b31b1b' }}
                onClick={handleRemoveDuplicates}
              >
                Unique
              </Button>
              <div>
                <input
                  type='date'
                  required
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{
                    marginRight: '16px',
                    backgroundColor: '#3a3e4d',
                    color: 'white',
                    borderRadius: '8px',
                    border: 'none',
                    padding: '8px',
                  }}
                />
              </div>
            </div>
          </div> */}
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
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
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
    </>
  );
};

export default BookAService;
