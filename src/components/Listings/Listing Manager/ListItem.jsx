import React from 'react';
import { VStack, Box } from '@chakra-ui/react';
import ListingInfoCard from './ListingInfoCard';
import ListingCardActionBar from './ListingCardActionBar';

export default function ListItem(props) {
  return (
    <VStack
      height="auto"
      marginBottom="2vw"
      bg="white"
      onClick={e => console.log('Clicked')}
      paddingBottom="5%"
      paddingTop="5%"
      borderRadius="3vw"
    >
      <Box>
        <ListingInfoCard listing={props.listing} />
        <ListingCardActionBar category={props.category} />
      </Box>
    </VStack>
  );
}
