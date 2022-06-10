import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../supabase';
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  checkSlotsAvailability,
  decreaseSlots,
  getListing,
} from '../../utils/ListingUtils';
import DeleteRequestDialog from './DeleteRequestDialog';
import { deleteRequest } from '../../utils/RequestUtils';

export default function RequestsTab({ shouldRefresh, setShouldRefresh }) {
  const auth = useAuth();
  const [requests, setRequests] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const renderBadge = async listingId => {
    try {
      const { data: listingData, error: listingDataError } = await getListing(
        listingId
      );
      if (listingDataError) throw listingDataError;
      return listingData.remaining_slots > 0 ? (
        <Badge
          colorScheme="green"
          justifyContent="center"
          variant="subtle"
          display="flex"
        >
          {listingData.remaining_slots} slots remaining{' '}
        </Badge>
      ) : (
        <Badge
          colorScheme="red"
          justifyContent="center"
          variant="subtle"
          display="flex"
          w="10"
        >
          {' '}
          FULL{' '}
        </Badge>
      );
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    const getRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('requests')
          .select()
          .eq('listing_owner_id', auth.user.id);
        if (error) throw error;

        setRequests(data);
      } catch (error) {
        alert(error.message);
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
        const listingParticipantsId = uuidv4();

        const listingParticipant = {
          listing_participants_id: listingParticipantsId,
          listing_id: request.listing_id,
          participant_id: request.requester_id,
          listing_title: request.listing_title,
          participant_username: request.requester_username,
        };

        const { error: listingParticipantError } = await supabase
          .from('listing_participants')
          .insert(listingParticipant);
        if (listingParticipantError) throw listingParticipantError;

        const { error: deleteRequestError } = await deleteRequest(
          request.request_id
        );
        if (deleteRequestError) throw deleteRequestError;

        const { error: decrementError } = await decreaseSlots(
          listingParticipant.listing_id
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
      const { error: deleteRequestError } = await deleteRequest(
        request.request_id
      );
      if (deleteRequestError) throw deleteRequestError;
    } catch (error) {
      alert(error.message);
    } finally {
      setShouldRefresh(prev => !prev);
    }
  };

  return (
    <Wrap spacing="30px">
      {requests?.length > 0 ? (
        requests.map((request, index) => {
          return (
            <WrapItem key={index}>
              <Box w="300px" h="200px" boxShadow="lg" p="2" rounded="lg">
                <Stack
                  align={{ base: 'center', md: 'stretch' }}
                  textAlign={{ base: 'center', md: 'left' }}
                  mt={{ base: 4, md: 0 }}
                >
                  <Text color="teal.500" fontSize="lg" fontWeight="bold">
                    Request To Join
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
                  {renderBadge(request.listingId)}
                  <HStack justify="flex-start">
                    <Button
                      bg="#02CECB"
                      color="white"
                      _hover={{
                        background: '#06837F',
                      }}
                      onClick={() => handleApprove(request)}
                    >
                      Approve
                    </Button>
                    <DeleteRequestDialog
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                      cancelRef={cancelRef}
                      request={request}
                      setShouldRefresh={setShouldRefresh}
                    />
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeny(request)}
                    >
                      Deny
                    </Button>
                    <Link to={`/profile/${request.requester_id}`}>
                      <Button>View Profile</Button>
                    </Link>
                  </HStack>
                </Stack>
              </Box>
            </WrapItem>
          );
        })
      ) : (
        <Heading fontSize="2xl">You do not have any requests.</Heading>
      )}
    </Wrap>
  );
}
