import './App.css';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useParams,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
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
import {EditInfoCardModal} from "./pages/alumnusDetails/components/edit_profile_modals/EditInfoCardModal";
import {EditBioCardModal} from "./pages/alumnusDetails/components/edit_profile_modals/EditBioCardModal";
import {EditExperienceCardModal} from "./pages/alumnusDetails/components/edit_profile_modals/EditExperienceCardModal";
import {EditEducationCardModal} from "./pages/alumnusDetails/components/edit_profile_modals/EditEducationCardModal";
import {EditContactCardModal} from "./pages/alumnusDetails/components/edit_profile_modals/EditContactCardModal";

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
  let location = useLocation();
  const background = location.state && location.state.background;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {authIsReady && (
          <AppLayout setQuery={setQuery} query={query}>
            <Routes location={background || location}>
              <Route exact path="/" element={user ? <Home query={query} setQuery={setQuery} /> : <Navigate to="/login" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
              <Route path="/alumni/:id" element={user ? <AlumnusDetails isEditable={false}/> : <Navigate to="/login" />} />
              <Route path="/alumni/:id/edit" element={<AlumnusDetails isEditable={true}/>} />
            </Routes>
            {background && (
                <Routes>
                  <Route path="/alumni/:id/edit/info-card" element={<EditInfoCardModal />} />
                  <Route path="/alumni/:id/edit/bio" element={<EditBioCardModal />} />
                  <Route path="/alumni/:id/edit/contact-info" element={<EditContactCardModal />} />
                  <Route path="/alumni/:id/edit/experience/:experienceID?" element={<EditExperienceCardModal />} />
                  <Route path="/alumni/:id/edit/education/:educationID?" element={<EditEducationCardModal />} />
                </Routes>
            )}
          </AppLayout>
      )}
    </ThemeProvider>
  );
}

export default App;
