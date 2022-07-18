import { Divider, Flex, Text, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getParticipantsByListing } from '../../utils/ListingParticipantUtils';

export default function ChatParticipants({ listingId }) {
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    if (listingId === null) return;
    const getParticipants = async () => {
      try {
        const { data, error } = await getParticipantsByListing(listingId);
        if (error) throw error;
        setParticipants(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getParticipants();
  }, [listingId]);

  if (listingId === null) return;

  return (
    <Flex direction="column" w="20%">
      <Flex p="2">
        <Text fontSize="lg" fontWeight="500">
          Shopping group members
        </Text>
      </Flex>
      <Divider />
      {participants?.map((participant, index) => (
        <Link key={index} to={`/profile/${participant.participant_id}`}>
          <Button ml="5%" mt="3%">
            {participant.participant_username}
          </Button>
        </Link>
      ))}
    </Flex>
  );
}
