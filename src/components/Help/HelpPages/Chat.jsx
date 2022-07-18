import React from 'react';
import { Stack, Heading, Text, Image, } from '@chakra-ui/react';

export default function Chat() {
  return (
    <Stack alignContent="flex-start" mt="1%" maxW="75vw">
      <Heading size="xl">Chat with shopping group </Heading>
      <Text fontSize="xl">
        Each shopping group in OpenJio will automatically have a group chat
        created for them. <br /> <br />
        To access the group chat, navigate to the chat page by selecting Chat on
        the navigation bar. <br /> <br />{' '}
        <Image src="../../../chat.jpg" alt="Chat of OpenJio" />
        <br /> <br />
        To open up the group chat of a particular listing, find and select the
        listing’s title under the Chats column. <br /> <br />
        <Image
          src="../../../select-chat.jpg"
          alt="Chats column under Chat to select a Chat"
        />
        <br /> <br />
        Usernames of all participants of the shopping group will be listed in a
        column to the right of the main chat area. Clicking on any username will
        redirect the user to the profile page of the username. <br /> <br />
        <Image
          src="../../../chat-participants.jpg"
          alt="Shopping Group column under Chat"
        />
      </Text>
    </Stack>
  );
}
