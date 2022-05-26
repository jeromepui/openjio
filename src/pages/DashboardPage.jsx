import { Text, IconButton, Box } from '@chakra-ui/react';
import { GrAddCircle } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBar from '../components/Layout/MainNavBar/TitleBar';

export default function DashboardPage() {
  return (
    <Layout>
      <TitleBar backButton={false} text="Dashboard"></TitleBar>
      <Box bgColor="teal.300" my="2" pl="4" py="2">
        <Text display="block" fontWeight="bold" mb="2" width="100vw">
          Quick Tools
        </Text>
        <Link to="/dashboard/add-listing">
          <IconButton
            icon={<GrAddCircle aria-label="Add new listing" />}
            mb="2"
          />
        </Link>
      </Box>
    </Layout>
  );
}
