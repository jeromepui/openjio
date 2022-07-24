import { Heading, Image, Text } from '@chakra-ui/react';

export default function Chat() {
  return (
    <>
      <Heading size="xl">Chat with shopping group</Heading>
      <Text fontSize="lg">
        A group chat will be automatically created for each listing.
        <br />
        <Image src="../../../chat.jpg" alt="Chat of OpenJio" />
        <br />
        To open up the group chat of a particular listing, find and select the
        listing’s title under the Chats column. <br /> <br />
        <Image
          src="../../../select-chat.jpg"
          alt="Chats column under Chat to select a Chat"
        />
        <br />
        Usernames of all participants of the shopping group will be listed in a
        column to the right of the main chat area. Clicking on any username will
        redirect the user to the profile page of the username. <br />
        <Image
          src="../../../chat-participants.jpg"
          alt="Shopping Group column under Chat"
        />
      </Text>
    </>
  );
}
