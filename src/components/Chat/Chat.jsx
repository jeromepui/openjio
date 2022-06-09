import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import ChatBox from './ChatBox';
import ChatConversations from './ChatConversations';
import ChatParticipants from './ChatParticipants';

export default function Chat() {
  const [listingId, setListingId] = useState(null);

  return (
    <Flex grow="1">
      <ChatConversations setListingId={setListingId} />
      <ChatBox listingId={listingId} />
      <ChatParticipants listingId={listingId} />
    </Flex>
  );
}
