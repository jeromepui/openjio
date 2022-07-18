import { Flex } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { useAuth } from './contexts/AuthContext';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import ListingFormPage from './pages/ListingFormPage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

export default function App() {
  const auth = useAuth();

  return (
    <Router>
      {!auth.user ? (
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      ) : (
        <Flex direction="column" h="100vh">
          <NavBar />
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-listing" element={<ListingFormPage />} />
            <Route path="/listing/:id" element={<ListingDetailsPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/search/:search" element={<SearchPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </Flex>
      )}
    </Router>
  );
}
