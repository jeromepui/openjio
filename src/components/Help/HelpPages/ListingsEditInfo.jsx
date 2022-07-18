import React from 'react';
import { Stack, Heading, Text, Image, Icon, Button } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ListingsEditInfo() {
  return (
    <Stack alignContent="flex-start" mt="1%" maxW="75vw">
      <Heading size="xl">Edit listing information</Heading>
      <Text fontSize="xl">
        To edit information of an existing listing, head to either Open or
        Closed tab in the dashboard and click on the menu button{' '}
        <Icon as={BsThreeDotsVertical} ml="8px" mr="8px" /> in the top right
        corner of the listing card in question. Select <i>Edit</i> under the
        menu that appears and a form will show up. You will find the fields of
        this form pre-filled with the original details of the listing as such:{' '}
        <br /> <br />
        <Image
          src="../../../edit-listing-form.jpg"
          alt="Edit form of a listing under the dashboard"
        />
        <br /> After making any changes, clicking on{' '}
        <Button
          bg="#02CECB"
          color="white"
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="0.5%"
          mr="0.5%"
          size="sm"
        >
          Save Changes
        </Button>{' '}
        will immediately update the info of the listing. <br />
        <br />
        Note that we do not allow changing the number of slots available for the
        listing after it is created.
      </Text>
    </Stack>
  );
}
