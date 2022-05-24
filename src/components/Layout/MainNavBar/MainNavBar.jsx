import React from 'react';
import { Box } from '@chakra-ui/react';
import UpperNavBar from './UpperNavBar';
import LowerNavBar from './LowerNavBar';

export default function MainNavBar() {
  return (
    <Box as="nav" position="fixed" w="full">
      <UpperNavBar />
      <LowerNavBar />
    </Box>
  );
}
