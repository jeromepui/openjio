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
import ListingManagerTab from './ListingManagerTab';
import RequestsTab from './RequestsTab';

export default function ListingManagerPage() {
  return (
    <Tabs orientation="vertical" p="6" variant="soft-rounded">
      <TabList>
        <Tab>Open</Tab>
        <Tab>Closed</Tab>
        <Tab>Requests</Tab>
        <Tab>Joined</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ListingManagerTab category="open" status="open" />
        </TabPanel>
        <TabPanel>
          <ListingManagerTab category="closed" status="closed" />
        </TabPanel>
        <TabPanel>
          <RequestsTab />
        </TabPanel>
        <TabPanel>
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
  );
}
