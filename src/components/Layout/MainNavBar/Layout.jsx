import { Box } from '@chakra-ui/react';
import UpperNavBar from './UpperNavBar';
import LowerNavBar from './LowerNavBar';

export default function Layout({ children }) {
  return (
    <>
      <Box position="sticky" w="100%">
        <UpperNavBar />
        <LowerNavBar />
        {children}
      </Box>
    </>
  );
}
