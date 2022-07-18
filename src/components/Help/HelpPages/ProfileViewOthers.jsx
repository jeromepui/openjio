import React from 'react';
import { Stack, Heading, Text, Image, Button } from '@chakra-ui/react';

export default function ProfileViewOthers() {
  return (
    <Stack alignContent="flex-start" mt="1%" maxW="75vw">
      <Heading size="xl">View others' profile </Heading>
      <Text fontSize="xl">
        Profile pages of other users are similar to a user's own profile page.
        The only difference is that the review and rating function is enabled.
        <br /> <br />
        <Image
          src="../../../other-profile.jpg"
          alt="Other user's profile page"
        />
        At the moment, OpenJio does not provide a direct method to search up
        another user via their username and view their profile picture. However,
        there are still ways to view the profile of another user. Here we list
        down three ways to navigate to another user's profile page.
        <br /> <br />
        <Heading size="md"> i) Through listing details page from home </Heading>
        To access details page of a listing, select any listing on home page. At
        the bottom of the page, in the <i>Created by</i> field, the username of the
        listing creator will appear in the form of a button.
        <br /> <br />
        <Image
          src="../../../created-by.jpg"
          alt="Username button on listing details page"
        />
        <br /> <br />
        Click on
        <Button
          _hover={{
            cursor: 'initial',
          }}
          _active={{}}
          size="sm"
          ml="1%"
          mr="1%"
        >
          Username
        </Button>
        to visit the listing creator's profile page.
        <br /> <br />
        <Heading size="md"> ii) Through Requests tab of dashboard </Heading>
        Under Requests tab, click on{' '}
        <Button
          _hover={{
            cursor: 'initial',
          }}
          _active={{}}
          size="sm"
          ml="1%"
          mr="1%"
        >
          View profile
        </Button>
        to visit the profile page of the requester.
        <br /> <br />
        <Image
          src="../../../request-card.jpg"
          alt="Request card under Request tab in dashboard"
        />
        <br /> <br />
        <Heading size="md"> iii) Through Chat </Heading>
        In the <i>Shopping group members</i> column, a user may click on the
        usernames, which appear as buttons, to visit the profile page of the
        selected user.
        <br /> <br />
        <Image
          src="../../../chat-participants.jpg"
          alt="Shopping group participants column in chat"
        />
      </Text>
    </Stack>
  );
}
