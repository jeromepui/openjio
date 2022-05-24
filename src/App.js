import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CommunityPage from './pages/CommunityPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainNavBar from './components/Layout/MainNavBar/MainNavBar';
import TestPage from './pages/TestPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box>
          <MainNavBar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/" element={<TestPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </Box>
        
      </Router>
    </ChakraProvider>
  );
}

export default App;
