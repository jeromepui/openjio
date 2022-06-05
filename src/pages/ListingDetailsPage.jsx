import {
  Alert,
  Box,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

  useEffect(() => {
    const getListingData = async () => {
      try {
        setLoading(true);

        const { listingData, listingError } = await getListing(listingId);
        if (listingError) throw listingError;
        setListing(listingData);

        const userData = await getListingOwnerUsername(listingData.created_by);
        setUser(userData);

        const { requestData, requestError } = await userJoinedListing(
          listingData.listing_id,
          auth.user.id
        );
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

      const { userData, userError } = await getUserProfile(auth.user.id);
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
    <>
      {loading ? (
        <Alert status="info">Loading...</Alert>
      ) : (
        <Box px="6" py="4">
          <Stack spacing="4">
            <Heading fontWeight="700" fontSize="4xl">
              {listing.title}
            </Heading>
            <Text fontSize="2xl" fontWeight="500">
              Listing Details
            </Text>
            <Text fontWeight="bold">Website:</Text>{' '}
            <Link href={listing.website} noOfLines="1">
              {listing.website}
            </Link>
            <Text fontWeight="bold">Type:</Text>
            <Text>{listing.type}</Text>
            {listing.type === 'Min. Spend' && (
              <>
                <Text fontWeight="bold">
                  Amount Required For Free Delivery:
                </Text>
                <Text>${listing.required_spend}</Text>
              </>
            )}
            <Text fontWeight="bold">Slots Available:</Text>
            <Text> {listing.slots}</Text>
            <Text fontWeight="bold">Description:</Text>{' '}
            <Text>
              {listing.description
                ? listing.description
                : 'No description provided'}
            </Text>
            <Text fontWeight={'bold'}>Created by:</Text>{' '}
            <Text>
              {user?.username
                ? user.username
                : 'User has not created a username'}
            </Text>
            {listing.created_by !== auth.user.id && (
              <RequestButton
                handleRequest={handleRequest}
                requested={requested}
              />
            )}
          </Stack>
        </Box>
      )}
    </>
  );
}
