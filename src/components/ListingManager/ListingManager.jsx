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
import ListingManager from './ListingManagerTab';

export default function ListingManagerPage() {
  return (
    <Tabs orientation="vertical" p="6" variant="soft-rounded">
      <TabList>
        <Tab>Open</Tab>
        <Tab>Closed</Tab>
        <Tab>Joined</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ListingManager category="open" status="open" />
        </TabPanel>
        <TabPanel>
          <ListingManager category="closed" status="closed" />
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
