import { Divider, Flex, Text } from '@chakra-ui/react';
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
          Shopping Group
        </Text>
      </Flex>
      <Divider />
      {participants?.map((participant, index) => (
        <Link key={index} to={`/profile/${participant.participant_id}`}>
          <Text _hover={{ textDecoration: 'underline' }} fontSize="lg" p="2">
            {participant.participant_username}
          </Text>
        </Link>
      ))}
    </Flex>
  );
}
