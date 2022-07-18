import React from 'react';
import { Stack, Heading, Text, Image, Icon } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ListingsDelete() {
  return (
    <Stack alignContent="flex-start" mt="1%" maxW="75vw">
      <Heading size="xl">Delete listing</Heading>
      <Text fontSize="xl">
        To delete a listing, head to either Open or Closed tab in the dashboard
        and click on the menu button{' '}
        <Icon as={BsThreeDotsVertical} ml="8px" mr="8px" /> in the top right
        corner of the listing card in question. Select Delete under the menu
        that appears and a modal will pop up asking for confirmation. <br />
        <br />
        <Image
          src="../../../delete-listing-modal.jpg"
          alt="A popup to confirm action to delete listing"
        />
        <br /> Deleted lisings will be immediately removed from home and the dashboard.
      </Text>
    </Stack>
  );
}
