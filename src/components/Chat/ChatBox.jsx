import { Divider, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import ChatBoxFooter from './ChatBoxFooter';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessages from './ChatBoxMessages';

export default function ChatBox({ listingId }) {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const getSelectedListing = async () => {
      if (listingId === null) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('listings')
          .select()
          .eq('listing_id', listingId)
          .single();
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
      <Flex flexDir="column" w="60%">
        <Text>No Chat Selected</Text>
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" w="60%">
      <ChatBoxHeader listingTitle={listing?.title} />
      <Divider />
      <ChatBoxMessages listingId={listingId} />
      <Divider />
      <ChatBoxFooter listingId={listingId} />
    </Flex>
  );
}
