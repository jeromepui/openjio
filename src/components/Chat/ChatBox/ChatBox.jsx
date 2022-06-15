import { Divider, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ChatBoxFooter from './ChatBoxFooter';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessages from './ChatBoxMessages';
import { getListing } from '../../../utils/ListingUtils';

export default function ChatBox({ listingId }) {
  const [listingTitle, setListingTitle] = useState(null);

  useEffect(() => {
    if (listingId === null) return;
    const getListingTitle = async () => {
      try {
        const { data, error } = await getListing(listingId);
        if (error) throw error;
        setListingTitle(data.title);
      } catch (error) {
        alert(error.message);
      }
    };
    getListingTitle();
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
      <ChatBoxHeader listingTitle={listingTitle} />
      <Divider />
      <ChatBoxMessages listingId={listingId} />
      <Divider />
      <ChatBoxFooter listingId={listingId} />
    </Flex>
  );
}
