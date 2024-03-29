import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme , Tooltip} from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LogoutIcon from '@mui/icons-material/Logout';
// import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
// import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Tooltip title={title} placement="right" >
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={
          <Tooltip title={title} placement="bottom">
            {icon}
          </Tooltip>
        }
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    </Tooltip>
  );
};


const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box
    sx={{
      '& .pro-sidebar-inner': {
        background: `${colors.sabooAutoColors[600]} !important`,
        // height :"100vh"
      },
      '& .pro-icon-wrapper': {
        backgroundColor: 'transparent !important',
      },
      '& .pro-inner-item': {
        padding: '5px 35px 5px 20px !important',
      },
      '& .pro-inner-item:hover': {
        color: '#e0962a !important',
      },
      '& .pro-menu-item.active': {
        color: '#e0962a !important',
      },
    }}
    >
    <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
              >
                <Typography variant='h3' color={colors.sabooAutoColors[600][100]}>
                  {/* Saboo RKS */}
                  <img
                    alt='profile-user'
                    width='150px'
                    height='150px'
                    src={`../../assets/sabooautozone.webp`}
                    // style={{ cursor: 'pointer', borderRadius: '100%' }}
                  />
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{margin: '10px 0 20px 0',
              color: colors.grey[100],}} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center' >
               
              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h2'
                  color={colors.grey[100]}
                  fontWeight='bold'
                  sx={{ m: '10px 0 0 0' }}
                >
                 Autozone
                </Typography>
                
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Typography
              variant='h6'
              color={colors.grey[300]}
              sx={{ m: '15px 0 5px 20px' }}
            >
              Data
            </Typography>
            {/* <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Item
              title='Popup'
              to='/popup'
              icon={<DirectionsWalkIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='On-Road Price'
              to='/onroadprice'
              icon={<LocalAtmIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Request a Call'
              to='/requestacall'
              icon={<PhoneCallbackIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Finance'
              to='/finance'
              icon={<PriceChangeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Insurance'
              to='/insurance'
              icon={<CarCrashIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Book a Service'
              to='/bookaservice'
              icon={<CarRepairIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Contact Us'
              to='/contactus'
              icon={<ContactPhoneIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='All Data'
              to='/alldata'
              icon={<LeaderboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Log Out'
              to='/logout'
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
