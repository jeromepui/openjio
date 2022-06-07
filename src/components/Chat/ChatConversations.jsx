import { Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase';
import ChatConversationsHeader from './ChatConversationsHeader';

export default function ChatConversations({ handleSelectListing }) {
  const auth = useAuth();
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const getListingsInvolved = async () => {
      try {
        const { data, error } = await supabase
          .from('listing_participants')
          .select()
          .eq('participant_id', auth.user.id);
        if (error) throw error;

        setListings(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getListingsInvolved();
  }, [auth.user.id]);

  return (
    <Flex bg="gray.100" flexDir="column" w="20%">
      <ChatConversationsHeader />
      <Divider />
      <Heading fontSize="lg" p="2">
        Listing Chats
      </Heading>
      <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="2">
        {listings?.map((listing, index) => {
          return (
            <Button
              key={index}
              onClick={e => handleSelectListing(listing.listing_id)}
            >
              <Flex justify="center" mb="2" p="2">
                <Text fontSize="lg" fontWeight="bold">
                  {listing.listing_title}
                </Text>
              </Flex>
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
}
