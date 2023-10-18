import { Box, Button, useTheme } from "@mui/material";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import LooksOneIcon from "@mui/icons-material/LooksOne";

//import date range picker files
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
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
const OnRoadPrice = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

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
          'https://autozone-backend.onrender.com/getOnRoadPrice'
        );
        setCol([
          { field: 'id', headerName: 'ID', flex: 0.25 },
          {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
          },
          {
            field: 'email',
            headerName: 'Email',
            flex: 1.5,
          },
          {
            field: 'mobile',
            headerName: 'Phone Number',
            flex: 1,
            cellClassName: "phone-column--cell",
          },

          {
            field: 'vehicle',
            headerName: 'Vehicle',
            flex: 1,
          },
          {
            field: 'outlet',
            headerName: 'Outlet',
            flex: 1,
          },
          {
            field: 'enquiry',
            headerName: 'Enquiry',
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
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  async function fetchUniqueValues(startDate, endDate) {
    try {
      setLoading(true);
     

      const res = await axios.post(
        'https://autozone-backend.onrender.com/onRoadPriceRange',
        {
          startDate: startDate,
          endDate: endDate,
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
          cellClassName: "phone-column--cell",
        },

        {
          field: 'vehicle',
          headerName: 'Vehicle',
          flex: 1,
        },
        {
          field: 'outlet',
          headerName: 'Outlet',
          flex: 1,
        },
        {
          field: 'enquiry',
          headerName: 'Enquiry',
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

  // async function fetchData(newInputValue) {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(
  //       `https://autozone-8azp.onrender.com/getOnRoadPrice?date=${newInputValue}`
  //     );
  //     setCol([
  //       { field: 'id', headerName: 'ID', flex: 0.5 },
  //       {
  //         field: 'date',
  //         headerName: 'Date',
  //         flex: 1,
  //       },
  //       {
  //         field: 'time',
  //         headerName: 'Time',
  //         flex: 1,
  //       },
  //       {
  //         field: 'name',
  //         headerName: 'Name',
  //         flex: 1,
  //         cellClassName: 'name-column--cell',
  //       },

  //       {
  //         field: 'mobile',
  //         headerName: 'Phone Number',
  //         flex: 1,
  //       },
  //       {
  //         field: 'email',
  //         headerName: 'Email',
  //         flex: 1,
  //       },
  //       {
  //         field: 'vehicle',
  //         headerName: 'Vehicle',
  //         flex: 1,
  //       },
  //       {
  //         field: 'outlet',
  //         headerName: 'Outlet',
  //         flex: 1,
  //       },
  //       {
  //         field: 'enquiry',
  //         headerName: 'Enquiry',
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
  //   //if (inputValue === '') alert('Please select the date');
  //   //else
  //   fetchData(newInputValue);
  // };
  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://autozone-backend.onrender.com/getOnRoadPrice'
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
          cellClassName: "phone-column--cell",
        },
        {
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'vehicle',
          headerName: 'Vehicle',
          flex: 1,
        },
        {
          field: 'outlet',
          headerName: 'Outlet',
          flex: 1,
        },
        {
          field: 'enquiry',
          headerName: 'Enquiry',
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
        'https://autozone-backend.onrender.com/duplicateOnRoadPrice'
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
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 ,  cellClassName: "phone-column--cell",},
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
        `https://autozone-backend.onrender.com/onRoadPriceUniqueEntries`
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
          cellClassName: "phone-column--cell",
        },
        {
          field: 'email',
          headerName: 'Email',
          flex: 1,
        },
        {
          field: 'vehicle',
          headerName: 'Vehicle',
          flex: 1,
        },
        {
          field: 'outlet',
          headerName: 'Outlet',
          flex: 1,
        },
        {
          field: 'enquiry',
          headerName: 'Enquiry',
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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
    a.download = "onRoadPrice(Autozone).csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


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
            }
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
            title='On-Road Price'
            subtitle='List of On-Road Price for Future Reference'
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
          sx={{ backgroundColor: "#a22a2d", mr: 2,color: "white",  '&:hover': {
            backgroundColor: "#e0962a",
          }, }}
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
          sx={{ mr: 2, backgroundColor: "#a22a2d" , color: "white" ,  '&:hover': {
            backgroundColor: "#e0962a",
          },}}
          onClick={uniqueEntries}
        >
          {" "}
          <LooksOneIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#a22a2d",color: "white",  '&:hover': {
            backgroundColor: "#e0962a",
          }, }}
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
    backgroundColor: colors.sabooAutoColors[600],// Optional background color for headers
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
  '& .MuiDataGrid-sortIcon': {
    color:'white',
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
  '& .css-196n7va-MuiSvgIcon-root': {
    color:'white',
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

export default OnRoadPrice;
