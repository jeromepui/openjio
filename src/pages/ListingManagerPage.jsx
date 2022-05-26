import { Tab, TabList, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react';
import TitleBarContext from '../contexts/TitleBarContext';
import { useContext, useEffect } from 'react';
import Layout from '../components/Layout/MainNavBar/Layout';
import { useState } from 'react';
import ListingManagerSlider from '../components/Listings/Listing Manager/ListingManagerSlider';

export default function ListingManagerPage() {
  const TBarContext = useContext(TitleBarContext);
  const [category, setCategory] = useState('open');
  useEffect(() => {
    TBarContext.toggleBackButton(true);
    TBarContext.changeTitle('Manage your listings here');
  });

  return (
    <Layout>
      <Tabs variant="enclosed" orientation="vertical" isFitted>
        <TabList width="10%" bgColor="lightblue">
          <Tab
            _selected={{ bgColor: 'white' }}
            onClick={() => {
              setCategory('open');
            }}
          >
            Open
          </Tab>
          <Tab
            _selected={{ bgColor: 'white' }}
            onClick={() => {
              setCategory('closed');
            }}
          >
            Closed
          </Tab>
          <Tab
            _selected={{ bgColor: 'white' }}
            onClick={() => {
              setCategory('joined');
            }}
          >
            Joined
          </Tab>
          <Tab
            _selected={{ bgColor: 'white' }}
            onClick={() => {
              setCategory('followed');
            }}
          >
            Followed
          </Tab>
        </TabList>
        <TabPanels bgColor="telegram.50" height="100vh">
          <TabPanel>
            <ListingManagerSlider category={category} />
          </TabPanel>
          <TabPanel>
            <ListingManagerSlider category={category} />
          </TabPanel>

          <TabPanel>
            <ListingManagerSlider category={category} />
          </TabPanel>

          <TabPanel>
            <ListingManagerSlider category={category} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
