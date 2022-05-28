import { Box } from '@chakra-ui/react';
import TopNavBar from './TopNavBar';
import BottomNavBar from './BottomNavBar';

export default function NavBar() {
  return (
    <Box w="100vw">
      <TopNavBar />
      <BottomNavBar />
    </Box>
  );
}
