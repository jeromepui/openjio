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
      <Flex direction="column" grow="1" overflowY="scroll" p="2" w="100%">
        {listings?.map((listing, index) => (
          <Flex align="center" justify="center" key={index} my="2">
            <Button
              color="black"
              my="2"
              onClick={e => setListingId(listing.listing_id)}
              variant="link"
            >
              <Text fontSize="lg" fontWeight="bold">
                {listing.listing_title}
              </Text>
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
