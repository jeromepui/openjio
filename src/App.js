import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabase';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import ListingFormPage from './pages/ListingFormPage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';
import ChatPage from './pages/ChatPage';
import NavBar from './components/NavBar/NavBar';

const theme = extendTheme({
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  components: { Button: { baseStyle: { _focus: { boxShadow: 'none' } } } },
});

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {!session ? (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-listing" element={<ListingFormPage />} />
            <Route path="/listing/:id" element={<ListingDetailsPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </>
      )}
    </ChakraProvider>
  );
}
