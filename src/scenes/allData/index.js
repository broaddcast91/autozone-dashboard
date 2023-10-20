import { Box, Button } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

//import date range picker files
// import { DemoContainer } from '@mui/x-da ate-pickers-pro/DateRangePicker';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import TextField from "@mui/material/TextField";
const AllData = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null   );

  const [col, setCol] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://autozone-backend.onrender.com/allData"
        );

        const unifiedData = res.data.data.map((item) => ({
          ...item,
          Name: item.Last_Name || item.name,
          "Phone Number": item.number || item.mobile || item.phone,
        }));

        setCol([
          { field: "id", headerName: "ID", flex: 0.5 },
          {
            field: "Name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
          },
          {
            field: "Phone Number",
            headerName: "Phone Number",
            flex: 1,
            cellClassName: "phone-column--cell",
          },
          {
            field: "leadFrom",
            headerName: "Lead From",
            flex: 1,
          },
          {
            field: "date",
            headerName: "Date",
            flex: 1,
          },
          {
            field: "time",
            headerName: "Time",
            flex: 1,
          },
        ]);

        setData(unifiedData);
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

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  

  async function fetchUniqueValues(startDate, endDate) {
    try {
      setLoading(true);
      // const formattedStartDate = new Date(startDate);
      // formattedStartDate.setDate(formattedStartDate.getDate() + 1);
      // const formattedStartDateString = formattedStartDate
      //   .toISOString()
      //   .slice(0, 10);

      // const formattedEndDate = new Date(endDate);
      // formattedEndDate.setDate(formattedEndDate.getDate() + 1);
      // const formattedEndDateString = formattedEndDate
      //   .toISOString()
      //   .slice(0, 10);

      const res = await axios.post(
        'https://autozone-backend.onrender.com/findDataInRangeInAllCollections',
        {
          startDate: startDate,
          endDate: endDate,
        }
      );
      const unifiedData = res.data.data.map((item) => ({
        ...item,
        Name: item.Last_Name || item.name,
        "Phone Number": item.number || item.mobile || item.phone,
      }));

      setCol([
        { field: "id", headerName: "ID", flex: 0.5 },
        {
          field: "Name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Phone Number",
          headerName: "Phone Number",
          flex: 1,
          cellClassName: "phone-column--cell",
        },
        {
          field: "leadFrom",
          headerName: "Lead From",
          flex: 1,
        },
        {
          field: "date",
          headerName: "Date",
          flex: 1,
        },
        {
          field: "time",
          headerName: "Time",
          flex: 1,
        },
      ]);;

      setData(unifiedData);
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
        'https://autozone-backend.onrender.com/allData'
      );
      const unifiedData = res.data.data.map((item) => ({
        ...item,
        Name: item.Last_Name || item.name,
        "Phone Number": item.number || item.mobile || item.phone,
      }));

      setCol([
        { field: "id", headerName: "ID", flex: 0.5 },
        {
          field: "Name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Phone Number",
          headerName: "Phone Number",
          flex: 1,
          cellClassName: "phone-column--cell",
        },
        {
          field: "leadFrom",
          headerName: "Lead From",
          flex: 1,
        },
        {
          field: "date",
          headerName: "Date",
          flex: 1,
        },
        {
          field: "time",
          headerName: "Time",
          flex: 1,
        },
      ]);

      setData(unifiedData);
      setLoading(false);
      setStartDate(null)
      setEndDate(null)
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleDup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://autozone-backend.onrender.com/findDuplicatesInAllCollections'
      );

      // Process the response data to create rows with phoneNumber, model, and count
      const processedData = [];
      let idCounter = 1;

      res.data.data.forEach((item) => {
        processedData.push({
          id: idCounter++,
          phoneNumber: item.number,
          model: item.vehicle || '',
          count: item.count,
          date: item.date, // Adding the date field
          leadFrom :item.leadFrom
        });
      });

      setCol([
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 , cellClassName: 'phone-column--cell', },
        { field: 'model', headerName: 'Model', flex: 1 },
        { field: 'leadFrom', headerName: 'leadFrom', flex: 1 },
        { field: 'count', headerName: 'Count', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 }, // Adding the date column
      ]);

      setData(processedData);
      setLoading(false);
      setStartDate(null)
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const uniqueEntries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://autozone-backend.onrender.com/findUniqueEntriesInAllCollections`
      );
      const unifiedData = res.data.data.map((item) => ({
        ...item,
        Name: item.Last_Name || item.name,
        "Phone Number": item.number || item.mobile || item.phone,
      }));

      setCol([
        { field: "id", headerName: "ID", flex: 0.5 },
        {
          field: "Name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Phone Number",
          headerName: "Phone Number",
          flex: 1,
          cellClassName: "phone-column--cell",
        },
        {
          field: "leadFrom",
          headerName: "Lead From",
          flex: 1,
        },
        {
          field: "date",
          headerName: "Date",
          flex: 1,
        },
        {
          field: "time",
          headerName: "Time",
          flex: 1,
        },
      ]);

      setData(unifiedData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    const csvData = [];
    const headers = col.map((column) => column.headerName);
    csvData.push(headers);

    newData.forEach((item) => {
      const row = col.map((column) => item[column.field]);
      csvData.push(row);
    });

    const csvContent = csvData.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "All_Data(Arena).csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Custom toolbar with the download button
  
const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <IconButton
          color="primary"
          onClick={handleDownloadCSV}
          sx={{
            marginLeft: "10px",
            backgroundColor: "white",
            fontSize: "14px",
            padding: "5px",
            minWidth: "auto",
            height: "25px",
            color:"#132a3c",
            "&:hover": {
              color: "#e0962a",
            },
          }}
        >
          <DownloadIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };

  return (
    <Box m="20px">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Header
          title="All Data"
          subtitle="data from all forms"
        />
        <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "10px" }}>
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ margin: "10px" }}
            />

            <TextField
              id="end-date"
              label="End Date"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ margin: "10px" }}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#a22a2d",
              mr: 2,
              color: "white",
              "&:hover": {
                backgroundColor: "#a22a2d",
              },
            }}
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
            variant="contained"
            color="primary"
            sx={{
              mr: 2,
              backgroundColor: "#a22a2d",
              color: "white",
              "&:hover": {
                backgroundColor: "#e0962a",
              },
            }}
            onClick={uniqueEntries}
          >
            {" "}
            <LooksOneIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#a22a2d",
              color: "white",
              "&:hover": {
                backgroundColor: "#e0962a",
              },
            }}
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
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: "white",
            // border: "1px solid #ccc", // Add a border to the table
          },

          "& .MuiDataGrid-columnHeader": {
            color: "white",
            backgroundColor: colors.sabooAutoColors[600], // Optional background color for headers
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.sabooAutoColors[400],
          },
          // "& .MuiDataGrid-footerContainer": {
          //   borderTop: "none",
          //   backgroundColor: colors.blueAccent[700],
          //   "& .MuiTypography-root": {
          //     color: "white", // Change the footer text color to white
          //   },
          // },
          "& .MuiCheckbox-root": {
            color: `${colors.sabooAutoColors[600]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text ": {
            color: `${colors.sabooAutoColors[600]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text:hover ": {
            color: `${colors.sabooAutoColors[800]} !important`,
          },
          "& .MuiDataGrid-sortIcon": {
            color: "white",
          },
          // "& .MuiDataGrid-cell": {
          //   //borderBottom: "none",
          //   backgroundColor: "white",
          //   borderBottom: "1px solid #ccc", // Add a border to table cells
          // },
          "& .phone-column--cell": {
            color: colors.sabooAutoColors[700],
            // backgroundColor: "white",
          },
          "& .css-196n7va-MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        {loading ? (
          <div>Processing, please wait...</div>
        ) : error ? (
          "Error ~ Something went wrong :)"
        ) : (
          <DataGrid
            rows={newData}
            columns={col.map((column) => ({
              ...column,
              renderCell: (params) => (
                <div
                  style={{
                    whiteSpace: "pre-wrap", // Enable word wrapping
                    overflow: "hidden", // Hide overflow content
                    textOverflow: "ellipsis", // Show ellipsis for overflow
                  }}
                >
                  {params.value}
                </div>
              ),
            }))}
            components={{ Toolbar: CustomToolbar }}
            sx={{
              backgroundColor: "white", // Set the background color to white
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default AllData;