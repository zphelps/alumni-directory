import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import { useAuthContext } from './hooks/useAuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import AlumnusDetails from './pages/alumnusDetails/AlumnusDetails';
import { createTheme } from '@mui/material/styles';
import { pink, purple } from '@mui/material/colors';
import AppLayout from './components/AppLayout';
import { alpha } from '@mui/material/styles';
import { LicenseInfo } from '@mui/x-license-pro';

LicenseInfo.setLicenseKey('103fcbf801e45b441ba49d79f5177eeeTz01Nzk1NCxFPTE3MDU2MzgzNTc5OTMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#c63527',
      dark: '#8a251b',
      light: '#d15d52',
    },
    secondary: {
      main: '#35454f',
      dark: '#253037',
      light: '#5d6a72',
    },
  },
})


function App() {
  const { authIsReady, user } = useAuthContext()
  const [query, setQuery] = useState('')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {authIsReady && (
        <BrowserRouter>
          {/* <Routes>
            <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/alumni/:id" element={user ? <AlumnusDetails /> : <Navigate to="/login" />} />
          </Routes> */}
          <AppLayout setQuery={setQuery} query={query}>
            <Routes>
              <Route exact path="/" element={user ? <Home query={query} setQuery={setQuery} /> : <Navigate to="/login" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
              <Route path="/alumni/:id" element={user ? <AlumnusDetails /> : <Navigate to="/login" />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}

export default App;
