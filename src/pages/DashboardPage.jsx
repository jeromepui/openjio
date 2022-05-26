import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBar from '../components/Layout/MainNavBar/TitleBar';
import { useContext, useEffect } from 'react';
import { Text, IconButton, Box, Flex, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import { RiEditBoxLine } from 'react-icons/ri'

export default function DashboardPage() {
  return (
    <Layout>
      <TitleBar backButton={false} text="Dashboard"></TitleBar>
      <Box bgColor="teal.300" my="2" pl="4" py="2">
        <Text display="block" fontWeight="bold" mb="2" width="100vw">
          Quick Tools
        </Text>
        <Flex justify="flex-start" gap="5%">
          <Link to="/dashboard/add-listing">
            <VStack alignItems="center">
              <IconButton
                icon={<GrAddCircle aria-label="Add new listing" />}
                size="lg"
              />
              <Text fontSize="smaller">Add listing</Text>
            </VStack>
          </Link>
          <Link to="/dashboard/listing-manager">
            <VStack alignItems="center">
              <IconButton
                icon={<RiEditBoxLine aria-label="Manage listings" />}
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
