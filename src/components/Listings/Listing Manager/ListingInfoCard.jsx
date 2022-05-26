import { VStack, Text, HStack } from '@chakra-ui/react';
import React from 'react';

export default function ListingInfoCard(props) {
  const { website, title, slots, type, desc } = props.listing;
  return (
    <VStack
      width="40vw"
      align="flex-start"
      spacing="0"
      height="auto"
      marginBottom="5%"
    >
      <Text fontWeight="bold" fontSize="2xl">
        {' '}
        {title}{' '}
      </Text>
      <HStack>
        <Text display="inline-block"> website: </Text>
        <Text display="inline-block" fontStyle="italic">
          {website}
        </Text>
      </HStack>

      <HStack>
        <Text display="inline-block"> slots available:</Text>{' '}
        <Text display="inline-block" fontStyle="italic">
          {' '}
          {slots}{' '}
        </Text>
      </HStack>
      <HStack>
        <Text display="inline-block"> type of listing: </Text>{' '}
        <Text display="inline-block" fontStyle="italic">
          {type === 'bundleDeal' ? 'bundle deal' : 'minimum spending'}{' '}
        </Text>
      </HStack>
      <HStack>
        <Text display="inline-block"> description:</Text>{' '}
        <Text display="inline-block" fontStyle="italic">
          {' '}
          {desc}{' '}
        </Text>
      </HStack>
    </VStack>
  );
}
