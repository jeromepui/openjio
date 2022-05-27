import Layout from '../components/Layout/Layout';
import TitleBar from '../components/Layout/TitleBar';
import { Text, IconButton, Box, Flex, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdAdd, MdEdit } from 'react-icons/md';

export default function DashboardPage() {
  return (
    <Layout>
      <TitleBar backButton={false} text="Dashboard"></TitleBar>
      <Box my="2" px="6">
        <Flex justify="flex-start" gap="5">
          <Link to="/dashboard/add-listing">
            <VStack alignItems="center">
              <IconButton
                icon={<MdAdd aria-label="Add new listing" />}
                size="lg"
              />
              <Text fontSize="smaller">Add listing</Text>
            </VStack>
          </Link>
          <Link to="/dashboard/listing-manager">
            <VStack alignItems="center">
              <IconButton
                icon={<MdEdit aria-label="Manage listings" />}
                size="lg"
              />
              <Text fontSize="smaller">Manage listings</Text>
            </VStack>
          </Link>
        </Flex>
      </Box>
    </Layout>
  );
}
