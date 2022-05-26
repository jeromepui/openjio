import { ChakraProvider, theme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import CommunityPage from './pages/CommunityPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import ListingFormPage from './pages/ListingFormPage'
import ListingManagerPage from './pages/ListingManagerPage';

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard/add-new-listing" element={<ListingFormPage />} />
          <Route path="/dashboard/listing-manager" element={<ListingManagerPage />} />
        </Routes>
      )}
    </ChakraProvider>
  );
}
