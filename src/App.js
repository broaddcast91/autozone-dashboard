import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
// import Dashboard from './scenes/dashboard';
import Popup from './scenes/popup';
import RequestCall from './scenes/requestcall';
// import Team from "./scenes/team";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import OnRoadPrice from './scenes/onroadprice';
import Finance from './scenes/finance';
import Insurance from './scenes/insurance';
import BookAService from './scenes/bookaservice';
import ContactUs from './scenes/contactus/contactus';
// import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <Sidebar isSidebar={isSidebar} />
          <main className='content'>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path='/' element={<Popup />} />
              {/* <Route path="/team" element={<Team />} /> */}
              <Route path='/popup' element={<Popup />} />
              <Route path='/onroadprice' element={<OnRoadPrice />} />
              <Route path='/requestacall' element={<RequestCall />} />
              <Route path='/finance' element={<Finance />} />
              <Route path='/insurance' element={<Insurance />} />
              <Route path='/bookaservice' element={<BookAService />} />
              <Route path='/contactus' element={<ContactUs />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
