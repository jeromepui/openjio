import {
  Box,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import RequestButton from '../components/ListingDetails/RequestButton';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import { getListing, getListingOwnerUsername } from '../utils/ListingUtils';
import { userJoinedListing } from '../utils/RequestUtils';
import { getUserProfile } from '../utils/UserUtils';

export default function ListingPage() {
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { id: listingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);
  const [requested, setRequested] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const getListingData = async () => {
      try {
        setLoading(true);

        const { data: listingData, error: listingError } = await getListing(
          listingId
        );
        if (listingError) throw listingError;
        setListing(listingData);

        const { data: userData, error: userError } =
          await getListingOwnerUsername(listingData.created_by);
        if (userError) throw userError;
        setUser(userData);

        const { data: listingParticipantData, error: listingParticipantError } =
          await supabase
            .from('listing_participants')
            .select()
            .match({ listing_id: listingId, participant_id: auth.user.id });
        if (listingParticipantError) throw listingParticipantError;

        if (listingParticipantData.length > 0) {
          setJoined(true);
        }

        const { data: requestData, error: requestError } =
          await userJoinedListing(listingData.listing_id, auth.user.id);
        if (requestError) throw requestError;

        if (requestData.length > 0) {
          setRequested(true);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getListingData();
  }, [auth.user, listingId]);

  const handleRequest = async () => {
    try {
      const requestId = uuidv4();

      const { data: userData, error: userError } = await getUserProfile(
        auth.user.id
      );
      if (userError) throw userError;

      const request = {
        request_id: requestId,
        listing_id: listingId,
        listing_owner_id: listing.created_by,
        listing_title: listing.title,
        requester_id: auth.user.id,
        requester_username: userData.username,
      };

      const { error: requestError } = await supabase
        .from('requests')
        .insert(request);
      if (requestError) throw requestError;
    } catch (error) {
      alert(error.message);
    } finally {
      toast({
        title: 'Success!',
        description: 'Your request has been sent!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate('/');
    }
  };

  return (
    <Box px="6" py="4">
      {loading ? (
        <Flex align="center" justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Stack spacing="4">
          <Heading fontWeight="700" fontSize="4xl">
            {listing.title}
          </Heading>
          <Text fontSize="2xl" fontWeight="500">
            Listing Details
          </Text>
          <Text fontWeight="bold">Website:</Text>
          <Link href={listing.website} noOfLines="1">
            {listing.website}
          </Link>
          <Text fontWeight="bold">Type:</Text>
          <Text>{listing.type}</Text>
          {listing.type === 'Min. Spend' && (
            <>
              <Text fontWeight="bold">Amount Required For Free Delivery:</Text>
              <Text>${listing.required_spend}</Text>
            </>
          )}
          <Text fontWeight="bold">Slots Available:</Text>
          <Text>{listing.slots}</Text>
          <Text fontWeight="bold">Description:</Text>
          <Text>
            {listing.description
              ? listing.description
              : 'No description provided'}
          </Text>
          <Text fontWeight={'bold'}>Created by:</Text>
          <RouterLink to={`/profile/${listing.created_by}`}>
            <Text _hover={{ textDecoration: 'underline' }}>
              {user?.username}
            </Text>
          </RouterLink>
          {listing.created_by !== auth.user.id && (
            <RequestButton
              handleRequest={handleRequest}
              joined={joined}
              requested={requested}
            />
          )}
        </Stack>
      )}
    </Box>
  );
}
