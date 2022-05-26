import Layout from '../components/Layout/MainNavBar/Layout';
import TitleBarContext from '../contexts/TitleBarContext';
import { useContext, useEffect } from 'react';
import { Text, IconButton, Box, Flex, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import { RiEditBoxLine } from 'react-icons/ri'

export default function DashboardPage() {
  const TBarContext = useContext(TitleBarContext);
  useEffect(() => {
    TBarContext.toggleBackButton(false);
    TBarContext.changeTitle('Your dashboard');
  });

  return (
    <Layout>
      <Box paddingLeft="3%" paddingBottom="2%" bgColor="teal.300">
        <Text display="block" width="100vw" marginBottom="1%" fontWeight="bold">
          Quick Tools
        </Text>
        <Flex justify="flex-start" gap="5%">
          <Link to="/dashboard/add-new-listing">
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
