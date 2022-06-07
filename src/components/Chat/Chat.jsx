import { Stack } from '@chakra-ui/react';
import { useState } from 'react';
import ChatBox from './ChatBox';
import ChatConversations from './ChatConversations';
import ChatParticipants from './ChatParticipants';

export default function Chat() {
  const [listingId, setListingId] = useState(null);

  const handleSelectListing = listingId => {
    setListingId(listingId);
  };

  return (
    <Stack direction="row" h="84vh" spacing="0">
      <ChatConversations handleSelectListing={handleSelectListing} />
      <ChatBox listingId={listingId} />
      <ChatParticipants listingId={listingId} />
    </Stack>
  );
}
