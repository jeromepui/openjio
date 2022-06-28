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
  Tooltip,
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
        <SimpleGrid columns={{ sm: '1', md: '4' }} spacing="4">
          {requests?.length > 0 ? (
            requests.map((request, index) => {
              return (
                <Box key={index}>
                  <Flex boxShadow="lg" h="200px" p="4" rounded="lg">
                    <Stack alignContent="left">
                      <Text fontSize="md" noOfLines="1">
                        Request to join:
                      </Text>
                      <Tooltip
                        label={request.listing_title}
                        placement="bottom-start"
                      >
                        <Text
                          color="black"
                          fontSize="xl"
                          fontWeight="700"
                          noOfLines="1"
                          maxW="300px"
                        >
                          {request.listing_title}
                        </Text>
                      </Tooltip>

                      <Text fontSize="md">Requested by:</Text>
                      <Text fontSize="xl" fontWeight="700">
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
                          size="sm"
                        >
                          Accept
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDeny(request)}
                          size="sm"
                        >
                          Decline
                        </Button>
                        <Link to={`/profile/${request.requester_id}`}>
                          <Button size="sm">View Profile</Button>
                        </Link>
                      </ButtonGroup>
                      <DeleteRequestDialog
                        cancelRef={cancelRef}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        request={request}
                        setShouldRefresh={setShouldRefresh}
                      />
                    </Stack>
                  </Flex>
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
