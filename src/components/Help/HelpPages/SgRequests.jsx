import React from 'react';
import { Stack, Heading, Text, Image, Button } from '@chakra-ui/react';

export default function SgRequests() {
  return (
    <Stack alignContent="flex-start" mt="1%" maxW="75vw">
      <Heading size="xl">Manage join listing requests </Heading>
      <Text fontSize="xl">
        You can view requests to join a listing you created under Request tab in
        dashboard. <br /> <br />
        <Image
          src="../../../request-tab.jpg"
          alt="Request tab of the dashboard"
        />
        To allow the requester to join the stated listing, click on
        <Button
          bg="#02CECB"
          color="white"
          _hover={{
            cursor: 'initial',
          }}
          _active={{}}
          size="sm"
          ml="0.5%"
          mr="0.5%"
        >
          Accept
        </Button>
        . This adds the user into the shopping group of the listing. On the
        contrary, clicking on
        <Button
          colorScheme="red"
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="0.5%"
          mr="0.5%"
          size="sm"
        >
          Decline
        </Button>
        removes the requests. <br /> <br />
        Clicking on
        <Button
          _hover={{ cursor: 'initial' }}
          _active={{}}
          ml="0.5%"
          mr="0.5%"
          size="sm"
        >
          View Profile
        </Button>
        will redirect you to the requester’s profile page.
      </Text>
    </Stack>
  );
}
