import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabase';
import CommunityPage from './pages/CommunityPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import ListingFormPage from './pages/ListingFormPage';
import ListingPage from './pages/ListingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import NavBar from './components/NavBar/NavBar';

const theme = extendTheme({
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
        <LoginPage />
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-listing" element={<ListingFormPage />} />
            <Route path="/listing/:id" element={<ListingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/dashboard/add-new-listing"
              element={<ListingFormPage />}
            />
          </Routes>
        </>
      )}
    </ChakraProvider>
  );
}
