import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import Layout from '../components/Layout/Layout';
import ListingManager from '../components/Listings/ListingManager/ListingManager';
import TitleBar from '../components/Layout/TitleBar';

export default function ListingManagerPage() {
  return (
    <Layout>
      <TitleBar backButton={true} text="Manage your listings" />
      <Tabs orientation="vertical" p="2" variant="soft-rounded" width="300">
        <TabList>
          <Tab>Open</Tab>
          <Tab>Closed</Tab>
          <Tab>Joined</Tab>
        </TabList>
        <TabPanels height="100vh">
          <TabPanel>
            <ListingManager category="open" status="open" />
          </TabPanel>
          <TabPanel>
            <ListingManager category="closed" status="closed" />
          </TabPanel>
          <TabPanel>
            <ListingManager category="joined" />
            <Alert borderRadius="10" status="info" w="50%">
              <AlertIcon />
              <AlertTitle>Coming soon.</AlertTitle>
              <AlertDescription>
                You will be able to join listings soon!
              </AlertDescription>
            </Alert>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
