import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getListingsByParticipant } from '../../utils/ListingParticipantUtils';

export default function ChatConversations({ setListingId }) {
  const auth = useAuth();
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const getListings = async () => {
      try {
        const { data, error } = await getListingsByParticipant(auth.user.id);
        if (error) throw error;
        setListings(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getListings();
  }, [auth.user.id]);

  return (
    <Flex direction="column" w="20%">
      <Text fontSize="lg" fontWeight="500" p="2">
        Chats
      </Text>
      <Divider />
      <Flex direction="column" h="80vh" overflowY="scroll" p="2">
        {listings?.map((listing, index) => (
          <Button
            key={index}
            mb="4"
            onClick={e => setListingId(listing.listing_id)}
            overflow="hidden"
            size="lg"
          >
            {listing.listing_title}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}
