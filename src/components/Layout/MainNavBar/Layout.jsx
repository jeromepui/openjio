import UpperNavBar from './UpperNavBar';
import LowerNavBar from './LowerNavBar';
import { Box } from '@chakra-ui/react';
import TitleBar from './TitleBar';

export default function Layout(props) {
  return (
    <>
      <Box
        position="sticky"
        top="0"
        left="0"
        w="100%"
        h="100vh"
        overflowY="auto"
      >
        <UpperNavBar />
        <LowerNavBar />
        <TitleBar />
        {props.children}
      </Box>
    </>
  );
}
