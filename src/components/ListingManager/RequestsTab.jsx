import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DeleteRequestDialog from './DeleteRequestDialog';
import { useAuth } from '../../contexts/AuthContext';
import {
  checkSlotsAvailability,
  decreaseSlots,
} from '../../utils/ListingUtils';
import { addParticipant } from '../../utils/ListingParticipantUtils';
import {
  deleteRequest,
  getRequestsByListingOwner,
} from '../../utils/RequestUtils';

export default function RequestsTab({ shouldRefresh, setShouldRefresh }) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const getRequests = async () => {
      try {
        setLoading(true);
        const { data, error } = await getRequestsByListingOwner(auth.user.id);
        if (error) throw error;

        setRequests(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, [auth.user.id, shouldRefresh]);

  const handleApprove = async request => {
    try {
      const { result: isSlotAvailable, error: slotsError } =
        await checkSlotsAvailability(request.listing_id);
      if (slotsError) throw slotsError;

      if (!isSlotAvailable) {
        onOpen();
      } else {
        const participantId = uuidv4();

        const participant = {
          listing_participants_id: participantId,
          listing_id: request.listing_id,
          participant_id: request.requester_id,
          listing_title: request.listing_title,
          participant_username: request.requester_username,
          is_owner: false,
        };

        const { error: participantError } = await addParticipant(participant);
        if (participantError) throw participantError;

        const { error: deleteRequestError } = await deleteRequest(
          request.request_id
        );
        if (deleteRequestError) throw deleteRequestError;

        const { error: decrementError } = await decreaseSlots(
          participant.listing_id
        );
        if (decrementError) throw decrementError;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setShouldRefresh(prev => !prev);
    }
  };

  const handleDeny = async request => {
    try {
      const { error } = await deleteRequest(request.request_id);
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      setShouldRefresh(prev => !prev);
    }
  };

  return (
    <>
      {loading ? (
        <Flex grow="1" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <SimpleGrid columns="4" spacing="8">
          {requests?.length > 0 ? (
            requests.map((request, index) => {
              return (
                <Box boxShadow="lg" h="200px" key={index} p="4" rounded="lg">
                  <Stack
                    align={{ base: 'center', md: 'stretch' }}
                    textAlign={{ base: 'center', md: 'left' }}
                    mt={{ base: 4, md: 0 }}
                  >
                    <Text color="teal.500" fontSize="lg" fontWeight="bold">
                      Request to join
                    </Text>
                    <Text fontSize="md" fontWeight="500" my="1" noOfLines="1">
                      {request.listing_title}
                    </Text>
                    <Text fontSize="md" fontWeight="500" my="1" noOfLines="1">
                      Requested by:
                    </Text>
                    <Text fontSize="md" my="1" noOfLines="1">
                      {request.requester_username}
                    </Text>
                    <ButtonGroup>
                      <Button
                        bg="#02CECB"
                        color="white"
                        _hover={{
                          background: '#06837F',
                        }}
                        onClick={() => handleApprove(request)}
                      >
                        Accept
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeny(request)}
                      >
                        Decline
                      </Button>
                      <Link to={`/profile/${request.requester_id}`}>
                        <Button>View Profile</Button>
                      </Link>
                    </ButtonGroup>
                    <DeleteRequestDialog
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                      cancelRef={cancelRef}
                      request={request}
                      setShouldRefresh={setShouldRefresh}
                    />
                  </Stack>
                </Box>
              );
            })
          ) : (
            <Heading fontSize="2xl">You do not have any requests.</Heading>
          )}
        </SimpleGrid>
      )}
    </>
  );
}
