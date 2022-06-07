import { Divider, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

export default function ChatParticipants({ listingId }) {
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    const getParticipants = async () => {
      try {
        if (listingId === null) {
          return;
        }

        const { data, error } = await supabase
          .from('listing_participants')
          .select()
          .eq('listing_id', listingId);
        if (error) throw error;

        setParticipants(data);
      } catch (error) {
        alert(error.message);
      }
    };
    getParticipants();
  }, [listingId]);

  if (listingId === null) {
    return (
      <Flex flexDir="column" w="20%">
        <Text>No Chat Selected</Text>
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" w="20%">
      <Flex p="2">
        <Text fontSize="lg" fontWeight="bold">
          Participants
        </Text>
      </Flex>
      <Divider />
      {participants?.map((participant, index) => {
        return (
          <Text fontSize="lg" key={index} p="2">
            {participant.participant_username}
          </Text>
        );
      })}
    </Flex>
  );
}
