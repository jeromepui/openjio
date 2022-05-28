import { Box, Button } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ListingManager from '../components/ListingManager/ListingManager';
import TitleBar from '../components/TitleBar/TitleBar';

export default function DashboardPage() {
  return (
    <>
      <TitleBar backButton={false} text="Dashboard"></TitleBar>
      <Box my="2" px="6">
        <Link to="/add-listing">
          <Button colorScheme="teal" leftIcon={<MdAdd />}>
            Add Listing
          </Button>
        </Link>
      </Box>
      <ListingManager />
    </>
  );
}
