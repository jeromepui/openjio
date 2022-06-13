import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  getParticipantsByListing,
  leaveListing,
} from '../../utils/ListingParticipantUtils';
import { increaseSlots } from '../../utils/ListingUtils';

export default function ManageModal({
  isOpen,
  listing,
  onClose,
  setShouldRefresh,
}) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getParticipants = async () => {
      try {
        setLoading(true);
        const { data, error } = await getParticipantsByListing(
          listing.listing_id
        );
        if (error) throw error;

        setParticipants(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getParticipants();
  }, [listing.listing_id, refresh]);

  const handleRemoveParticipant = async (listingId, participantId) => {
    try {
      setLoading(true);
      const { error: participantError } = await leaveListing(
        listingId,
        participantId
      );
      if (participantError) throw participantError;

      const { error: incrementError } = await increaseSlots(listingId);
      if (incrementError) throw incrementError;

      setRefresh(prev => !prev);
      setShouldRefresh(prev => !prev);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      blockScrollOnMount={true}
      closeOnOverlayClick={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Participants</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            {loading ? (
              <Flex align="center" justify="center">
                <Spinner />
              </Flex>
            ) : participants?.length < 2 ? (
              <Text>No participants</Text>
            ) : (
              participants?.map((participant, index) => {
                if (participant.participant_id !== auth.user.id)
                  return (
                    <Stack
                      align="center"
                      direction="row"
                      justify="space-between"
                      key={index}
                    >
                      <Text>{participant.participant_username}</Text>
                      <Button
                        colorScheme="red"
                        onClick={() =>
                          handleRemoveParticipant(
                            participant.listing_id,
                            participant.participant_id
                          )
                        }
                      >
                        Remove
                      </Button>
                    </Stack>
                  );
                return <Text key={index}></Text>;
              })
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
