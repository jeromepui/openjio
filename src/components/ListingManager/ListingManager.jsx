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
import { useState } from 'react';
import ListingManagerTab from './ListingManagerTab';
import RequestsTab from './RequestsTab';

export default function ListingManager() {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  return (
    <Tabs px="6" variant="enclosed">
      <TabList>
        <Tab _focus={{ boxShadow: 'none' }}>Open</Tab>
        <Tab _focus={{ boxShadow: 'none' }}>Closed</Tab>
        <Tab _focus={{ boxShadow: 'none' }}>Joined</Tab>
        <Tab _focus={{ boxShadow: 'none' }}>Requests</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ListingManagerTab
            category="open"
            status="open"
            shouldRefresh={shouldRefresh}
            setShouldRefresh={setShouldRefresh}
          />
        </TabPanel>
        <TabPanel>
          <ListingManagerTab
            category="closed"
            status="closed"
            shouldRefresh={shouldRefresh}
            setShouldRefresh={setShouldRefresh}
          />
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
        <TabPanel>
          <RequestsTab
            shouldRefresh={shouldRefresh}
            setShouldRefresh={setShouldRefresh}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
