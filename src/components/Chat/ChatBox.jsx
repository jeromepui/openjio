import { Divider, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ChatBoxFooter from './ChatBoxFooter';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessages from './ChatBoxMessages';
import { getListing } from '../../utils/ListingUtils';

export default function ChatBox({ listingId }) {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const getSelectedListing = async () => {
      if (listingId === null) return;

      try {
        const { data, error } = await getListing(listingId);
        if (error) throw error;

        setListing(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getSelectedListing();
  }, [listingId]);

  if (listingId === null) {
    return (
      <Flex align="center" justify="center" w="80%">
        <Text>No chat selected</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" w="60%">
      <ChatBoxHeader listingTitle={listing?.title} />
      <Divider />
      <ChatBoxMessages listingId={listingId} />
      <Divider />
      <ChatBoxFooter listingId={listingId} />
    </Flex>
  );
}
